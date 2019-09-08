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
const client = new Discord.Client();
class kick {
    constructor() {
        this._command = "kick";
    }
    name() {
        return "kick";
    }
    help() {
        return "kick";
    }
    cooldown() {
        return 5;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let mentionedUser = msg.mentions.users.first();
            let suppliedReason = args.slice(1).join(" ") || "";
            let kickLog = `KICKER: ${msg.author.username}, KICKED:${mentionedUser}, REASON: ${suppliedReason}`;
            if (msg.author.id !== `320659246037336064`) {
                if (!msg.member.hasPermission("KICK_MEMBERS") || !msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.reply(`You do not possess the darkness required to kick ${mentionedUser}`);
                }
                if (!mentionedUser) {
                    msg.reply(`My intelli-Sense tells me that that user does not exist!`);
                }
            }
            msg.guild.member(mentionedUser).kick(kickLog)
                .then(() => {
                const logChannel = msg.member.guild.channels.find(channel => channel.id == "594359615156649984");
                logChannel.send(kickLog);
            })
                .catch(() => {
                msg.reply(`It would seem that both of you have darkness. I shall not interfere in your duel.`);
                console.error;
            });
            console.log(msg.client.channels.get(`594359615156649984`));
        });
    }
}
exports.default = kick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9raWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFcEMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBaUR0QyxDQUFDO0lBL0NHLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkQsSUFBSSxPQUFPLEdBQUcsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsWUFBWSxhQUFhLGFBQWEsY0FBYyxFQUFFLENBQUM7WUFFbkcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsRUFBQztnQkFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUM7b0JBQ3hGLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0RBQW9ELGFBQWEsRUFBRSxDQUFDLENBQUM7aUJBQ2xGO2dCQUVELElBQUksQ0FBQyxhQUFhLEVBQUM7b0JBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO2lCQUN6RTthQUNKO1lBRUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFFWCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxvQkFBb0IsQ0FBd0IsQ0FBQztnQkFDeEgsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFFUixHQUFHLENBQUMsS0FBSyxDQUFDLG1GQUFtRixDQUFDLENBQUM7Z0JBQy9GLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFHL0QsQ0FBQztLQUFBO0NBRUo7QUFuREQsdUJBbURDIn0=