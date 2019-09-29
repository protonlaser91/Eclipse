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
const itemData_1 = require("../itemData");
class buy {
    constructor() {
        this._command = "buy";
    }
    name() {
        return "buy";
    }
    help() {
        return 'buy';
    }
    cooldown() {
        return 5;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.length < 1) {
                msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
                return;
            }
            let newItemName = args.join(" ");
            let amount = args[0];
            console.log(amount);
            if (isNaN(Number(amount))) {
                msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
                args = ['1', amount];
                amount = 1;
            }
            if (args[1].toLowerCase().includes('thanos'))
                newItemName = 'Thanosid';
            else if (args[1].toLowerCase().includes('sai'))
                newItemName = 'saimonGay';
            else if (args[1].toLowerCase().includes('anu')) {
                newItemName = 'anumonGamer';
            }
            else if (args[1].toLowerCase().includes('var') || args[1].toLowerCase().includes('ffv') || args[1].toLowerCase().includes('fv')) {
                newItemName = 'Future FaZe Varun';
            }
            console.log(args);
            let item = null;
            itemData_1.itemData.items.forEach(element => {
                if (element.name.toLowerCase() == newItemName.toLowerCase()) {
                    item = element;
                }
            });
            if (item === null) {
                msg.reply("That doesn't exist!");
                return;
            }
            let userMoney = db.get(`${msg.author.id}.money`);
            if (userMoney < item.price * amount) {
                msg.reply("You do not have enough rubies to afford that, you poor scrub!");
                return;
            }
            db.add(`${msg.author.id}.money`, -amount * item.price);
            switch (item.name) {
                case "Thanosid":
                    db.add(`${msg.author.id}.tAmt`, amount);
                    break;
                case "saimonGay":
                    db.add(`${msg.author.id}.sAmt`, amount);
                    break;
                case "anumonGamer":
                    db.add(`${msg.author.id}.aAmt`, amount);
                    break;
                case "Future FaZe Varun":
                    db.add(`${msg.author.id}.vAmt`, amount);
                    break;
            }
            msg.channel.send(`You have successfully bought ${amount} ${item.name}!`);
        });
    }
}
exports.default = buy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2J1eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBSS9CLDBDQUF1QztBQUV2QyxNQUFxQixHQUFHO0lBQXhCO1FBRXFCLGFBQVEsR0FBRyxLQUFLLENBQUE7SUFtRnJDLENBQUM7SUFqRkcsSUFBSTtRQUNBLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQywyRkFBMkYsQ0FBQyxDQUFDO2dCQUN2RyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDO2dCQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLDJGQUEyRixDQUFDLENBQUM7Z0JBQ3ZHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNkO1lBR0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxF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