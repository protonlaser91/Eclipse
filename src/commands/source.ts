import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
const fetch = require('node-fetch');

export default class source implements IBotCommand {

    private readonly _command = "source"

    name(): string {
        return "source";
    } 

    help(): string {
        return "source";
    }   
    
    cooldown(): number{
        return 5;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        msg.reply("You can find my source code at `https://github.com/protonlaser91/Eclipse`");
        return;

    }
}