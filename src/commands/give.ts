import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class give implements IBotCommand {

    private readonly _command = "give"

    name(): string {
        return "give";
    } 

    help(): string {
        return "give";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (args.length < 2 || isNaN(Number(args[1]))){
            msg.reply("Proper usage: `!give @user amt item`");
            return;
        }
        
        let n = parseInt(args[1]);
        let item = args[2];
        if (item === undefined){
            msg.reply('please return what item you want to increase/decrease!');
            return;
        }
        if (msg.author.id === '320659246037336064'){
            let mentionedUser = msg.mentions.users.first();
            try {
            if (item.toLowerCase().startsWith('m') || item.toLowerCase().startsWith('r')){
            db.add(`${mentionedUser.id}.money`, n)
            msg.channel.send(`Successfully gave ${mentionedUser} ${n} rubies!`);
            }
            else if (item.toLowerCase().startsWith('g')){
                db.add(`${mentionedUser.id}.glory`, n)
                msg.channel.send(`Successfully gave ${mentionedUser} ${n} glory!`);
            }
            }
            catch {
                console.error
                msg.reply("I can't really give a role money... yeah...");
            }
            
        } else {
            msg.reply("You do not have the power of The Dark One");
        }

    }

}