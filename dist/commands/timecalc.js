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
const util_1 = require("util");
class timecalc {
    constructor() {
        this._command = "timecalc";
    }
    name() {
        return "timecalc";
    }
    help() {
        return "timecalc";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    cooldown() {
        return 1.6;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let time = 3600 * 5 * 1000;
            if (!args.length) {
                msg.reply("Proper usage: `!timecalc <time_in_hours>`");
                return;
            }
            if (!util_1.isNull(args[0])) {
                if (isNaN(Number(args[0]))) {
                    time = 5;
                    var rubyAmt = 0;
                }
                else {
                    time = parseFloat(args[0]);
                    if (time >= 1 && time <= 5) {
                        var rubyAmt = Math.round(-208.333 * Math.pow(time, 3) + 2885.71 * Math.pow(time, 2) - 13356 * time + 20710);
                    }
                    else if (time < 0.4) {
                        var rubyAmt = 10000000 - 2.4 * Math.pow(10, 7) * time;
                    }
                    else if (time < 1) {
                        var rubyAmt = Math.round(1000000 * -1.08356 * time * (Math.log(0.990814 * time)));
                    }
                    else {
                        var rubyAmt = Math.round(0.0295008 * Math.pow(time, 4) + 1.35913 * Math.pow(time, 3) - 12.3358 * Math.pow(time, 2) + 102.504 * time - 355.576);
                    }
                }
                msg.reply(`Your ruby cost would be ${rubyAmt}`);
            }
        });
    }
}
exports.default = timecalc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWNhbGMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdGltZWNhbGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLCtCQUE4QjtBQUU5QixNQUFxQixRQUFRO0lBQTdCO1FBRXFCLGFBQVEsR0FBRyxVQUFVLENBQUE7SUFtRDFDLENBQUM7SUFqREcsSUFBSTtRQUNBLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO2dCQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztnQkFDdkQsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLGFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDakIsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFDSTtvQkFDRCxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMxQixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBQzt3QkFDdkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sR0FBQyxTQUFBLElBQUksRUFBRSxDQUFDLENBQUEsR0FBRyxPQUFPLEdBQUMsU0FBQSxJQUFJLEVBQUUsQ0FBQyxDQUFBLEdBQUcsS0FBSyxHQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztxQkFDckY7eUJBQ0ksSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFDO3dCQUNoQixJQUFJLE9BQU8sR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFDLFNBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQSxHQUFHLElBQUksQ0FBQztxQkFDN0M7eUJBQ0ksSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFDO3dCQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFDLElBQUksR0FBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDaEY7eUJBQ0k7d0JBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUMsU0FBQSxJQUFJLEVBQUUsQ0FBQyxDQUFBLEdBQUcsT0FBTyxHQUFDLFNBQUEsSUFBSSxFQUFFLENBQUMsQ0FBQSxHQUFHLE9BQU8sR0FBQyxTQUFBLElBQUksRUFBRSxDQUFDLENBQUEsR0FBRyxPQUFPLEdBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM1RztpQkFDSjtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLDJCQUEyQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBR25EO1FBRUwsQ0FBQztLQUFBO0NBQ0E7QUFyREQsMkJBcURDIn0=