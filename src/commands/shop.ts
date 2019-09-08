import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class shop implements IBotCommand {

    private readonly _command = "shop"

    name(): string {
        return "shop";
    } 

    help(): string {
        return "shop";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    cooldown(): number{
        return 3;
    }
    

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let shopEmbed = new Discord.RichEmbed()
                                .setColor('#0099ff')
                                .setTitle('Items')
                                .setAuthor('Shop', msg.author.avatarURL)
                                .setDescription('Buy troops here. Run !info <troop_name> to understand more about the troop.')
                                .setThumbnail('https://i.imgur.com/od8x6yh.png')
                                .addBlankField()
                                .addField('Thanosid', `800 rubies`, true)
                                .addField('saimonGay', '2 rubies', true)
                                .setImage('https://i.imgur.com/6KR69ku.png')
                                .setTimestamp()
                                .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png');
        msg.channel.send(shopEmbed);
    }

}