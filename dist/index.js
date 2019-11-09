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
var Jokes = new db.table('joke');
const Bot = new Discord.Client();
const request = require('request');
const fs = require('fs');
let commands = [];
loadCommands(`${__dirname}/commands`);
const cooldowns = new Discord.Collection();
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function funnyJoke(link, channelID = Bot.channels.get('642506576246210587')) {
    var jokeObj = { "Johnson": [] };
    var jokeDict = new Array();
    var options = {
        url: link,
        method: "GET",
        headers: {
            "Accept": "application/json'",
            "User-Agent": "Chrome"
        }
    };
    function reqfunc(error, response, body) {
        if (error) {
            console.error;
            return;
        }
        let jsonObject = JSON.parse(body);
        fs.writeFile("jokes.txt", body, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        jsonObject.data.children.forEach((element) => {
            const punchline = element.data.selftext;
            const joke = element.data.title;
            jokeDict.push([joke, punchline]);
        });
        jokeObj["Johnson"] = jokeDict;
        var names = Object.keys(jokeObj);
        const randomJokePair = jokeObj[names[randint(0, names.length - 1)]][randint(0, jokeObj[names[randint(0, names.length - 1)]].length - 1)];
        let troopEmbed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(`Joke of the Quarter-Day`)
            .setAuthor('BOT Tomato / BOT Bendy', Bot.user.avatarURL)
            .addField(`**${randomJokePair[0]}**`, `||${randomJokePair[1]}||`)
            .setThumbnail(Bot.user.avatarURL)
            .setTimestamp()
            .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png');
        channelID.send(troopEmbed);
    }
    request(options, reqfunc);
}
Bot.on("ready", () => {
    console.log("This bot is online!");
    Bot.user.setPresence({ game: { name: '!helpcmd' } })
        .catch(console.error);
    if (util_1.isNull(Jokes.all()))
        Jokes.set("Johnson", { jokeArr: [
                `Two hunters are out in the woods when one of them collapses. He's not breathing and his eyes are glazed, so his friend calls 911. "My friend is dead! What should I do?" The operator replies, "Calm down, sir. I can help. First make sure that he's dead." There's a silence, then a loud bang. Back on the phone, the guy says, "OK, now what?"`,
                ``
            ] });
    setInterval(function () {
        try {
            funnyJoke(`https://www.reddit.com/r/Jokes/top.json?t=day`);
        }
        catch (_a) {
            let cID = Bot.channels.get('642506576246210587');
            cID.send("The joke was not up to standard.");
            cID.send({ files: ["https://media.giphy.com/media/KeuU0oaPNW6HnnTX0g/giphy.gif"] });
        }
    }, 6 * 3600000);
    let allUsers = Bot.users.array();
    for (let i = 0; i < allUsers.length; i++) {
        if (util_1.isNull(db.get(allUsers[i].id))) {
            db.set(allUsers[i].id, { money: 50, items: [], tAmt: 0, sAmt: 0, aAmt: 0, vAmt: 0, glory: 0, clanname: 'None', position: '' });
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
        db.set(member.id, { money: 50, items: [], tAmt: 0, sAmt: 0, aAmt: 0, vAmt: 0, glory: 0, clanname: 'None', position: '' });
    }
});
function join(member) {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome");
    welcomeChannel.send(`Welcome ${member}`);
    let memberRole = member.guild.roles.find(role => role.id == "594339240280850445");
    member.addRole(memberRole);
    member.send(`${member}, hey! Welcome to the Eclipse Testing Centre (ETC).`);
    try {
        funnyJoke(`https://www.reddit.com/r/Jokes/top.json?t=day`, member);
    }
    catch (_a) {
        member.send({ files: ["https://media.giphy.com/media/ek4GqDzKgYWvg4P0Uu/giphy.gif"] });
    }
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
        else if (command == "csgo" || command == "csgostats") {
            command = "csrank";
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
            catch (e) {
                console.log(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTdCLCtCQUE4QjtBQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sR0FBRyxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNqRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR3pCLElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7QUFFakMsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQTtBQUdyQyxNQUFNLFNBQVMsR0FBUSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUdoRCxTQUFTLE9BQU8sQ0FBQyxHQUFXLEVBQUMsR0FBVztJQUVoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsSUFBWSxFQUFFLFlBQWlCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0lBQ3BGLElBQUksT0FBTyxHQUFRLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxDQUFBO0lBQ2pDLElBQUksUUFBUSxHQUFHLElBQUksS0FB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