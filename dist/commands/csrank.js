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
const fetch = require('node-fetch');
const request = require('request');
var firstLine;
class csrank {
    constructor() {
        this._command = "csrank";
    }
    name() {
        return "csrank";
    }
    help() {
        return "csrank";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            function randint(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            const rankArr = ["Unknown", "Silver I", "Silver II", "Silver III", "Silver IV", "Silver Elite", "Silver Elite Master", "Gold Nova I", "Gold Nova II",
                "Gold Nova III", "Gold Nova Master", "Master Guardian I", "Master Guardian II", "Master Guardian Elite", "Distinguished Master Guardian",
                "Legendary Eagle", "Legendary Eagle Master", "Supreme Master First Class", "The Global Elite", "Varun Duvvur-bendy"];
            if (args[0] == undefined) {
                msg.channel.send("My brother! You must Supply Me an ID !!!1");
                return;
            }
            let api = args[0];
            const options = {
                url: `https://steamid.io/lookup/${api}`,
                method: 'GET',
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
            request(options, function (err, res, body) {
                var stringCheck = body.toString();
                firstLine = stringCheck.split('\n')[7];
                firstLine = firstLine.split(" ")[firstLine.split(" ").length - 1];
                firstLine = firstLine.slice(1, firstLine.length - 3);
                if (isNaN(firstLine)) {
                    msg.channel.send("NOT VALID STEAM ID!");
                    return;
                }
                msg.channel.send(`STEAM64 ID: ${firstLine} \nCSGO-STATS is pretty slow. Gimme some time!`).then(msg => {
                    msg.delete(9000)
                        .catch(console.error);
                });
                msg.channel.send({ files: ["https://media.giphy.com/media/IgjQgp6ZsiWU28JtmE/giphy.gif"] }).then(msg => {
                    msg.delete(9000)
                        .catch(console.error);
                });
                const options2 = {
                    url: `https://csgo-stats.com/player/${firstLine}`,
                    method: 'GET',
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                };
                request(options2, function (err, res, body) {
                    var imageArr = body.toString();
                    let index = imageArr.indexOf(`<div class="rank"><img src="/custom/img/ranks`);
                    imageArr = imageArr.slice(index, index + 56);
                    if (imageArr.includes('-')) {
                        imageArr = 0;
                    }
                    else {
                        try {
                            imageArr = imageArr.match(/\d+/)[0];
                        }
                        catch (_a) {
                            imageArr = 0;
                        }
                    }
                    console.log(imageArr);
                    let rankEmbed = new Discord.RichEmbed()
                        .setTitle(`${api}'s CSGO Rank!`)
                        .addBlankField()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setDescription(`${api}'s rank: **${rankArr[imageArr < 18 ? imageArr : 19]}**`)
                        .setImage(`https://csgostats.gg/images/ranks/${imageArr}.png`);
                    msg.channel.send(rankEmbed);
                });
            });
        });
    }
}
exports.default = csrank;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NyYW5rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NzcmFuay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBR3RDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsSUFBSSxTQUFjLENBQUM7QUFHbkIsTUFBcUIsTUFBTTtJQUEzQjtRQUVxQixhQUFRLEdBQUcsUUFBUSxDQUFBO0lBcUd4QyxDQUFDO0lBbkdHLElBQUk7UUFDQSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUV0RSxTQUFTLE9BQU8sQ0FBQyxHQUFXLEVBQUMsR0FBVztnQkFFeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVPLE1BQU0sT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLGNBQWM7Z0JBQ25KLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBQyx1QkFBdUIsRUFBRSwrQkFBK0I7Z0JBQ3ZJLGlC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