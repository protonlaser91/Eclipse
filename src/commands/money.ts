import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class money implements IBotCommand {

    private readonly _command = "money"

    name(): string {
        return "help";
    } 

    help(): string {
        return "money";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    cooldown(): number {
        return 3;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let moneyAmount = db.get(`${msg.author.id}.money`)
        let glory = db.get(`${msg.author.id}.glory`)
        let moneyEmbed = new Discord.RichEmbed()
            .setTitle(`${msg.author.username}'s Money`)
            .setColor([0,200,0])
            .setDescription(`${moneyAmount} Rubies\n${glory} Glory`)
        
        msg.channel.send(moneyEmbed)
            .then(msg => {
                (msg as Discord.Message).delete(10000)
                    .catch(console.error);
            })
    }

}