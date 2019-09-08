import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
import { isNull } from "util";

export default class timecalc implements IBotCommand {

    private readonly _command = "timecalc"

    name(): string {
        return "timecalc";
    } 

    help(): string {
        return "timecalc";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    cooldown(): number {
        return 1.6;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let time = 3600 * 5 * 1000; //time in milliseconds for 5 hour attack (default) -208.333 x^3 + 2885.71 x^2 - 13356. x + 20710
        if (!args.length){
            msg.reply("Proper usage: `!timecalc <time_in_hours>`");
            return;
        }

        if (!isNull(args[0])){
            if (isNaN(Number(args[0]))){
                time = 5;
                var rubyAmt = 0;
            }
            else {
                time = parseFloat(args[0])
                if (time >= 1 && time <= 5){
                    var rubyAmt = Math.round(-208.333*time**3 + 2885.71*time**2 - 13356*time + 20710);
                }
                else if (time < 0.4){
                    var rubyAmt = 10000000 - 2.4*10**7 * time;
                }
                else if (time < 1){
                    var rubyAmt = Math.round(1000000 * -1.08356*time *(Math.log(0.990814*time)));
                }
                else {
                    var rubyAmt = Math.round(0.0295008*time**4 + 1.35913*time**3 - 12.3358*time**2 + 102.504*time - 355.576);
                }
            }
        msg.reply(`Your ruby cost would be ${rubyAmt}`);
            
     
    }

}
}