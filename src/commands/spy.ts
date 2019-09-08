import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class spy implements IBotCommand {

    private readonly _command = "spy"

    name(): string {
        return "spy";
    } 

    help(): string {
        return "spy";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        msg.delete(0);
        let mentionedUser = msg.mentions.users.first();
        if (!mentionedUser){
            msg.reply('You need to specify a user to spy on!');
            return;
        }

        if (args.length < 1){
            msg.reply('Proper usage: `!spy <username> <time>` Do note that time is optional and will be defaulted to 2 if no input. #TIME HAS NOT BEEN ADDED YET!');
            return;
        }

        if (isNaN(Number(args[1]))){
           var time = 2;
        } else {
           var time = parseFloat(args[1])
        }

        if (Math.random() < 0.5){
            //succ ess
            const t = db.get(`${mentionedUser.id}.tAmt`);
            const s = db.get(`${mentionedUser.id}.sAmt`);
            const m = db.get(`${mentionedUser.id}.money`);
            const g = db.get(`${mentionedUser.id}.glory`);
            const a = new Discord.RichEmbed()
                        .setColor([12,12,12])
                        .setDescription(`The espionage was a success! Information about the enemy's troops, money and glory are present in this report`)
                        .setThumbnail(mentionedUser.avatarURL)
                        .setAuthor(`${msg.author.username}'s Spy Report`,msg.author.avatarURL)
                        .addField('Enemy Thanosid',t,true)
                        .addField('Enemy saimonGay',s,true)
                        .addField('Enemy money',`${m} rubies`,true)
                        .addField('Enemy Glory',`${g} glory`,true)
                        .setFooter(`Espionage Report On ${mentionedUser.username}`)
                        .setTimestamp(new Date())
            msg.author.send(a);
        } else {
            msg.author.send(`<@${msg.author.id}>, your spy never made it back... The enemy now knows that you have attempted an espionage! Stay alert!`);
            mentionedUser.send(`Alert, <@${mentionedUser.id}>, ||${msg.author.username}|| has attempted to spy on you!`);
        }

    }

}