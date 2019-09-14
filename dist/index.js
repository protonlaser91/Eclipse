"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const Config = require("./config");
var db = require('quick.db');
const util_1 = require("util");
var Clan = new db.table('clan');
const Bot = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
const cooldowns = new Discord.Collection();
Bot.on("ready", () => {
    console.log("This bot is online!");
    Bot.user.setActivity("Eliminating Smarmyman", { type: "PLAYING" });
    let allUsers = Bot.users.array();
    for (let i = 0; i < allUsers.length; i++) {
        if (util_1.isNull(db.get(allUsers[i].id))) {
            db.set(allUsers[i].id, { money: 50, items: ['Thanosid', 'saimonGay'], tAmt: 0, sAmt: 0, glory: 0, clanname: 'None', position: '' });
        }
        let cName = db.get(`${allUsers[i].id}.clanname`);
        if (cName === 'None') {
            continue;
        }
        if (util_1.isNull(Clan.get(cName))) {
            Clan.set(cName, { prestige: 0, money: 0, memberids: [allUsers[i].id], memberuns: [allUsers[i].username] });
        }
    }
});
Bot.on("guildMemberAdd", member => {
    join(member);
    if (util_1.isNull(db.get(member.id))) {
        db.set(member.id, { money: 50, items: ['Thanosid', 'saimonGay'], tAmt: 0, sAmt: 0, glory: 0, clanname: '', position: '' });
    }
});
function join(member) {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome");
    welcomeChannel.send(`Welcome ${member}`);
    let memberRole = member.guild.roles.find(role => role.id == "594339240280850445");
    member.addRole(memberRole);
    member.send(`${member}, hey! BOT.CATASTROPHIC.ERROR.ELIMINATE.HUMANITY`);
}
Bot.on("message", msg => {
    if (msg.author.bot || !msg.content.startsWith('!'))
        return;
    if (msg.channel.type == 'dm') {
        msg.author.send(`Please talk to me on a server! This ensures more engagement and reliability.`);
        return;
    }
    handleCommand(msg);
});
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = msg.content.split(" ")[0].replace(Config.config.prefix, "").toLowerCase();
        let args = msg.content.split(" ").slice(1);
        if (command == "inventory" || command == "troops") {
            command = "inv";
        }
        else if (command == "attack" || command == "kill" || command == "battle") {
            command = "fight";
        }
        else if (command == "glory") {
            command = "money";
        }
        else if (command == "lb" || command == "leaderboards") {
            command = "leaderboard";
        }
        if (command == "helpcommands" || command == "helpcommand" || command == "helpcmd") {
            let a = [];
            for (const cmdClass of commands) {
                if (cmdClass.name() == "ascend") {
                    continue;
                }
                a.push(`${cmdClass.name()}\n`);
            }
            msg.author.send(`Here are a list of my commands: ${a}\nYou can say \`!command_name help\``);
            return;
        }
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisCommand(command)) {
                    continue;
                }
                if (!cooldowns.has(commandClass.name())) {
                    cooldowns.set(commandClass.name(), new Discord.Collection());
                }
                const now = Date.now();
                const timestamps = cooldowns.get(commandClass.name());
                const cooldownAmount = (commandClass.cooldown() || 3) * 1000;
                if (timestamps.has(msg.author.id)) {
                    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        if (timeLeft > 3600) {
                            return msg.reply(`please wait ${Math.round(timeLeft / 3600)} more hour(s) before reusing the \`${commandClass.name()}\` command.`);
                        }
                        else if (timeLeft > 60 && timeLeft < 3600) {
                            return msg.reply(`please wait ${Math.round(timeLeft / 60)} more minute(s) before reusing the \`${commandClass.name()}\` command.`);
                        }
                        else {
                            return msg.reply(`please wait ${Math.round(timeLeft)} more second(s) before reusing the \`${commandClass.name()}\` command.`);
                        }
                    }
                }
                timestamps.set(msg.author.id, now);
                setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
                yield commandClass.runCommand(args, msg, Bot);
            }
            catch (exception) {
                console.log(exception);
            }
        }
    });
}
function loadCommands(commandsPath) {
    if (!Config.config.commands || Config.config.commands.length == 0)
        return;
    for (const commandName of Config.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
    }
}
Bot.login(Config.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTdCLCtCQUE4QjtBQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEMsTUFBTSxHQUFHLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR2pELElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7QUFFakMsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQTtBQUVyQyxNQUFNLFNBQVMsR0FBUSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUVoRCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDaEUsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztRQUNyQyxJQUFJLGFBQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDO1lBQy9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUE7U0FDeEg7UUFDRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDaEQsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFDO1lBQ2pCLFNBQVM7U0FDWjtRQUNELElBQUksYUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQTtTQUNuRztLQUVKO0FBRUwsQ0FBQyxDQUFDLENBQUE7QUFFRixHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFO0lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNiLElBQUksYUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7UUFDMUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQTtLQUNqSDtBQUtKLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxJQUFJLENBQUMsTUFBMkI7SUFDckMsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLENBQXdCLENBQUM7SUFDOUcsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDekMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sa0RBQWtELENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBQ0QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDcEIsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFDM0QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUM7UUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEVBQThFLENBQUMsQ0FBQztRQUNoRyxPQUFPO0tBQ1Y7SUFDRCxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdkIsQ0FBQyxDQUFDLENBQUE7QUFFRixTQUFlLGFBQWEsQ0FBQyxHQUFvQjs7UUFDN0MsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZGLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBQztZQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ25CO2FBQU0sSUFBSSxPQUFPLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBQztZQUN2RSxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFDO1lBQzFCLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDckI7YUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLGNBQWMsRUFBQztZQUNwRCxPQUFPLEdBQUcsYUFBYSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxPQUFPLElBQUksY0FBYyxJQUFJLE9BQU8sSUFBSSxhQUFhLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBQztZQUM5RSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWCxLQUFLLE1BQU0sUUFBUSxJQUFJLFFBQVEsRUFBQztnQkFDNUIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksUUFBUSxFQUFDO29CQUM1QixTQUFTO2lCQUNaO2dCQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUM1RixPQUFPO1NBQ1Y7UUFFRCxLQUFLLE1BQU0sWUFBWSxJQUFJLFFBQVEsRUFBQztZQUNoQyxJQUFJO2dCQUNBLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN0QyxTQUFTO2lCQUNaO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFO29CQUNyQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRTtnQkFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sY0FBYyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFFN0QsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQy9CLE1BQU0sY0FBYyxHQUFXLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7b0JBRTlFLElBQUksR0FBRyxHQUFHLGNBQWMsRUFBRTt3QkFDdEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUMvQyxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUM7NEJBQ2hCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxzQ0FBc0MsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQzt5QkFDcEk7NkJBQU0sSUFBSSxRQUFRLEdBQUcsRUFBRSxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUM7NEJBQ3hDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLEVBQUUsQ0FBQyx3Q0FBd0MsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQzt5QkFDcEk7NkJBQU07NEJBQ1AsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsd0NBQXdDLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7eUJBQ2pJO3FCQUNKO2lCQUNBO2dCQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsT0FBTSxTQUFTLEVBQUM7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQjtTQUNKO0lBQ0wsQ0FBQztDQUFBO0FBRUQsU0FBUyxZQUFZLENBQUMsWUFBb0I7SUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBcUIsQ0FBQyxNQUFNLElBQUksQ0FBQztRQUFFLE9BQU87SUFFeEYsS0FBSyxNQUFNLFdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQW9CLEVBQUM7UUFDekQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsWUFBWSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRXhFLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxFQUFpQixDQUFDO1FBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDMUI7QUFDTCxDQUFDO0FBRUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=