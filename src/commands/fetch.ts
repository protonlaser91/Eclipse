import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
const request = require('request');
var firstLine: any;
const cheerio = require('cheerio');

export default class fetch implements IBotCommand {

    private readonly _command = "fetch"

    name(): string {
        return "fetch";
    } 

    help(): string {
        return "fetch";
    }   
    
    cooldown(): number{
        return 4;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {

        function randint(min: number,max: number) // min and max included
{
        return Math.floor(Math.random()*(max-min+1)+min);
}

function image(msg: Discord.Message){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + args.join("+"),
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }

    function reqfunc(error: any, response: any, body: any) {
        if (error) {
            //handle error 
            return;
        }
 
 
        var a = cheerio.load(body); // load responseBody into cheerio (jQuery)
 
         // In this search engine they use ".image a.link" as their css selector for image links
        var links = a(".image a.link");
        //msg.channel.send(links);
        //console.log(links);
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        console.log(urls);
        if (!urls.length) {
           //if array is empty, handle no results
           msg.channel.send("NO images HOMIE!");
            return;
        }

        msg.channel.send({files: [urls[0]]}); //send first item in urls array
    }
 
 
    request(options, reqfunc)

}



     image(msg);

}
        




    }