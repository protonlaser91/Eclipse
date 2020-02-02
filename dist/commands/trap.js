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
const timestamps = new Discord.Collection();
var fs = require('fs');
class trap {
    constructor() {
        this._command = "trap";
    }
    name() {
        return "trap";
    }
    help() {
        return "trap";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args[0] == "revert" || args[0] == "undo") {
                msg.channel.send("rl");
                fs.readFileSync(`${msg.guild.id}.txt`, (err, data) => {
                    if (err)
                        throw err;
                    console.log(data.split("\n"));
                });
                return;
            }
            if (args.length < 2) {
                msg.channel.send("Nope.");
                return;
            }
            var times = 1000;
            const cooldownAmt = Number(args[0]);
            const nickname = args.slice(1).join(' ');
            const guildUsers = msg.guild.members;
            if (!timestamps.has(msg.author.id)) {
                timestamps.set(msg.author.id, Date.now() + cooldownAmt * 1000);
            }
            var intervalID = setInterval(() => {
                var allNames = "";
                guildUsers.array().forEach(u => {
                    allNames += `${u.displayName}\n`;
                    if (u.displayName != nickname && !(u.user.id == Bot.user.id)) {
                        u.setNickname(nickname).catch(e => {
                            console.log(`Unable to turn: ${u.user.username}, Ordered by ${msg.author.username}`);
                            guildUsers.delete(u.user.id);
                        });
                    }
                });
                fs.writeFile(`${msg.guild.id}.txt`, `${allNames}\n`, function (err) {
                    if (err)
                        console.error;
                });
                if (timestamps.get(msg.author.id) < Date.now()) {
                    timestamps.delete(msg.author.id);
                    clearInterval(intervalID);
                }
            }, 30000);
        });
    }
}
exports.default = trap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFJdEMsTUFBTSxVQUFVLEdBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDakQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXZCLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQWdGdEMsQ0FBQztJQTlFRyxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFVdEUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUM7Z0JBQ3pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtvQkFDM0QsSUFBSSxHQUFHO3dCQUFFLE1BQU0sR0FBRyxDQUFDO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsT0FBTzthQUNW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