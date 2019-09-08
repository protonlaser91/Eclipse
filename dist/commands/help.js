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
const db = require("quick.db");
class shop {
    constructor() {
        this._command = "help";
    }
    name() {
        return "help";
    }
    help() {
        return "help";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    cooldown() {
        return 3;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args.length || args.length > 2) {
                msg.reply("Proper usage: `!help <troop_name>` ");
                return;
            }
            let troop = args.join(" ").toLowerCase();
            if (troop.includes("thanos")) {
                var hex = `#9a55bd`;
                var nam = "Thanosid";
                var a = db.get(`${msg.author.id}.tAmt`);
                var img = `https://i.imgur.com/XYzs8sl.png`;
                var desc = "This troop is extremely powerful, and wipes out **half** of all saimonGay forces of your enemy. If only one saimonGay remains for the opposing side, it will run away like the traitor it is.\n\nIf you know how many saimonGays you are up against, you may use this formula to calculate how many Thanosid are necessary to defeat your enemy: ```roundUp(log2(saimonGays))```";
                var price = 50;
                var speed = 0.2;
                var loot = 75;
            }
            else if (troop.includes('sai')) {
                var hex = `#32CD32`;
                var nam = "saimonGay";
                var a = db.get(`${msg.author.id}.sAmt`);
                var img = `https://i.imgur.com/6KR69ku.png`;
                var desc = "This troop is treacherous and deceitful... and extremely cheap. It will only fight if accompanied by others like it. That means that if **one** saimonGay is left, it will run away.\n\nTo find out how many saimonGays are needed to defeat enemy Thanosid, you may use this formula: ```saimonGays > 2^thanosidNumber```";
                var price = 2;
                var speed = 2;
                var loot = 3;
            }
            else {
                msg.reply('That troop doesn\'t exist!');
                return;
            }
            let troopEmbed = new Discord.RichEmbed()
                .setColor(hex)
                .setTitle(`Information on troop ${nam}`)
                .setAuthor('TroopCentral', msg.author.avatarURL)
                .setDescription(desc)
                .addField("Number of this troop", `${a}`, true)
                .addField("Cost", `${price} rubies`, true)
                .addField("Speed", `${speed}x multiplier`, true)
                .addField("Looting", `${loot} capacity`, true)
                .setThumbnail(msg.author.avatarURL)
                .setImage(img)
                .setTimestamp()
                .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png');
            msg.channel.send(troopEmbed);
        });
    }
}
exports.default = shop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBRS9CLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQStEdEMsQ0FBQztJQTdERyxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUdLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNWO1lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0JBQ3pCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQTtnQkFDbkIsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFBO2dCQUNwQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUN2QyxJQUFJLEdBQUcsR0FBRyxpQ0FBaUMsQ0FBQTtnQkFDM0MsSUFBSSxJQUFJLEdBQUcsa1hBQWtYLENBQUE7Z0JBQzdYLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtnQkFDZCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUE7Z0JBQ2YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO2FBQ2hCO2lCQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztnQkFDN0IsSUFBSSxHQUFHLEdBQUksU0FBUyxDQUFBO2dCQUNwQixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUE7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ3ZDLElBQUksR0FBRyxHQUFHLGlDQUFpQyxDQUFBO2dCQUMzQyxJQUFJLElBQUksR0FBRyw0VEFBNFQsQ0FBQTtnQkFDdlUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO2dCQUNiLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtnQkFDYixJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7YUFDZjtpQkFBTTtnQkFDSCxHQUFHLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ3hDLE9BQU87YUFDVjtZQUNELElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDZixRQUFRLENBQUMsR0FBRyxDQUFDO2lCQUNiLFFBQVEsQ0FBQyx3QkFBd0IsR0FBRyxFQUFFLENBQUM7aUJBQ3ZDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7aUJBQy9DLGNBQWMsQ0FBQyxJQUFJLENBQUM7aUJBQ3BCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBQyxHQUFHLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQztpQkFDNUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxHQUFHLEtBQUssU0FBUyxFQUFDLElBQUksQ0FBQztpQkFDdkMsUUFBUSxDQUFDLE9BQU8sRUFBQyxHQUFHLEtBQUssY0FBYyxFQUFDLElBQUksQ0FBQztpQkFDN0MsUUFBUSxDQUFDLFNBQVMsRUFBQyxHQUFHLElBQUksV0FBVyxFQUFDLElBQUksQ0FBQztpQkFDM0MsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2lCQUNsQyxRQUFRLENBQUMsR0FBRyxDQUFDO2lCQUNiLFlBQVksRUFBRTtpQkFDZCxTQUFTLENBQUMsZ0NBQWdDLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztZQUN4RyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7Q0FFSjtBQWpFRCx1QkFpRUMifQ==