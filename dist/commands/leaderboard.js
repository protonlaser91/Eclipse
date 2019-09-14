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
            function compareSecondColumn(a, b) {
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
                pC.sort(compareSecondColumn);
                console.log(pC);
                if (pC.length < 10) {
                    for (let x = (10 - pC.length); x < 10; x++) {
                        pC.push([0, 'No one', 0]);
                    }
                }
                msg.channel.send(`pos num ${iNum}`);
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
                    .addField(`**#${iNum}:** ${pC[iNum - 1][1]}`, `**${pC[iNum - 1][2]}** glory points!`, false)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFHL0IsTUFBcUIsV0FBVztJQUFoQztRQUVxQixhQUFRLEdBQUcsYUFBYSxDQUFBO0lBNkU3QyxDQUFDO0lBM0VHLElBQUk7UUFDQSxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxTQUFTLG1CQUFtQixDQUFDLENBQXNCLEVBQUUsQ0FBc0I7Z0JBQ3ZFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDZixPQUFPLENBQUMsQ0FBQztpQkFDWjtxQkFDSTtvQkFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztZQUNMLENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUM7Z0JBQ3RCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQzthQUM5RTtZQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtZQUNYLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDcEMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3JDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUM7d0JBQy9CLFNBQVM7cUJBQ1o7b0JBQ0QsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDO3dCQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQTtxQkFBQztvQkFDbEQsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNuRjtnQkFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUM7b0JBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDdkMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0I7aUJBRUo7Z0JBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtxQkFDbkIsU0FBUyxDQUFDLGNBQWMsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztxQkFDNUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3FCQUNoQyxjQUFjLENBQUMsNENBQTRDLENBQUM7cUJBQzVELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzdELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUM7cUJBQzlELFFBQVEsQ0FBQyxNQUFNLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBQyxLQUFLLENBQUM7cUJBQ3JGLFNBQVMsQ0FBQyxjQUFjLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7cUJBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN0QztpQkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztnQkFDbkQsT0FBTzthQUNWO1FBRUwsQ0FBQztLQUFBO0NBRUo7QUEvRUQsOEJBK0VDIn0=