import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class prune implements IBotCommand {

    private readonly _command = "prune"

    name(): string {
        return "prune";
    } 

    help(): string {
        return "prune";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (msg.channel.type == 'text') {
            msg.channel.fetchMessages().then(messages => {
                const botMessages = messages.filter(msg => msg.author.bot);
                msg.channel.bulkDelete(botMessages);
                let messagesDeleted = botMessages.array().length; // number of messages deleted
        
                // Logging the number of messages deleted on both the channel and console.
            }).catch(err => {
                console.log('Error while doing Bulk Delete');
                console.log(err);
            });
        }
    }
}