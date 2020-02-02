import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
import { userInfo } from "os";
import { FORMERR } from "dns";
const spoken: any = new Discord.Collection();
var numUsers: number = 0;
var intervalID: any;
var stopRunning = false;

export default class snape implements IBotCommand {

    private readonly _command = "snape"

    name(): string {
        return "snape";
    } 

    help(): string {
        return "snape";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        const specialChars = ["①","②","③","④","⑤","⑥","⑦","⑧"];
        var specialChar: string = "0";
        const guildUsers = msg.guild.members;
        const filter = (m: any) => (!spoken.has(m.author.id) && !m.author.bot && (m.guild.id == msg.guild.id));
        const collector = msg.channel.createMessageCollector(filter, { time: 864000 * 1000}); //last 10 days!!!!!!!!!!!!
        collector.on('collect', (m: any) => {
            //anything that satisfies filter!
            spoken.set(m.author.id,Date.now() + 86400 * 1000); //last 8 seconds!
        })
        
        if (args[0] == "stop"){
           stopRunning = true;
        }

        //is async, will reach this point!
              intervalID = setInterval( () => {
              spoken.forEach((v: any,k: any) => {
                  if (v < Date.now()){
                      spoken.delete(k);
                  }
              });
              numUsers = spoken.size;
             // msg.channel.send(`# of ppl speak: ${numUsers}`);
             console.log(`UNum: ${numUsers}`);
              guildUsers.array().forEach(u => {
                //  msg.channel.send(specialChar);
                  if (!u.user.bot){
                    var newNick = u.displayName;
                    specialChars.forEach(element => {
                        newNick = newNick.replace(new RegExp(element,"gi"),'');
                    });

                    switch (numUsers){
                        case 0:
                            specialChar = "";
                        case 1:
                            specialChar = "①";
                            break;
                        case 2:
                            specialChar = "②";
                            break;
                        case 3:
                            specialChar = "③";
                            break;
                        case 4:
                            specialChar = "④";
                            break;
                        case 5:
                            specialChar = "⑤";
                            break;
                        case 6:
                            specialChar = "⑥";
                            break;
                        case 7:
                            specialChar = "⑦";
                            break;
                        case 8:
                            specialChar = "⑧";
                            break;
                  }
                      u.setNickname(newNick + ` ${specialChar}`).catch(e => {
                          console.log(`Unable to turn: ${u.user.username}, Ordered by ${msg.author.username}`);
                          guildUsers.delete(u.user.id);
                    });
                  }
              }); 
              if (stopRunning){
                  clearInterval(intervalID);
                  msg.channel.send("CLEARED!");
              }
        }, 50000);

    }
}