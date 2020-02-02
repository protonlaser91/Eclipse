import * as Discord from "discord.js";
import { IBotCommand } from "../api";
var db = require('quick.db');
var Jokes = new db.table('joke');
import { funnyJoke } from "../index";

export default class joke implements IBotCommand {

    private readonly _command = "joke"

    name(): string {
        return "joke";
    } 

    help(): string {
        return "joke";
    }   
    
    cooldown(): number{
        return 0.2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        var joke = "";
        var john = false;
        var punchline = "";
        args.forEach(element => {
            if (!john){
                joke += element + " ";
            } else {
                punchline += element + " ";
            }

            if (element.includes("|")){
                john = true;   
            }

        });

        if (args.length){
            if (args[0].toLowerCase().startsWith("m")){
                let yerJokes: any = JSON.stringify(Jokes.get(msg.author.id).jokePairs)
                msg.channel.send(yerJokes);
                yerJokes = JSON.parse(yerJokes);
                var troopEmbed = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setTitle(`Joke of the Quadri-Hour`)
                                .setDescription(`All jokes by ${msg.author.username}`)
                                .setAuthor('BOT Tomato / BOT Bendy', Bot.user.avatarURL)
                                .setThumbnail(Bot.user.avatarURL)
                                .setTimestamp()
                                .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png')
                                for (var x = 0; x < 3; x++){
                                    console.log(yerJokes[x]);
                                    troopEmbed.addField(yerJokes[x][0],yerJokes[x][1]);
                                }
                msg.channel.send(troopEmbed);
                return;
        } else if (args[0].toLowerCase().startsWith("d") || args[0].toLowerCase().startsWith("l")){
            //remove jokes!
            return;
        }
        
    }

        if (args.length < 2){
            try {
                funnyJoke(`https://www.reddit.com/r/Jokes/top.json?t=day`,msg.channel);
                } catch (e){
                    console.log(e);
                    msg.channel.send("The joke was not up to standard. Try again!")
                    msg.channel.send({files: ["https://media.giphy.com/media/ek4GqDzKgYWvg4P0Uu/giphy.gif"]});
                }
            return;
        }

        if (!john){
            msg.reply("I don't think you formatted the joke properly! Proper syntax: `!joke <joke> | <punchline>`");
            return;
        }


        msg.channel.send(`Nice joke! <@${msg.author.id}>!`)
        if (!Jokes.has(msg.author.id)){
            Jokes.set(msg.author.id, {jokePairs: [[joke.replace(/\|/g, "").slice(0,joke.length-1),punchline.slice(0,punchline.length-1)]]});
        } else {
            Jokes.push(`${msg.author.id}.jokePairs`,[joke.replace(/\|/g, "").slice(0,joke.length-1),punchline.slice(0,punchline.length-1)]);
        }

        console.log(JSON.stringify(Jokes.get(msg.author.id)));
        console.log(Jokes.all())
    }


}