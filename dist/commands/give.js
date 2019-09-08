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
const db = require("quick.db");
class give {
    constructor() {
        this._command = "give";
    }
    name() {
        return "give";
    }
    help() {
        return "give";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.length < 2 || isNaN(Number(args[1]))) {
                msg.reply("Proper usage: `!give @user amt item`");
                return;
            }
            let n = parseInt(args[1]);
            let item = args[2];
            if (item === undefined) {
                msg.reply('please return what item you want to increase/decrease!');
                return;
            }
            if (msg.author.id === '320659246037336064') {
                let mentionedUser = msg.mentions.users.first();
                try {
                    if (item.toLowerCase().startsWith('m') || item.toLowerCase().startsWith('r')) {
                        db.add(`${mentionedUser.id}.money`, n);
                        msg.channel.send(`Successfully gave ${mentionedUser} ${n} rubies!`);
                    }
                    else if (item.toLowerCase().startsWith('g')) {
                        db.add(`${mentionedUser.id}.glory`, n);
                        msg.channel.send(`Successfully gave ${mentionedUser} ${n} glory!`);
                    }
                }
                catch (_a) {
                    console.error;
                    msg.reply("I can't really give a role money... yeah...");
                }
            }
            else {
                msg.reply("You do not have the power of The Dark One");
            }
        });
    }
}
exports.default = give;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9naXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwrQkFBK0I7QUFFL0IsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBb0R0QyxDQUFDO0lBbERHLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBQztnQkFDbkIsR0FBRyxDQUFDLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO2dCQUNwRSxPQUFPO2FBQ1Y7WUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLG9CQUFvQixFQUFDO2dCQUN2QyxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDL0MsSUFBSTtvQkFDSixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQzt3QkFDN0UsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTt3QkFDdEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLGFBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNuRTt5QkFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUM7d0JBQ3hDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7d0JBQ3RDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixhQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDdEU7aUJBQ0E7Z0JBQ0QsV0FBTTtvQkFDRixPQUFPLENBQUMsS0FBSyxDQUFBO29CQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztpQkFDNUQ7YUFFSjtpQkFBTTtnQkFDSCxHQUFHLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7YUFDMUQ7UUFFTCxDQUFDO0tBQUE7Q0FFSjtBQXRERCx1QkFzREMifQ==