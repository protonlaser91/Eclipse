"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const db = require("quick.db");
class leaderboard {
    constructor() {
        this._command = "leaderboard";
    }
    name() {
        return "leaderboard";
    }
    help() {
        return "leaderboard";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            function cTC(a, b) {
                if (a[2] === b[2]) {
                    return 0;
                }
                else {
                    return (a[2] < b[2]) ? 1 : -1;
                }
            }
            if (args[0] === undefined) {
                args = ['p'];
                msg.reply('If you want to see clan leaderboards, run `!leaderboard clan`');
            }
            let pC = [];
            var iNum = 0;
            if (args[0].toLowerCase().includes('p')) {
                let allUsers = Bot.users.array();
                for (let i = 0; i < allUsers.length; i++) {
                    if (parseInt(allUsers[i].id) === 1) {
                        continue;
                    }
                    if (allUsers[i].id == msg.author.id) {
                        var iNum = i;
                    }
                    pC.push([allUsers[i].id, allUsers[i].username, db.get(`${allUsers[i].id}.glory`)]);
                }
                pC.sort(cTC);
                var tNum = 0;
                for (let p = 0; p < pC.length; p++) {
                    if (pC[p][0] == msg.author.id) {
                        tNum = p;
                    }
                }
                console.log(pC);
                if (pC.length < 10) {
                    for (let x = (10 - pC.length); x < 10; x++) {
                        pC.push([0, 'No one', 0]);
                    }
                }
                msg.channel.send(`Position Number: ${iNum} or ${tNum}`);
                const leaderboardEmbed = new Discord.RichEmbed()
                    .setAuthor('Leaderboard!', Bot.user.avatarURL)
                    .setThumbnail(Bot.user.avatarURL)
                    .setDescription('See the top 10 people with the most glory!')
                    .addField(`#1: ${pC[0][1]}`, `${pC[0][2]} glory points!`, false)
                    .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                    .addField(`#3: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                    .addField(`#4: ${pC[3][1]}`, `${pC[3][2]} glory points!`, false)
                    .addField(`#5: ${pC[4][1]}`, `${pC[4][2]} glory points!`, false)
                    .addField(`#6: ${pC[5][1]}`, `${pC[5][2]} glory points!`, false)
                    .addField(`#7: ${pC[6][1]}`, `${pC[6][2]} glory points!`, false)
                    .addField(`#8: ${pC[7][1]}`, `${pC[7][2]} glory points!`, false)
                    .addField(`#9: ${pC[8][1]}`, `${pC[8][2]} glory points!`, false)
                    .addField(`#10: ${pC[9][1]}`, `${pC[9][2]} glory points!`, false)
                    .addField(`**#${tNum + 1}:** ${pC[tNum][1]}`, `**${pC[tNum][2]}** glory points!`, false)
                    .setFooter('Leaderboards', msg.author.avatarURL)
                    .setColor(Math.floor(Math.random() * 16777214) + 1);
                msg.channel.send(leaderboardEmbed);
            }
            else if (args[0].toLowerCase().startsWith('c')) {
                msg.reply("haven't added that feature yet chief!");
                return;
            }
        });
    }
}
exports.default = leaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFHL0IsTUFBcUIsV0FBVztJQUFoQztRQUVxQixhQUFRLEdBQUcsYUFBYSxDQUFBO0lBbUY3QyxDQUFDO0lBakZHLElBQUk7UUFDQSxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxTQUFTLEdBQUcsQ0FBQyxDQUFzQixFQUFFLENBQXNCO2dCQUN2RCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2YsT0FBTyxDQUFDLENBQUM7aUJBQ1o7cUJBQ0k7b0JBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFDO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDYixHQUFHLENBQUMsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7YUFDOUU7WUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7WUFDWCxJQUFJLElBQUks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SyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM3RCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDO3FCQUM5RCxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBQyxLQUFLLENBQUM7cUJBQ25GLFNBQVMsQ0FBQyxjQUFjLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7cUJBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN0QztpQkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztnQkFDbkQsT0FBTzthQUNWO1FBRUwsQ0FBQztLQUFBO0NBRUo7QUFyRkQsOEJBcUZDIn0=