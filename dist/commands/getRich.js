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
class getrich {
    constructor() {
        this._command = "getrich";
    }
    name() {
        return "getrich";
    }
    help() {
        return "getrich";
    }
    cooldown() {
        return 20000;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            let x = randomIntFromInterval((Math.ceil(1 + db.get(`${msg.author.id}.glory`) / 1000) * 150), (Math.ceil(1 + db.get(`${msg.author.id}.glory`) / 1000) * 900));
            let desc = [`You visited Smarmy's house and took his dog`, `You visited Smarmy's dog and took his house`, `You stole Smarmy's Pokémon Cards and sold them on the black market`, `You stole Smarmy's soul and sold it to GregThe`, `You bullied Smarmy and took his lunch money`, 'You accidentally killed Smarmy', 'You removed all of Smarmy\'s atoms', 'You arrested Smarmy for stealing your M&M\'s', 'You bring Smarmy to court and accuse him of public indecency', 'You deleted Smarmy', 'You went fishing with Smarmy and used him as bait once yours ran out', 'You rescued someone from an army of armed bandit robbers and upon realizing that the person you saved was Smarmy, you dropped him right back to where you found him', 'You threw Smarmy over your shoulder', 'You convinced the military to aim all their nukes at Smarmy'];
            db.add(`${msg.author.id}.money`, x);
            let moneyAmount = db.get(`${msg.author.id}.money`);
            let moneyEmbed = new Discord.RichEmbed()
                .setTitle(`${msg.author.username}'s Received Money`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .addField(`${desc[randomIntFromInterval(0, desc.length - 1)]}. You have been awarded ${x} rubies for this noble and gallant task.`, `Current amount: ${moneyAmount} Rubies`, true);
            msg.channel.send(moneyEmbed)
                .then(msg => {
                msg.delete(15000)
                    .catch(console.error);
            });
        });
    }
}
exports.default = getrich;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0cmljaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZXRyaWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBRS9CLE1BQXFCLE9BQU87SUFBNUI7UUFFcUIsYUFBUSxHQUFHLFNBQVMsQ0FBQTtJQXNDekMsQ0FBQztJQXBDRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLFNBQVMscUJBQXFCLENBQUMsR0FBVyxFQUFDLEdBQVc7Z0JBRXRELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFDTyxJQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakosSUFBSSxJQUFJLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBQyw2Q0FBNkMsRUFBQyxvRUFBb0UsRUFBQyxnREFBZ0QsRUFBQyw2Q0FBNkMsRUFBQyxnQ0FBZ0MsRUFBQyxvQ0FBb0MsRUFBQyw4Q0FBOEMsRUFBQyw4REFBOEQsRUFBQyxvQkFBb0IsRUFBQyxzRUFBc0UsRUFBQyxxS0FBcUssRUFBQyxxQ0FBcUMsRUFBQyw2REFBNkQsQ0FBQyxDQUFDO1lBQ3Z5QixFQUFFLENBQUMsR0FBRyxDQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ2xELElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDbkMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLG1CQUFtQixDQUFDO2lCQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsRCxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsMENBQTBDLEVBQUMsbUJBQW1CLFdBQVcsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFBO1lBRW5MLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7S0FBQTtDQUVKO0FBeENELDBCQXdDQyJ9