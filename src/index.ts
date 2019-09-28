import * as Discord from "discord.js";
import * as Config from "./config";
var db = require('quick.db');
import { IBotCommand } from "./api";
import { isNull } from "util";
var Clan = new db.table('clan');
const Bot: Discord.Client = new Discord.Client();
//Required imports

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)
//get all commands from directory name (arbitrary) and load them into commands which is of type IBotCommand

const cooldowns: any = new Discord.Collection();

//cooldowns is a object that takes a key-value pair and stores it in an array

Bot.on("ready", () => {
    console.log("This bot is online!"); //standard protocol when starting up the bot
    Bot.user.setActivity("Eliminating Smarmyman", {type:"PLAYING"});
    let allUsers = Bot.users.array(); //get all Users and store them in an array
    for (let i = 0; i < allUsers.length; i++){
        if (isNull(db.get(allUsers[i].id))){ //if User ID is not already in database (db) then add them, else do nothing
            db.set(allUsers[i].id,{money:50,items:[],tAmt:0,sAmt: 0,aAmt:0, vAmt: 0, glory: 0,clanname:'None',position:''})
        }
        let cName = db.get(`${allUsers[i].id}.clanname`) //cName is the clanname stored in the user's profile in db
        if (cName === 'None'){
            continue;
        } //Make sure we don't add None to the clan db table
        if (isNull(Clan.get(cName))){
            Clan.set(cName,{prestige:0,money:0,memberids:[allUsers[i].id],memberuns:[allUsers[i].username]})
        } //if user has clanname, but clan doesnt exist, clan db table auto makes clan with user in it (rare but important failsafe)

    }
    
})

Bot.on("guildMemberAdd", member => {
   join(member); //if member joins
   if (isNull(db.get(member.id))){ //if new member not in db, add them!
       db.set(member.id,{money:50,items:[],tAmt: 0, sAmt: 0,aAmt: 0, vAmt : 0, glory: 0,clanname:'None',position:''})
   }
 
})

function join(member: Discord.GuildMember){
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome") as Discord.TextChannel;
    welcomeChannel.send(`Welcome ${member}`);
    let memberRole = member.guild.roles.find(role => role.id == "594339240280850445");
    member.addRole(memberRole);
    member.send(`${member}, hey! BOT.CATASTROPHIC.ERROR.ELIMINATE.HUMANITY`);
} //simple onJoin commands, nothing too important here!
Bot.on("message", msg => {
    if (msg.author.bot || !msg.content.startsWith('!')) return;
    if (msg.channel.type == 'dm'){
        msg.author.send(`Please talk to me on a server! This ensures more engagement and reliability.`);
        return;
    } //makes sure that user cannot talk to bot on direct message, must be server!
    handleCommand(msg);

})

async function handleCommand(msg: Discord.Message){
    let command = msg.content.split(" ")[0].replace(Config.config.prefix,"").toLowerCase(); //Config.config.prefix is "!"
    let args = msg.content.split(" ").slice(1);
    //Make command and args lowercase
    if (command == "inventory" || command == "troops"){
        command = "inv";
    } else if (command == "attack" || command == "kill" || command == "battle"){
        command = "fight";
    } else if (command == "glory"){
        command = "money";
    } else if (command == "lb" || command == "leaderboards"){
        command = "leaderboard";
    } else if (command == "csgo" || command == "csgostats"){
        command = "csrank";
    } //simple aliases for common commands!

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
    } //see above

    for (const commandClass of commands){
        try {
            if (!commandClass.isThisCommand(command) ){
                continue;
            } //Checks IBotCommands (located in api.ts) for layout, if isThisCommand String is not equal to command, skip!
            if (!cooldowns.has(commandClass.name())) { //if name String in api.ts (IBotCommand) == to command
                cooldowns.set(commandClass.name(), new Discord.Collection()); //store the command name and a obj key-val 
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(commandClass.name()); //whatever is in the Discord.Collection, yeah thats timestamps now!
            const cooldownAmount = (commandClass.cooldown() || 3) * 1000; //from ms to sec
            //Begins the cooldown command process!
            if (timestamps.has(msg.author.id)) { //checks to see if user in col
                const expirationTime: number = timestamps.get(msg.author.id) + cooldownAmount; //expiration is time assigned to user + cooldownAmt
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    if (timeLeft > 3600){
                        return msg.reply(`please wait ${Math.round(timeLeft/3600)} more hour(s) before reusing the \`${commandClass.name()}\` command.`);
                    } else if (timeLeft > 60 && timeLeft < 3600){
                        return msg.reply(`please wait ${Math.round(timeLeft/60)} more minute(s) before reusing the \`${commandClass.name()}\` command.`);
                    } else {
                    return msg.reply(`please wait ${Math.round(timeLeft)} more second(s) before reusing the \`${commandClass.name()}\` command.`);
                } //if hours, run 1, if min, run2, else run3
            }
            }
            timestamps.set(msg.author.id, now); //user = key, time = val
            setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount); //wait cooldownAmt!
            await commandClass.runCommand(args,msg,Bot); //allows asynchronous operation and multithreading so multiple things can happen at once!
        }
        catch(exception){
            console.log(exception);
        }  //if error, log it!
    }
} 

function loadCommands(commandsPath: string){
    if (!Config.config.commands || (Config.config.commands as string[]).length == 0) return; //goes into config.ts and reads the commands, checks if they are valid

    for (const commandName of Config.config.commands as string[]){ //turns commands in config.ts into a string array and iterates over them
        const commandsClass = require(`${commandsPath}/${commandName}`).default; //imports the command file (default=ts) from file directory

        const command = new commandsClass() as IBotCommand; //command now follows same layout as IBotCommand in form commandsClass(). command is also executed
        commands.push(command); //adds commands to command array
    }
}

Bot.login(Config.config.token); //logs in using token in config.config (not accessible to you)