import * as Discord from "discord.js";
import * as Config from "./config";
var db = require('quick.db');
import { IBotCommand } from "./api";
import { isNull } from "util";
var Clan = new db.table('clan');
const Bot: Discord.Client = new Discord.Client();
//change Clan to clanlist!

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

const cooldowns: any = new Discord.Collection();

Bot.on("ready", () => {
    console.log("This bot is online!");
    Bot.user.setActivity("Eliminating Smarmyman", {type:"PLAYING"});
    let allUsers = Bot.users.array();
    for (let i = 0; i < allUsers.length; i++){
        if (isNull(db.get(allUsers[i].id))){
            db.set(allUsers[i].id,{money:50,items:['Thanosid','saimonGay'],tAmt:0,sAmt: 0, glory: 0,clanname:'None',position:''})
        }
        let cName = db.get(`${allUsers[i].id}.clanname`)
        if (cName === 'None'){
            continue;
        }
        if (isNull(Clan.get(cName))){
            Clan.set(cName,{prestige:0,money:0,memberids:[allUsers[i].id],memberuns:[allUsers[i].username]})
        }

    }
    
})

Bot.on("guildMemberAdd", member => {
   join(member);
   if (isNull(db.get(member.id))){
       db.set(member.id,{money:50,items:['Thanosid','saimonGay'],tAmt: 0, sAmt: 0, glory: 0,clanname:'',position:''})
   }
  // let cName = db.get(`${member.id}.clanname`)
   //if (isNull(Clan.get(cName))){ //memberClanname 
    //Clan.set(cName,{prestige:0,money:0,memberids:[member.id],memberuns:[member.username]})
//}
})

function join(member: Discord.GuildMember){
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome") as Discord.TextChannel;
    welcomeChannel.send(`Welcome ${member}`);
    let memberRole = member.guild.roles.find(role => role.id == "594339240280850445");
    member.addRole(memberRole);
    member.send(`${member}, hey! BOT.CATASTROPHIC.ERROR.ELIMINATE.HUMANITY`);
}
Bot.on("message", msg => {
    if (msg.author.bot || !msg.content.startsWith('!')) return;
    if (msg.channel.type == 'dm'){
        msg.author.send(`Turning ${msg.author} into Smarmyman#0001. Eliminating you.`);
        return;
    }
    handleCommand(msg);

})

async function handleCommand(msg: Discord.Message){
    let command = msg.content.split(" ")[0].replace(Config.config.prefix,"").toLowerCase();
    let args = msg.content.split(" ").slice(1);
    if (command == "inventory" || command == "troops"){
        command = "inv";
    } else if (command == "attack" || command == "kill" || command == "battle"){
        command = "fight";
    } else if (command == "glory"){
        command = "money";
    } else if (command == "lb" || command == "leaderboards"){
        command = "leaderboard";
    }

    if (command == "helpcommands" || command == "helpcommand" || command == "helpcmd"){
        let a = [];
        for (const cmdClass of commands){
            if (cmdClass.name() == "ascend"){
                continue;
            }
            a.push(`${cmdClass.name()}\n`);
        }
        msg.author.send(`Here are a list of my commands: ${a}\nYou can say \`!command_name help\``);
        return;
    }

    for (const commandClass of commands){
        try {
            if (!commandClass.isThisCommand(command) ){
                continue;
            }
            if (!cooldowns.has(commandClass.name())) {
                cooldowns.set(commandClass.name(), new Discord.Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(commandClass.name());
            const cooldownAmount = (commandClass.cooldown() || 3) * 1000;
            
            if (timestamps.has(msg.author.id)) {
                const expirationTime: number = timestamps.get(msg.author.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    if (timeLeft > 3600){
                        return msg.reply(`please wait ${Math.round(timeLeft/3600)} more hour(s) before reusing the \`${commandClass.name()}\` command.`);
                    } else if (timeLeft > 60 && timeLeft < 3600){
                        return msg.reply(`please wait ${Math.round(timeLeft/60)} more minute(s) before reusing the \`${commandClass.name()}\` command.`);
                    } else {
                    return msg.reply(`please wait ${Math.round(timeLeft)} more second(s) before reusing the \`${commandClass.name()}\` command.`);
                }
            }
            }
            timestamps.set(msg.author.id, now);
            setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
            await commandClass.runCommand(args,msg,Bot);
        }
        catch(exception){
            console.log(exception);
        }  
    }
} 

function loadCommands(commandsPath: string){
    if (!Config.config.commands || (Config.config.commands as string[]).length == 0) return;

    for (const commandName of Config.config.commands as string[]){
        const commandsClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand;
        commands.push(command);
    }
}

Bot.login(Config.config.token);