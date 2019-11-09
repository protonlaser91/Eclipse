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
class info {
    constructor() {
        this._command = "info";
    }
    name() {
        return "info";
    }
    help() {
        return "info";
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
                msg.reply("Proper usage: `!info <troop_name>` ");
                return;
            }
            let troop = args.join(" ").toLowerCase();
            if (troop.includes("thanos")) {
                var hex = `#9a55bd`;
                var nam = "Thanosid";
                var a = db.get(`${msg.author.id}.tAmt`);
                var img = `https://i.imgur.com/XYzs8sl.png`;
                var desc = "This troop is extremely powerful, and wipes out **half** of all saimonGay forces of your enemy. If only one saimonGay remains for the opposing side, it will run away like the traitor it is.\n\nIf you know how many saimonGays you are up against, you may use this formula to calculate how many Thanosid are necessary to defeat your enemy: ```roundUp(log2(saimonGays))```";
                var price = 800;
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
            else if (troop.includes('anu')) {
                var hex = `#FF6347`;
                var nam = "anumonGamer";
                var a = db.get(`${msg.author.id}.aAmt`);
                var img = `https://huntforerror.files.wordpress.com/2017/06/pandi.png`;
                var desc = "This troop is a pain in the neck and cuts all firepower on opposite side by **20**%! The Thanosid no longer snaps away **half** of all troops, now it can only snap away **2 for every 5** of a troop! (Or **3 for every 5** if you have the anumonic Advantage!) However, an Anumon will only loot for itself, so be wary! \n\nThis troop is not stackable, but in order to work to fruition, you attack with more Anumons than the enemy has defending, or else the enemy gains the **20**% advantage! Glory also has an effect on this, so be careful when choosing your opponent!";
                var price = 600;
                var speed = 2;
                var loot = 0;
            }
            else if (troop.includes('var') || troop.includes('ffv') || troop.includes('fv')) {
                var hex = `#FF6347`;
                var nam = "Future FaZe Varun";
                var a = db.get(`${msg.author.id}.vAmt`);
                var img = `https://i.ytimg.com/vi/NvHRY1WtZLg/hqdefault.jpg`;
                var desc = "The Future FaZe Varun troop is insanely powerful! It can obliterate hordes of saimonGays and is a primary attack troop only offset by its cost. It is able to loot insanely, travels fast, and causes utmost destruction. It does not have good defense stats, however! \n\nFuture FaZe Varun does not do well with Thanosid or anumonGamers due to their special attacks. It is still a very powerful troop!";
                var price = 200;
                var speed = 4;
                var loot = 40;
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
exports.default = info;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBRS9CLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQWtGdEMsQ0FBQztJQWhGRyxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUdLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNWO1lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0JBQ3pCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQTtnQkFDbkIsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFBO2dCQUNwQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUN2QyxJQUFJLEdBQUcsR0FBRyxpQ0FBaUMsQ0FBQTtnQkFDM0MsSUFBSSxJQUFJLEdBQUcsa1hBQWtY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