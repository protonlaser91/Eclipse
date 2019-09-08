import * as Discord from "discord.js";
import { IBotCommand } from "../api";
const client = new Discord.Client();

export default class kick implements IBotCommand {

    private readonly _command = "kick"

    name(): string {
        return "kick";
    } 

    help(): string {
        return "kick";
    }   

    cooldown(): number {
        return 5;
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let mentionedUser = msg.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let kickLog = `KICKER: ${msg.author.username}, KICKED:${mentionedUser}, REASON: ${suppliedReason}`;

        if (msg.author.id !== `320659246037336064`){
        if (!msg.member.hasPermission("KICK_MEMBERS") || !msg.member.hasPermission("ADMINISTRATOR")){
            msg.reply(`You do not possess the darkness required to kick ${mentionedUser}`);
        }

        if (!mentionedUser){
            msg.reply(`My intelli-Sense tells me that that user does not exist!`);
        }
    }

        msg.guild.member(mentionedUser).kick(kickLog)
            .then(() => {
            //console.log
            const logChannel = msg.member.guild.channels.find(channel => channel.id == "594359615156649984") as Discord.TextChannel;
            logChannel.send(kickLog);
            })
            .catch(() => 
            {
                msg.reply(`It would seem that both of you have darkness. I shall not interfere in your duel.`);
                console.error
            });
        console.log(msg.client.channels.get(`594359615156649984`));


    }

}