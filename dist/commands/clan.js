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
const util_1 = require("util");
var db = require('quick.db');
var Clan = new db.table('clan');
class clan {
    constructor() {
        this._command = "clan";
    }
    name() {
        return "clan";
    }
    help() {
        return "clan";
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
            var clanlist = [];
            let allUsers = Bot.users.array();
            for (var x = 0; x < allUsers.length; x++) {
                if (clanlist.includes(db.get(`${allUsers[x].id}.clanname`))) {
                    continue;
                }
                clanlist.push(db.get(`${allUsers[x].id}.clanname`));
            }
            if (db.get(`${msg.author.id}.clanname`) != 'None') {
                var noSec = false;
                let fmlst = [];
                let glst = [];
                let mlst = [];
                let llst = [];
                let slst = [];
                let plst = [];
                var cName = db.get(`${msg.author.id}.clanname`);
                for (var x = 0; x < Clan.get(`${cName}.memberids`).length; x++) {
                    var mid = Clan.get(`${cName}.memberids`);
                    var mun = Clan.get(`${cName}.memberuns`);
                    switch (db.get(`${mid}.position`)) {
                        case 'Commander':
                            console.log('got ocmmander!');
                            console.log(mun[x]);
                            var commandid = mid[x];
                            var commandun = `***Cdr.***  ${mun[x]}`;
                            break;
                        case 'Field Marshal':
                            fmlst.push([mid[x], `**F. Marshal**  ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'General':
                            glst.push([mid[x], `*Gen.*  ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Major':
                            mlst.push([mid[x], `*Maj.*  ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Lieutenant':
                            llst.push([mid[x], `Lt.  ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Sergeant':
                            slst.push([mid[x], `Sgt.  ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Private':
                            plst.push([mid[x], `Pvt.  ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
                            break;
                    }
                }
                fmlst.sort(cTC);
                glst.sort(cTC);
                mlst.sort(cTC);
                llst.sort(cTC);
                slst.sort(cTC);
                plst.sort(cTC);
                var megaList = [[commandid, commandun, db.get(`${commandid}.glory`)]].concat(fmlst, glst, mlst, llst, slst, plst);
                try {
                    var secc = megaList[1][0];
                }
                catch (_a) {
                    var noSec = true;
                }
            }
            if (args[0] === undefined) {
                msg.reply('no!');
                args = ['s'];
            }
            if (args[0].toLowerCase().includes('j')) {
                if (args.length < 2) {
                    msg.reply('Proper usage: `!clan <make/join/leave/show> <clanname>`');
                    msg.channel.send(`Available Clans: ${clanlist}`);
                    return;
                }
                if (db.get(`${msg.author.id}.clanname`) == 'None') {
                    let cl = [];
                    for (var x = 0; x < args.slice(1).length; x++) {
                        try {
                            cl.push(args.slice(1)[x].toLowerCase());
                        }
                        catch (_b) {
                            cl.push(`${args.slice(1)[x]}`);
                        }
                    }
                    let cl2 = cl.join(' ');
                    for (var x = 0; x < clanlist.length; x++) {
                        console.log(clanlist[x]);
                        if (clanlist[x].toLowerCase().includes(cl2)) {
                            if (Clan.get(`${clanlist[x]}.memberids`).length >= 12) {
                                msg.reply('This clan is full!');
                                return;
                            }
                            db.set(`${msg.author.id}.clanname`, clanlist[x]);
                            db.set(`${msg.author.id}.position`, `Private`);
                            megaList.push(msg.author.id, `Pvt.  ${msg.author.username}`, db.get(`${msg.author.id}.glory`));
                            Clan.push(`${clanlist[x]}.memberids`, msg.author.id);
                            Clan.push(`${clanlist[x]}.memberuns`, msg.author.username);
                            console.log(cl2);
                            msg.reply(`Successfully added you to clan \`${clanlist[x]}\``);
                            return;
                        }
                    }
                    msg.reply('Unable to find that clan! If this is an error, please message p1ng!');
                    msg.reply(`Expected reply: ${clanlist}\n Reply received: ${cl2}`);
                }
                else {
                    msg.reply('You are already in a clan!');
                }
            }
            else if (args[0].toLowerCase().includes('m')) {
                let rAmt = db.get(`${msg.author.id}.money`);
                if (rAmt < 5000) {
                    msg.reply('You do not have enough rubies to create a clan! You need at least 5000 rubies or message the author of this bot for permission to add a clan.');
                    return;
                }
                if (args.length < 2) {
                    msg.reply('Proper usage: `!clan make <clanname>`');
                    return;
                }
                let cname2 = args.slice(1).join(' ');
                if (Clan.all().includes(cname2)) {
                    msg.reply('clan already exists or is too similar to other clan names!');
                    return;
                }
                msg.reply(`clan name: ${cname2}`);
                db.add(`${msg.author.id}.money`, -5000);
                console.log(cname2);
                if (util_1.isNull(Clan.get(cname2))) {
                    Clan.set(cname2, { prestige: 0, money: 0, memberids: [msg.author.id], memberuns: [msg.author.username] });
                }
                else {
                    msg.reply('That clan already exists!');
                }
                db.set(`${msg.author.id}.clanname`, cname2);
                db.set(`${msg.author.id}.position`, 'Commander');
                msg.reply(`Successfully created clan \`${args.slice(1).join(' ')}\` and made you a Commander!`);
            }
            else if (args[0].toLowerCase().includes('l')) {
                if (db.get(`${msg.author.id}.clanname`) === 'None') {
                    msg.reply('You are not in a clan to leave!');
                    return;
                }
                var index = mid.indexOf(msg.author.id);
                var indexUN = mun.indexOf(msg.author.username);
                if (index > -1 || indexUN > -1) {
                    mid.splice(index, 1);
                    mun.splice(indexUN, 1);
                }
                else {
                    msg.reply('There was an error removing you from the clan.');
                    return;
                }
                if (db.get(`${msg.author.id}.position`) === 'Commander') {
                    db.set(`${msg.author.id}.position`, '');
                    db.set(`${msg.author.id}.clanname`, 'None');
                    db.set(`${secc}.position`, 'Commander');
                }
                Clan.set(`${db.get(`${msg.author.id}.clanname`)}.memberids`, mid);
                Clan.set(`${db.get(`${msg.author.id}.clanname`)}.memberuns`, mun);
                msg.reply(`Successfully removed you from clan ${db.get(`${msg.author.id}.clanname`)}`);
                db.set(`${msg.author.id}.clanname`, '');
                db.set(`${msg.author.id}.position`, '');
            }
            else if (args[0].toLowerCase().includes('s')) {
                if (db.get(`${msg.author.id}.clanname`) === 'None') {
                    msg.reply('You are not in a clan!');
                    return;
                }
                var clanID = megaList.indexOf([msg.author.id, msg.author.username, db.get(`${msg.author.id}.glory`)]);
                msg.channel.send(megaList);
                if (megaList.length >= 8) {
                    if (clanID < 4) {
                        var pC = megaList.slice(0, 8);
                    }
                    else if (clanID >= 4 && clanID <= megaList.length - 4) {
                        var pC = megaList.slice(clanID - 4, clanID + 4);
                    }
                    else {
                        var pC = megaList.slice(megaList.length - 8);
                    }
                    const baseID = megaList.indexOf(pC[0]);
                    const sEmbedFull = new Discord.RichEmbed()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                        .setThumbnail(msg.author.avatarURL)
                        .setDescription('See where you rank!')
                        .addField(`#${baseID}: ${pC[0][1]}`, `${pC[0][2]} glory points!`, false)
                        .addField(`#${baseID + 1}: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                        .addField(`#${baseID + 2}: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                        .addField(`#${baseID + 3}: ${pC[3][1]}`, `${pC[3][2]} glory points!`, false)
                        .addField(`#${baseID + 4}: ${pC[4][1]}`, `${pC[4][2]} glory points!`, false)
                        .addField(`#${baseID + 5}: ${pC[5][1]}`, `${pC[5][2]} glory points!`, false)
                        .addField(`#${baseID + 6}: ${pC[6][1]}`, `${pC[6][2]} glory points!`, false)
                        .addField(`#${baseID + 7}: ${pC[7][1]}`, `${pC[7][2]} glory points!`, false)
                        .setFooter('Leaderboards', msg.author.avatarURL)
                        .setAuthor('BattleBot', Bot.user.avatarURL);
                    msg.channel.send(sEmbedFull);
                }
                else {
                    var pC = megaList;
                    switch (pC.length) {
                        case 7:
                            const sEmbed7 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top 7 people in your clan!')
                                .addField(`**#1:** ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                                .addField(`#3: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                                .addField(`#4: ${pC[3][1]}`, `${pC[3][2]} glory points!`, false)
                                .addField(`#5: ${pC[4][1]}`, `${pC[4][2]} glory points!`, false)
                                .addField(`#6: ${pC[5][1]}`, `${pC[5][2]} glory points!`, false)
                                .addField(`#7: ${pC[6][1]}`, `${pC[6][2]} glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed7);
                            break;
                        case 6:
                            const sEmbed6 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top 6 people in your clan!')
                                .addField(`**#1:** ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                                .addField(`#3: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                                .addField(`#4: ${pC[3][1]}`, `${pC[3][2]} glory points!`, false)
                                .addField(`#5: ${pC[4][1]}`, `${pC[4][2]} glory points!`, false)
                                .addField(`#6: ${pC[5][1]}`, `${pC[5][2]} glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed6);
                            break;
                        case 5:
                            const sEmbed5 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top 5 people in your clan!')
                                .addField(`**#1**: ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                                .addField(`#3: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                                .addField(`#4: ${pC[3][1]}`, `${pC[3][2]} glory points!`, false)
                                .addField(`#5: ${pC[4][1]}`, `${pC[4][2]} glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed5);
                            break;
                        case 4:
                            const sEmbed4 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top 4 people in your clan!')
                                .addField(`**#1:** ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                                .addField(`#3: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                                .addField(`#4: ${pC[3][1]}`, `${pC[3][2]} glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed4);
                            break;
                        case 3:
                            const sEmbed3 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top 3 people in your clan!')
                                .addField(`**#1:** ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                                .addField(`#3: ${pC[2][1]}`, `${pC[2][2]} glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed3);
                            break;
                        case 2:
                            const sEmbed2 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top 2 people in your clan!')
                                .addField(`**#1:** ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .addField(`#2: ${pC[1][1]}`, `${pC[1][2]} glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed2);
                            break;
                        case 1:
                            const sEmbed1 = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription('See the top person in your clan! (Hail Ashwin IV)')
                                .addField(`**#1:** ${pC[0][1]}`, `**${pC[0][2]}** glory points!`, false)
                                .setFooter('Leaderboards', msg.author.avatarURL)
                                .setAuthor('BattleBot', Bot.user.avatarURL);
                            msg.channel.send(sEmbed1);
                            break;
                    }
                }
                msg.reply(`You are in the clan \`${db.get(`${msg.author.id}.clanname`)}\` and you are a \`${db.get(`${msg.author.id}.position`)}\`!`);
                return;
            }
            else if (args[0].toLowerCase().includes('p')) {
                msg.reply('notaddedyet!');
                return;
            }
            else if (args[0].toLowerCase().includes('i')) {
                if (args.length < 2) {
                    msg.reply('Proper usage: `!clan i <user> OPTIONAL: <position>`');
                    return;
                }
                if (db.get(`${msg.author.id}.clanname`) == 'None') {
                    msg.reply('You are not a clan, so you cannot invite someone!');
                    return;
                }
                let mentionedUser = msg.mentions.users.first();
                msg.channel.send(`Sent invitation to ${mentionedUser}!`);
                mentionedUser.send(`Hello! The user ${msg.author.username} has invited you to join their clan, ${db.get(`${msg.author.id}.clanname`)}! If you would like to join, simply go on the server and type !clan j ${db.get(`${msg.author.id}.clanname`)}`);
            }
            else {
                msg.reply('Proper usage: `!clan <make/join/leave> <clanname>`');
                msg.reply(Clan.all());
                return;
            }
        });
    }
}
exports.default = clan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQThCO0FBQzlCLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFaEMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBd1d0QyxDQUFDO0lBdFdHLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxTQUFTLEdBQUcsQ0FBQyxDQUFzQixFQUFFLENBQXNCO2dCQUN2RCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2YsT0FBTyxDQUFDLENBQUM7aUJBQ1o7cUJBQ0k7b0JBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDO1lBRUQsSUFBSSxRQUFRLEdBQWEsRUFBRSxDQUFBO1lBQ25CLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENB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LENBQUM7aUNBQ2xDLGNBQWMsQ0FBQyxvQ0FBb0MsQ0FBQztpQ0FDcEQsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFDLEtBQUssQ0FBQztpQ0FDckUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFDLEtBQUssQ0FBQztpQ0FDN0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFDLEtBQUssQ0FBQztpQ0FDN0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFDLEtBQUssQ0FBQztpQ0FDN0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFDLEtBQUssQ0FBQztpQ0FDN0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFDLEtBQUssQ0FBQztpQ0FDN0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFD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