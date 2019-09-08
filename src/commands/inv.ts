import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class inv implements IBotCommand {

    private readonly _command = "inv"

    name(): string {
        return "inv";
    } 

    help(): string {
        return "inv";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    cooldown(): number {
        return 2;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let a = db.get(`${msg.author.id}.tAmt`)
        let b = db.get(`${msg.author.id}.sAmt`)
        const invEmbed = new Discord.RichEmbed()
                            .setTitle("Current Troops in Inventory!")
                            .setColor([150,0,220])
                            .addField("Thanosid",`${a}`,true)
                            .addField("saimonGay",`${b}`,true)
                            .setAuthor(`${msg.author.username}'s Inventory!`,msg.author.avatarURL)
                            .setThumbnail(`https://i.imgur.com/6KR69ku.png`)
                            .setImage(`https://i.imgur.com/XYzs8sl.png`)
                            .setTimestamp()
                            .setFooter('Powered by Anumon Technologies', 'https://i.imgur.com/XYzs8sl.png');
        msg.channel.send(invEmbed)
            .then(msg => {
            (msg as Discord.Message).delete(20000)
                .catch(console.error);
        });
    }

}