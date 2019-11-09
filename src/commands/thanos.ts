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
        msg.channel.send({files: ["https://media.giphy.com/media/KeuU0oaPNW6HnnTX0g/giphy.gif"]});
        return;

    }
}