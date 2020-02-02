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
var db = require('quick.db');
var Jokes = new db.table('joke');
const index_1 = require("../index");
class joke {
    constructor() {
        this._command = "joke";
    }
    name() {
        return "joke";
    }
    help() {
        return "joke";
    }
    cooldown() {
        return 0.2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            var joke = "";
            var john = false;
            var punchline = "";
            args.forEach(element => {
                if (!john) {
                    joke += element + " ";
                }
                else {
                    punchline += element + " ";
                }
                if (element.includes("|")) {
                    john = true;
                }
            });
            if (args.length) {
                if (args[0].toLowerCase().startsWith("m")) {
                    let yerJokes = JSON.stringify(Jokes.get(msg.author.id).jokePairs);
                    msg.channel.send(yerJokes);
                    yerJokes = JSON.parse(yerJokes);
                    var troopEmbed = new Discord.RichEmbed()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTitle(`Joke of the Quadri-Hour`)
                        .setDescription(`All jokes by ${msg.author.username}`)
                        .setAuthor('BOT Tomato / BOT Bendy', Bot.user.avatarURL)
                        .setThumbnail(Bot.user.avatarURL)
                        .setTimestamp()
                        .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png');
                    for (var x = 0; x < 3; x++) {
                        console.log(yerJokes[x]);
                        troopEmbed.addField(yerJokes[x][0], yerJokes[x][1]);
                    }
                    msg.channel.send(troopEmbed);
                    return;
                }
                else if (args[0].toLowerCase().startsWith("d") || args[0].toLowerCase().startsWith("l")) {
                    return;
                }
            }
            if (args.length < 2) {
                try {
                    index_1.funnyJoke(`https://www.reddit.com/r/Jokes/top.json?t=day`, msg.channel);
                }
                catch (e) {
                    console.log(e);
                    msg.channel.send("The joke was not up to standard. Try again!");
                    msg.channel.send({ files: ["https://media.giphy.com/media/ek4GqDzKgYWvg4P0Uu/giphy.gif"] });
                }
                return;
            }
            if (!john) {
                msg.reply("I don't think you formatted the joke properly! Proper syntax: `!joke <joke> | <punchline>`");
                return;
            }
            msg.channel.send(`Nice joke! <@${msg.author.id}>!`);
            if (!Jokes.has(msg.author.id)) {
                Jokes.set(msg.author.id, { jokePairs: [[joke.replace(/\|/g, "").slice(0, joke.length - 1), punchline.slice(0, punchline.length - 1)]] });
            }
            else {
                Jokes.push(`${msg.author.id}.jokePairs`, [joke.replace(/\|/g, "").slice(0, joke.length - 1), punchline.slice(0, punchline.length - 1)]);
            }
            console.log(JSON.stringify(Jokes.get(msg.author.id)));
            console.log(Jokes.all());
        });
    }
}
exports.default = joke;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9rZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9qb2tlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxvQ0FBcUM7QUFFckMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBeUZ0QyxDQUFDO0lBdkZHLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUM7b0JBQ04sSUFBSSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNILFNBQVMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO2lCQUM5QjtnQkFFRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUM7b0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ2Y7WUFFTCxDQUFDLENBQUMsQ0FB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