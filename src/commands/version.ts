import * as Discord from "discord.js";
import { IBotCommand } from "../api";
var db = require('quick.db');
var Clan = new db.table('clan');

export default class version implements IBotCommand {

    private readonly _command = "version"

    name(): string {
        return "version";
    } 

    help(): string {
        return "version";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        const versionEmbed = new Discord.RichEmbed()
                                .setAuthor('Bendy Man aka The Creator',Bot.user.avatarURL,`https://github.com/protonlaser91/Eclipse`)
                                .setDescription('Current version and build. Can be found at `https://github.com/protonlaser91/Eclipse`')
                                .setColor([200,50,20])
                                .setThumbnail(Bot.user.avatarURL)
                                .addField('Version',0.3,true)
                                .addField('Build','alpha',true)
                                .addBlankField()
                                .addField('Current update','Added clan functionality and new troops')
                                .addField('Future update plans','Add more troops and fix fight')
                                .setFooter('Bendy Corporation',msg.author.avatarURL)
                                .setTimestamp(new Date());
        msg.channel.send(versionEmbed);
    }

}