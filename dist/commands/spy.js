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
class spy {
    constructor() {
        this._command = "spy";
    }
    name() {
        return "spy";
    }
    help() {
        return "spy";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            msg.delete(0);
            let mentionedUser = msg.mentions.users.first();
            if (!mentionedUser) {
                msg.reply('You need to specify a user to spy on!');
                return;
            }
            if (args.length < 1) {
                msg.reply('Proper usage: `!spy <username> <time>` Do note that time is optional and will be defaulted to 2 if no input. #TIME HAS NOT BEEN ADDED YET!');
                return;
            }
            if (isNaN(Number(args[1]))) {
                var time = 2;
            }
            else {
                var time = parseFloat(args[1]);
            }
            function sigmoid(n1, n2) {
                if (n1 / n2 <= 1) {
                    return 1 / (1 + Math.pow(1.1, (n2 / n1)));
                }
                else {
                    return 1 / (1 + Math.pow(1.1, (-1 * n1 / n2)));
                }
            }
            var spierG = db.get(`${msg.author.id}.glory`);
            var spyedG = db.get(`${mentionedUser.id}.glory`);
            if (spierG <= 250 && spyedG <= 250) {
                var chance = 0.5;
            }
            else if (spierG / spyedG > 10) {
                var chance = 0.8;
            }
            else if (spyedG / spierG > 10) {
                var chance = 0.33;
            }
            else {
                var chance = sigmoid(spierG, spyedG);
            }
            if (Math.random() < chance) {
                const t = db.get(`${mentionedUser.id}.tAmt`);
                const s = db.get(`${mentionedUser.id}.sAmt`);
                const v = db.get(`${mentionedUser.id}.vAmt`);
                const a = db.get(`${mentionedUser.id}.aAmt`);
                const m = db.get(`${mentionedUser.id}.money`);
                const g = db.get(`${mentionedUser.id}.glory`);
                const sendEmbed = new Discord.RichEmbed()
                    .setColor([12, 12, 12])
                    .setDescription(`The espionage was a success! Information about the enemy's troops, money and glory are present in this report`)
                    .setThumbnail(mentionedUser.avatarURL)
                    .setAuthor(`${msg.author.username}'s Spy Report`, msg.author.avatarURL)
                    .addField('Enemy Thanosid', t, true)
                    .addField('Enemy saimonGay', s, true)
                    .addField('Enemy anumonGamers', a, true)
                    .addField('Enemy FaZe Varun', v, true)
                    .addField('Enemy money', `${m} rubies`, true)
                    .addField('Enemy Glory', `${g} glory`, true)
                    .setFooter(`Espionage Report On ${mentionedUser.username}`)
                    .setTimestamp(new Date());
                msg.author.send(sendEmbed);
                msg.author.send(`Your chance of a successful espionage was ${Math.round(100 * chance)}%`);
            }
            else {
                msg.author.send(`<@${msg.author.id}>, your spy never made it back... The enemy now knows that you have attempted an espionage! Stay alert!`);
                msg.author.send(`Your chance of a successful espionage was ${Math.round(100 * chance)}%`);
                mentionedUser.send(`Alert, <@${mentionedUser.id}>, ||${msg.author.username}|| has attempted to spy on you!`);
            }
        });
    }
}
exports.default = spy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NweS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLCtCQUErQjtBQUUvQixNQUFxQixHQUFHO0lBQXhCO1FBRXFCLGFBQVEsR0FBRyxLQUFLLENBQUE7SUFvRnJDLENBQUM7SUFsRkcsSUFBSTtRQUNBLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsYUFBYSxFQUFDO2dCQUNmLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztnQkFDbkQsT0FBTzthQUNWO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDaEIsR0FBRyxDQUFDLEtBQUssQ0FBQyw0SUFBNEksQ0FBQyxDQUFDO2dCQUN4SixPQUFPO2FBQ1Y7WUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDeEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0osSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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