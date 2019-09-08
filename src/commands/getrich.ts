import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class getrich implements IBotCommand {

    private readonly _command = "getrich"

    name(): string {
        return "getrich";
    } 

    help(): string {
        return "getrich";
    }   
    
    cooldown(): number{
        return 20000;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        function randomIntFromInterval(min: number,max: number) // min and max included
{
        return Math.floor(Math.random()*(max-min+1)+min);
}
        let x = randomIntFromInterval((Math.ceil(1+db.get(`${msg.author.id}.glory`)/1000)*150),(Math.ceil(1+db.get(`${msg.author.id}.glory`)/1000)*900));
        let desc = [`You visited Smarmy's house and took his dog`,`You visited Smarmy's dog and took his house`,`You stole Smarmy's Pokémon Cards and sold them on the black market`,`You stole Smarmy's soul and sold it to GregThe`,`You bullied Smarmy and took his lunch money`,'You accidentally killed Smarmy','You removed all of Smarmy\'s atoms','You arrested Smarmy for stealing your M&M\'s','You bring Smarmy to court and accuse him of public indecency','You deleted Smarmy','You went fishing with Smarmy and used him as bait once yours ran out','You rescued someone from an army of armed bandit robbers and upon realizing that the person you saved was Smarmy, you dropped him right back to where you found him','You threw Smarmy over your shoulder','You convinced the military to aim all their nukes at Smarmy'];
        db.add (`${msg.author.id}.money`,x)
        let moneyAmount = db.get(`${msg.author.id}.money`)
        let moneyEmbed = new Discord.RichEmbed()
            .setTitle(`${msg.author.username}'s Received Money`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .addField(`${desc[randomIntFromInterval(0,desc.length - 1)]}. You have been awarded ${x} rubies for this noble and gallant task.`,`Current amount: ${moneyAmount} Rubies`,true)
        
        msg.channel.send(moneyEmbed)
            .then(msg => {
                (msg as Discord.Message).delete(15000)
                    .catch(console.error);
            })
    }

}