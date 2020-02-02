import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class changenick implements IBotCommand {

    private readonly _command = "changenick"

    name(): string {
        return "changenick";
    } 

    help(): string {
        return "changenick";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
       if (args.length < 2){
           return;
       }

       const nickname = args.slice(1).join(" ");

       let mentionedUser = msg.mentions.users.first(); //key = id, val = userObj;
     //  console.log(msg.guild.members.get(mentionedUser.id));
       msg.guild.members.get(mentionedUser.id)!.setNickname(nickname).catch(e => {
           console.error;
       });

    }

}