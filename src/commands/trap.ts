import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
import { userInfo } from "os";
const timestamps: any = new Discord.Collection();
var fs = require('fs');

export default class trap implements IBotCommand {

    private readonly _command = "trap"

    name(): string {
        return "trap";
    } 

    help(): string {
        return "trap";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
      /* let promise = new Promise(function (resolve,reject) {
           if (hasRun){
               msg.channel.send("i have been resolved!");
               resolve();
           }
       })
        await promise.then();
        hasRun = true; */

        if (args[0] == "revert" || args[0] == "undo"){
            msg.channel.send("rl");
            fs.readFileSync(`${msg.guild.id}.txt`, (err: any, data: any) => {
                if (err) throw err;
                console.log(data.split("\n"));
              });
            return;
        }

        if (args.length < 2){
            msg.channel.send("Nope.")
            return;
        }
        var times = 1000;
        const cooldownAmt: number = Number(args[0]);
        const nickname = args.slice(1).join(' ');
        const guildUsers = msg.guild.members;
        //msg.channel.send("SJD*ISJD");
        if (!timestamps.has(msg.author.id)){
            timestamps.set(msg.author.id,Date.now() + cooldownAmt*1000);
        }

        
        var intervalID = setInterval( () => {
              var allNames = "";
              guildUsers.array().forEach(u => { 
                  //  console.log('A');
                    //const nickname = u.user.username + " 7";
                    allNames += `${u.displayName}\n`;
                    if (u.displayName != nickname && !(u.user.id == Bot.user.id)){
                            u.setNickname(nickname).catch(e => {
                            console.log(`Unable to turn: ${u.user.username}, Ordered by ${msg.author.username}`);
                            guildUsers.delete(u.user.id);
                        });
                      }
    
                
              }); 
            
              fs.writeFile(`${msg.guild.id}.txt`, `${allNames}\n`, function (err: any) {
                if (err) console.error;
              });

            if (timestamps.get(msg.author.id) < Date.now()){
                timestamps.delete(msg.author.id); //wait cooldownAmt!
                clearInterval(intervalID);
            }
            //console.log("B");
           // times = 10000;

        }, 30000);

    }
}