import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
import { isNull } from "util";

export default class leaderboard implements IBotCommand {

    private readonly _command = "leaderboard"

    name(): string {
        return "leaderboard";
    } 

    help(): string {
        return "leaderboard";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        function compareSecondColumn(a: (string | number)[], b: (string | number)[]) {
            if (a[2] === b[2]) {
                return 0;
            }
            else {
                return (a[2] < b[2]) ? 1 : -1;
            }
        }
        if (args[0] === undefined){
            args = ['p'];
            msg.reply('If you want to see clan leaderboards, run `!leaderboard clan`');
        }

        let pC = []
        var iNum = 0;
        if (args[0].toLowerCase().includes('p')){
            let allUsers = Bot.users.array();
            for (let i = 0; i < allUsers.length; i++){
                if (parseInt(allUsers[i].id) === 1){
                    continue;
                }
                if (allUsers[i].id == msg.author.id){var iNum = i}
                pC.push([allUsers[i].id,allUsers[i].username,db.get(`${allUsers[i].id}.glory`)])
            }
            pC.sort(compareSecondColumn);
            console.log(pC);
            if (pC.length < 10){
                for (let x = (10 - pC.length); x < 10; x++){
                    pC.push([0,'No one',0]);
                }
            
            }

            msg.channel.send(`pos num ${iNum}`);
            const leaderboardEmbed = new Discord.RichEmbed()
                                        .setAuthor('Leaderboard!',Bot.user.avatarURL)
                                        .setThumbnail(Bot.user.avatarURL)
                                        .setDescription('See the top 10 people with the most glory!')
                                        .addField(`#1: ${pC[0][1]}`,`${pC[0][2]} glory points!`,false)
                                        .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                                        .addField(`#3: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                                        .addField(`#4: ${pC[3][1]}`,`${pC[3][2]} glory points!`,false)
                                        .addField(`#5: ${pC[4][1]}`,`${pC[4][2]} glory points!`,false)
                                        .addField(`#6: ${pC[5][1]}`,`${pC[5][2]} glory points!`,false)
                                        .addField(`#7: ${pC[6][1]}`,`${pC[6][2]} glory points!`,false)
                                        .addField(`#8: ${pC[7][1]}`,`${pC[7][2]} glory points!`,false)
                                        .addField(`#9: ${pC[8][1]}`,`${pC[8][2]} glory points!`,false)
                                        .addField(`#10: ${pC[9][1]}`,`${pC[9][2]} glory points!`,false)
                                        .addField(`**#${iNum}:** ${pC[iNum-1][1]}`,`**${pC[iNum-1][2]}** glory points!`,false)
                                        .setFooter('Leaderboards',msg.author.avatarURL)
                                        .setColor(Math.floor(Math.random() * 16777214) + 1);
            msg.channel.send(leaderboardEmbed);
        } else if (args[0].toLowerCase().startsWith('c')){
            msg.reply("haven't added that feature yet chief!");
            return;
        }

    }

}