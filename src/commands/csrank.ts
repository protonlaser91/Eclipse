import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
const fetch = require('node-fetch');

export default class spy implements IBotCommand {

    private readonly _command = "csrank"

    name(): string {
        return "csrank";
    } 

    help(): string {
        return "csrank";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (args[0] == undefined){
            msg.channel.send("My brother! You must Supply Me an ID !!!1");
            return;
        }
        //assume ppl arent idiots
        let api = args[0];
            fetch(`https://steamidfinder.com/lookup/protonlaser91`)
            .then((res: { text: () => void; }) => res.text())
            .then((body: any) => {
                let a = body.split();
                for (var x = 0; x < a.length; x++){
                    if (a[x] == "href"){
                        msg.channel.send(a.slice(x,x+2));
                        console.log(a.slice(x,x+2))
                    } 
                    console.log(a[x]);
                    console.log('holaAmigos')
                }
                //console.log(body)
            })

    }
}