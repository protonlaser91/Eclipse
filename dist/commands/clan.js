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
            var noSec = false;
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
                msg.channel.send(`${db.get(`${msg.author.id}.clanname`)}`);
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
                    switch (db.get(`${mid[x]}.position`)) {
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
                            plst.push([mid[x], `Pvt. ${mun[x]}`, db.get(`${mid[x]}.glory`)]);
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
                msg.reply('Hiding a needle in a haystack, that\'s good. Hiding a needle in a stack of needles? That\'s even better!');
                args = ['s'];
            }
            if (args[0].toLowerCase().startsWith('j')) {
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
            else if (args[0].toLowerCase().startsWith('m')) {
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
            else if (args[0].toLowerCase().startsWith('l')) {
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
                    if (noSec) {
                        msg.channel.send("Well hello there, Junior! " + String(clanlist));
                    }
                    else {
                        db.set(`${secc}.position`, 'Commander');
                    }
                }
                Clan.set(`${db.get(`${msg.author.id}.clanname`)}.memberids`, mid);
                Clan.set(`${db.get(`${msg.author.id}.clanname`)}.memberuns`, mun);
                msg.reply(`Successfully removed you from clan ${db.get(`${msg.author.id}.clanname`)}`);
                db.set(`${msg.author.id}.clanname`, '');
                db.set(`${msg.author.id}.position`, '');
            }
            else if (args[0].toLowerCase().startsWith('s')) {
                if (db.get(`${msg.author.id}.clanname`) === 'None') {
                    msg.reply('You are not in a clan!');
                    return;
                }
                var clanID = megaList.indexOf([msg.author.id, msg.author.username, db.get(`${msg.author.id}.glory`)]);
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
            else if (args[0].toLowerCase().startsWith('p')) {
                msg.reply('notaddedyet!');
                return;
            }
            else if (args[0].toLowerCase().startsWith('i')) {
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
                mentionedUser.send(`Hello! The user ${msg.author.username} has invited you to join their clan, \`${db.get(`${msg.author.id}.clanname`)}\`! If you would like to join, simply go on the server and type \`!clan j ${db.get(`${msg.author.id}.clanname`)}\``);
            }
            else {
                msg.reply('Proper usage: `!clan <make/join/leave> <clanname>`');
                return;
            }
        });
    }
}
exports.default = clan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQThCO0FBQzlCLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFaEMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBNld0QyxDQUFDO0lBM1dHLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbEIsU0FBUyxHQUFHLENBQUMsQ0FBc0IsRUFBRSxDQUFzQjtnQkFDdkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNmLE9BQU8sQ0FBQyxDQUFDO2lCQUNaO3FCQUNJO29CQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsQ0FBQztZQUVELElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQTtZQUNuQixJQUFJLFFBQVEsR0FBRyxH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