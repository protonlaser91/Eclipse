import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class test implements IBotCommand {

    private readonly _command = "test"

    name(): string {
        return "test";
    } 

    help(): string {
        return "test";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        //https://discord.gg/TmdaKTB
        var j = new Discord.GuildChannel(new Discord.Guild(Bot,msg),msg);
        let newInvite = j.createInvite({
        maxUses: 1, // After one use it will be void
        unique: true, // That tells the bot not to use an existing invite so that this will be unique
        maxAge: 86400 // By default invites last 24 hours. If you want to change that, modify this (0 = lasts forever, time in seconds)
      });

    }

}