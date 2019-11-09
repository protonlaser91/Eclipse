import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
const fetch = require('node-fetch');
const request = require('request');
var firstLine: any;


export default class csrank implements IBotCommand {

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

        function randint(min: number,max: number) // min and max included
{
        return Math.floor(Math.random()*(max-min+1)+min);
}

        const rankArr = ["Unknown","Silver I", "Silver II", "Silver III", "Silver IV", "Silver Elite", "Silver Elite Master", "Gold Nova I", "Gold Nova II",
        "Gold Nova III", "Gold Nova Master", "Master Guardian I", "Master Guardian II","Master Guardian Elite", "Distinguished Master Guardian", 
        "Legendary Eagle", "Legendary Eagle Master", "Supreme Master First Class", "The Global Elite", "Varun Duvvur-bendy"] //from 1-18! Verstehen?

        if (args[0] == undefined){
            msg.channel.send("My brother! You must Supply Me an ID !!!1");
            return;
        }
        
        //assume ppl arent idiots
        let api = args[0];
        const options = {
            url: `https://steamid.io/lookup/${api}`,
            method: 'GET',
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        
        request(options, function(err: any, res: any, body: any) {
            var stringCheck = body.toString();
            firstLine = stringCheck.split('\n')[7];
            firstLine = firstLine.split(" ")[firstLine.split(" ").length-1];
            firstLine = firstLine.slice(1,firstLine.length-3);
            if (isNaN(firstLine)){
                msg.channel.send("NOT VALID STEAM ID!");
                return;
            }
            msg.channel.send(`STEAM64 ID: ${firstLine} \nCSGO-STATS is pretty slow. Gimme some time!`).then(msg => {
                (msg as Discord.Message).delete(9000)
                    .catch(console.error);
            });
            msg.channel.send({files: ["https://media.giphy.com/media/IgjQgp6ZsiWU28JtmE/giphy.gif"]}).then(msg => {
                (msg as Discord.Message).delete(9000)
                    .catch(console.error);
            })

        const options2 = {
            url: `https://csgo-stats.com/player/${firstLine}`,
            method: 'GET',
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options2, function(err: any, res: any, body: any) {
            var imageArr = body.toString();
            let index = imageArr.indexOf(`<div class="rank"><img src="/custom/img/ranks`)
            imageArr = imageArr.slice(index,index+56);
            if (imageArr.includes('-')){
                imageArr = 0;
            } else {
            try {
            imageArr = imageArr.match(/\d+/)[0]
            } catch {
                imageArr = 0;
            }
        }
            console.log(imageArr);

            let rankEmbed = new Discord.RichEmbed()
            .setTitle(`${api}'s CSGO Rank!`)
            .addBlankField()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setDescription(`${api}'s rank: **${rankArr[imageArr < 18 ? imageArr : 19]}**`)
            .setImage(`https://csgostats.gg/images/ranks/${imageArr}.png`);
        msg.channel.send(rankEmbed)
        //console.log(r);
        });

        
        });

        
    }
}