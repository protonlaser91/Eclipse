import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class thanos implements IBotCommand {

    private readonly _command = "thanos"

    name(): string {
        return "thanos";
    } 

    help(): string {
        return "thanos";
    }   
    
    cooldown(): number{
        return 5;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        msg.delete(0);
        msg.channel.send({files: ["https://cdn.discordapp.com/attachments/575856402153603074/628699045724160045/2019-05-23.png"]});
        return;

    }
}