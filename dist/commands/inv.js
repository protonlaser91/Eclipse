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
class inv {
    constructor() {
        this._command = "inv";
    }
    name() {
        return "inv";
    }
    help() {
        return "inv";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    cooldown() {
        return 2;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = db.get(`${msg.author.id}.tAmt`);
            let b = db.get(`${msg.author.id}.sAmt`);
            let c = db.get(`${msg.author.id}.aAmt`);
            let d = db.get(`${msg.author.id}.vAmt`);
            const invEmbed = new Discord.RichEmbed()
                .setTitle("Current Troops in Inventory!")
                .setColor([150, 0, 220])
                .addField("Thanosid", `${a}`, true)
                .addField("saimonGay", `${b}`, true)
                .addField("anumonGamer", `${c}`, true)
                .addField("Future FaZe Varun", `${d}`, true)
                .setAuthor(`${msg.author.username}'s Inventory!`, msg.author.avatarURL)
                .setThumbnail(`https://i.imgur.com/6KR69ku.png`)
                .setImage(`https://i.imgur.com/XYzs8sl.png`)
                .setTimestamp()
                .setFooter('Powered by Anumon Technologies', 'https://i.imgur.com/XYzs8sl.png');
            msg.channel.send(invEmbed)
                .then(msg => {
                msg.delete(20000)
                    .catch(console.error);
            });
        });
    }
}
exports.default = inv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2ludi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLCtCQUErQjtBQUUvQixNQUFxQixHQUFHO0lBQXhCO1FBRXFCLGFBQVEsR0FBRyxLQUFLLENBQUE7SUEwQ3JDLENBQUM7SUF4Q0csSUFBSTtRQUNBLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUNuQixRQUFRLENBQUMsOEJBQThCLENBQUM7aUJBQ3hDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3JCLFFBQVEsQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUM7aUJBQ2hDLFFBQVEsQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUM7aUJBQ2pDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUM7aUJBQ25DLFFBQVEsQ0FBQyxtQkFBbUIsRUFBQyxHQUFHLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQztpQkFDekMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLGVBQWUsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDckUsWUFBWSxDQUFDLGlDQUFpQyxDQUFDO2lCQUMvQyxRQUFRLENBQUMsaUNBQWlDLENBQUM7aUJBQzNDLFlBQVksRUFBRTtpQkFDZCxTQUFTLENBQUMsZ0NBQWdDLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztZQUNwRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7cUJBQ2pDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7Q0FFSjtBQTVDRCxzQkE0Q0MifQ==