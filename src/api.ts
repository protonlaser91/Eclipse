import * as Discord from "discord.js";

export interface IBotCommand { //basically the blueprint for all commands to follow!
    name(): string;
    help(): string;
    cooldown(): number;
    isThisCommand(command: string): boolean; //make sure commands are all checked (i could get rid of this but its a nice safeguard along with config.ts!)
    runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void>; /*give the args, msg and bot, and is of type Promise<void> 
    which all that really means is that it's expecting the data to be asynchronous; not orderly. Basically it'll be a lot more lenient with you ;D
    */
}