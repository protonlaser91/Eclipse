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
const spoken = new Discord.Collection();
var numUsers = 0;
var intervalID;
var stopRunning = false;
class snape {
    constructor() {
        this._command = "snape";
    }
    name() {
        return "snape";
    }
    help() {
        return "snape";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const specialChars = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];
            var specialChar = "0";
            const guildUsers = msg.guild.members;
            const filter = (m) => (!spoken.has(m.author.id) && !m.author.bot && (m.guild.id == msg.guild.id));
            const collector = msg.channel.createMessageCollector(filter, { time: 864000 * 1000 });
            collector.on('collect', (m) => {
                spoken.set(m.author.id, Date.now() + 86400 * 1000);
            });
            if (args[0] == "stop") {
                stopRunning = true;
            }
            intervalID = setInterval(() => {
                spoken.forEach((v, k) => {
                    if (v < Date.now()) {
                        spoken.delete(k);
                    }
                });
                numUsers = spoken.size;
                console.log(`UNum: ${numUsers}`);
                guildUsers.array().forEach(u => {
                    if (!u.user.bot) {
                        var newNick = u.displayName;
                        specialChars.forEach(element => {
                            newNick = newNick.replace(new RegExp(element, "gi"), '');
                        });
                        switch (numUsers) {
                            case 0:
                                specialChar = "";
                            case 1:
                                specialChar = "①";
                                break;
                            case 2:
                                specialChar = "②";
                                break;
                            case 3:
                                specialChar = "③";
                                break;
                            case 4:
                                specialChar = "④";
                                break;
                            case 5:
                                specialChar = "⑤";
                                break;
                            case 6:
                                specialChar = "⑥";
                                break;
                            case 7:
                                specialChar = "⑦";
                                break;
                            case 8:
                                specialChar = "⑧";
                                break;
                        }
                        u.setNickname(newNick + ` ${specialChar}`).catch(e => {
                            console.log(`Unable to turn: ${u.user.username}, Ordered by ${msg.author.username}`);
                            guildUsers.delete(u.user.id);
                        });
                    }
                });
                if (stopRunning) {
                    clearInterval(intervalID);
                    msg.channel.send("CLEARED!");
                }
            }, 50000);
        });
    }
}
exports.default = snape;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc25hcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUt0QyxNQUFNLE1BQU0sR0FBUSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM3QyxJQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7QUFDekIsSUFBSSxVQUFlLENBQUM7QUFDcEIsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBRXhCLE1BQXFCLEtBQUs7SUFBMUI7UUFFcUIsYUFBUSxHQUFHLE9BQU8sQ0FBQTtJQTJGdkMsQ0FBQztJQXpGRyxJQUFJO1FBQ0EsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFDdEUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxXQUFXLEdBQVcsR0FBRyxDQUFDO1lBQzlCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFH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