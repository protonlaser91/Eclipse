import * as Discord from "discord.js";

export interface IBotCommand {
    name(): string;
    help(): string;
    cooldown(): number;
    isThisCommand(command: string): boolean;
    runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void>;
}