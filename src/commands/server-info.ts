import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class serverCommand implements IBotCommand {

    private readonly _command = "server-info"

    name(): string {
        return "servr-info";
    } 

    help(): string {
        return "server-info";
    }   

    cooldown(): number {
        return 2;
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let embed = new Discord.RichEmbed()
                        .setTitle(`The ${msg.guild.name} Server`)
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setFooter("Server information",Bot.user.avatarURL)
                        .setImage(msg.guild.iconURL)
                        .setDescription(`This server currently has ${msg.guild.memberCount} members. The region is ${msg.guild.region}`)
                        .setTimestamp()
        
                        msg.channel.send(embed)
                            .catch(console.error);
    }

}