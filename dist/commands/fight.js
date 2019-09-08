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
const cooldowns = new Discord.Collection();
class fight {
    constructor() {
        this._command = "fight";
    }
    name() {
        return "fight";
    }
    help() {
        return "fight";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    cooldown() {
        return 2;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            msg.delete(0);
            let mentionedUser = msg.mentions.users.first();
            if (mentionedUser === msg.author) {
                msg.reply(`You can't attack yourself!`);
                return;
            }
            if (args.length < 3 || !mentionedUser || isNaN(Number(args[1]))) {
                msg.reply("Proper usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it will be defaulted as 5 hours #TIME NOT ADDED YET");
                return;
            }
            if (args[3] !== undefined) {
                if (isNaN(Number(args[3]))) {
                    msg.reply("Proper usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it shall be defaulted as 5 hours #TIME NOT ADDED YET");
                    return;
                }
            }
            else {
                args.push(`0`);
            }
            let time;
            if (args[5] !== undefined) {
                if (isNaN(Number(args[5]))) {
                    time = 5;
                    var rubyAmt = 31;
                }
                else {
                    time = parseInt(args[5]);
                    if (time >= 1 && time < 5) {
                        var rubyAmt = -208.333 * Math.pow(time, 3) + 2885.71 * Math.pow(time, 2) - 13356 * time + 20710;
                    }
                    else if (time < 1) {
                        var rubyAmt = -1.08356 * time * 10 ^ 6 * (Math.log(0.990814 * time));
                    }
                }
            }
            var tCho = 0;
            var sCho = 0;
            if (args[2].toLowerCase().includes('thanos')) {
                tCho += parseInt(args[1]);
            }
            else if (args[2].toLowerCase().includes('sai')) {
                sCho += parseInt(args[1]);
            }
            else {
                msg.reply(`I could not find troop ${args[2]}`);
                return;
            }
            if (args[4] !== undefined) {
                if (args[4].toLowerCase().includes('thanos')) {
                    tCho += parseInt(args[3]);
                }
                else if (args[4].toLowerCase().includes('sai')) {
                    sCho += parseInt(args[3]);
                }
                else {
                    msg.reply(`I could not find troop ${args[4]}`);
                    return;
                }
            }
            if (tCho < 0 || sCho < 0) {
                msg.reply('Nice try!');
                return;
            }
            const tn1 = db.get(`${msg.author.id}.tAmt`);
            const sn1 = db.get(`${msg.author.id}.sAmt`);
            if (tCho > tn1) {
                msg.reply("You don't have enough Thanosid to launch this attack!");
                return;
            }
            else if (sCho > sn1) {
                msg.reply("You don't have enough saimonGays to launch this attack!");
                return;
            }
            if (!cooldowns.has(mentionedUser.id)) {
                cooldowns.set(mentionedUser.id, new Discord.Collection());
            }
            const now = Date.now();
            const timestamps = cooldowns.get(mentionedUser.id);
            const cooldownAmount = 15000;
            if (timestamps.has(msg.author.id)) {
                const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    if (timeLeft > 3600) {
                        msg.author.send(`You have already attacked this user in the past 24 hours! Please wait ${Math.round(timeLeft / 3600)} more hour(s) before attempting another attack!`);
                        return;
                    }
                    else if (timeLeft > 60 && timeLeft < 3600) {
                        msg.author.send(`You have already attacked this user in the past 24 hours! Please wait ${Math.round(timeLeft / 60)} more minute(s) before attempting another attack!`);
                        return;
                    }
                    else {
                        msg.author.send(`You have already attacked this user in the past 24 hours! Please wait ${Math.round(timeLeft)} more second(s) before attempting another attack!`);
                        return;
                    }
                }
            }
            timestamps.set(msg.author.id, now);
            setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
            db.add(`${msg.author.id}.tAmt`, -tCho);
            db.add(`${msg.author.id}.sAmt`, -sCho);
            var tn2 = db.get(`${mentionedUser.id}.tAmt`);
            var sn2 = db.get(`${mentionedUser.id}.sAmt`);
            msg.channel.send(`Attacker's Items[0]: ${tCho} Thanosid and ${sCho} saimonGays\nDefender's Items: ${tn2} Thanosid and ${sn2} saimonGays`);
            function elevate(aTroopn, dTroopn, l) {
                let aGlory = db.get(`${msg.author.id}.glory`);
                let dGlory = db.get(`${mentionedUser.id}.glory`);
                aTroopn /= (1 + (dGlory / 1000));
                dTroopn /= (1 + (aGlory / 1000));
                if (aTroopn > dTroopn) {
                    aTroopn -= dTroopn;
                    aTroopn = Math.ceil(aTroopn * (1 + dGlory / 1000));
                    db.add(`${mentionedUser.id}.${l}Amt`, -db.get(`${mentionedUser.id}.${l}Amt`));
                }
                else if (aTroopn < dTroopn) {
                    dTroopn -= aTroopn;
                    dTroopn = Math.ceil(dTroopn * (1 + (aGlory / 1000)));
                    db.add(`${mentionedUser.id}.${l}Amt`, -db.get(`${mentionedUser.id}.${l}Amt`) + dTroopn);
                    aTroopn = 0;
                }
                else {
                    db.add(`${mentionedUser.id}.${l}Amt`, -db.get(`${mentionedUser.id}.${l}Amt`));
                    aTroopn = 0;
                }
                return aTroopn;
            }
            function gcalc(tloss1, tloss2, sloss1, sloss2, g1, g2, attW) {
                let totalPoints = Math.ceil((g1 + g2) / 10);
                totalPoints *= g1 > g2 ? Math.ceil((g1 + g2) / (1 + g1)) : Math.ceil((g1 + g2) / (1 + g2));
                let tfactor1 = 1 + (tloss1 + 0.2 * sloss1) / 1000;
                let tfactor2 = 1 + (tloss2 + 0.2 * sloss2) / 1000;
                var h1 = g1 > g2 ? g1 / (1 + g1 + g2) * totalPoints : g2 / (1 + g1 + g2) * totalPoints;
                var l1 = g1 > g2 ? g2 / (1 + g1 + g2) * totalPoints : g1 / (1 + g1 + g2) * totalPoints;
                if (totalPoints < 50) {
                    h1 = 50;
                    l1 = 30;
                }
                if (totalPoints > 600) {
                    h1 /= 1.5;
                    l1 /= 1.5;
                }
                if (attW) {
                    if (g1 > g2) {
                        db.add(`${msg.author.id}.glory`, Math.ceil(l1 * tfactor1));
                        db.add(`${mentionedUser.id}.glory`, -Math.floor(l1 / tfactor2));
                    }
                    else {
                        db.add(`${msg.author.id}.glory`, Math.ceil(h1 * tfactor1));
                        db.add(`${mentionedUser.id}.glory`, -Math.floor(h1 / tfactor2));
                    }
                }
                else {
                    if (g1 > g2) {
                        db.add(`${msg.author.id}.glory`, -Math.floor(h1 / tfactor1));
                        db.add(`${mentionedUser.id}.glory`, Math.ceil(h1 * tfactor2));
                    }
                    else {
                        db.add(`${msg.author.id}.glory`, -Math.floor(l1 / tfactor1));
                        db.add(`${mentionedUser.id}.glory`, Math.ceil(l1 * tfactor2));
                    }
                }
                return [(db.get(`${msg.author.id}.glory`) - g1), (db.get(`${mentionedUser.id}.glory`) - g2)];
            }
            console.log("seriously??");
            function fight(t1, s1, t2, s2) {
                let battleStat = "";
                let tn = Math.abs(t1 - t2);
                let sn = Math.abs(s1 - s2);
                t1 = elevate(tCho, tn2, 't');
                s1 = elevate(sCho, sn2, 's');
                let tU2 = db.get(`${mentionedUser.id}.tAmt`);
                let sU2 = db.get(`${mentionedUser.id}.sAmt`);
                msg.channel.send(`Attacker's Items [1]: ${t1} Thanosid and ${s1} saimonGays\nDefender's Items: ${tU2} Thanosid and ${sU2} saimonGays`);
                var a = 0;
                var b = true;
                var gloryA = 0;
                var gloryD = 0;
                if (s1 / (Math.pow(2, tU2)) >= 1) {
                    console.log('A');
                    s1 = Math.ceil(s1 / (Math.pow(2, tU2)));
                    db.add(`${mentionedUser.id}.tAmt`, -tU2);
                    b = true;
                    a = s1 * 3 + t1 * 75;
                    db.add(`${mentionedUser.id}.money`, -a);
                    db.add(`${msg.author.id}.money`, a);
                }
                else if (s1 / (Math.pow(2, tU2)) < 1 && s1 / (Math.pow(2, tU2)) > 0) {
                    console.log('B');
                    var exp1 = Math.ceil(Math.log2(s1));
                    if (exp1 === -Infinity) {
                        exp1 = 0;
                    }
                    db.add(`${mentionedUser.id}.tAmt`, -exp1);
                    s1 = 0;
                    b = false;
                    a = 0;
                }
                if (sU2 / (Math.pow(2, t1)) >= 1) {
                    console.log('C');
                    db.add(`${mentionedUser.id}.sAmt`, Math.ceil(sU2 / (Math.pow(2, t1))) - sU2);
                    t1 = 0;
                    b = false;
                    a = 0;
                }
                else if (sU2 / (Math.pow(2, t1)) < 1 && sU2 / (Math.pow(2, t1)) > 0) {
                    console.log('D');
                    var exp2 = Math.ceil(Math.log2(sU2));
                    if (exp2 === -Infinity) {
                        exp2 = 0;
                    }
                    t1 -= exp2;
                    db.add(`${mentionedUser.id}.sAmt`, -sU2);
                    b = true;
                    a = sU2 * 3 + tU2 * 75;
                    db.add(`${mentionedUser.id}.money`, a);
                    db.add(`${msg.author.id}.money`, -a);
                }
                if (db.get(`${msg.author.id}.money`) < 0) {
                    db.add(`${msg.author.id}.money`, -db.get(`${msg.author.id}.money`));
                }
                else if (db.get(`${mentionedUser.id}.money`) < 0) {
                    db.add(`${mentionedUser.id}.money`, -db.get(`${mentionedUser.id}.money`));
                }
                if (b) {
                    var resultA = 'Victory! Your forces were able to overpower the defending army!';
                    var resultD = 'Defeat! The attacking army was too powerful...';
                }
                else {
                    var resultA = 'Defeat! The defense was too stubborn...';
                    var resultD = 'Victory! Your forces held off the attacking army successfully!';
                }
                [gloryA, gloryD] = gcalc(tCho - t1, (tn2 - db.get(`${mentionedUser.id}.tAmt`)), sCho - s1, (sn2 - db.get(`${mentionedUser.id}.sAmt`)), db.get(`${msg.author.id}.glory`), db.get(`${mentionedUser.id}.glory`), b);
                const attEmbed = new Discord.RichEmbed()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setAuthor(`${msg.author.username}'s Battle Report`, msg.author.avatarURL)
                    .setThumbnail(mentionedUser.avatarURL)
                    .setDescription(`This battle report will state the casualties, loot, and glory received from this battle. Battle Result: ||${resultA}||`)
                    .addField('Your Troops:', `${tCho} Thanosid and ${sCho} saimonGays`, true)
                    .addField('Defending Troops:', `${tn2} Thanosid and ${sn2} saimonGays`, true)
                    .addField('Thanosid Casualties', `-${tCho - t1}`, true)
                    .addField('saimonGay Casualties', `-${sCho - s1}`, true)
                    .addField('Loot', `${a} rubies!`, true)
                    .addField('Glory', `${gloryA} points!`, true)
                    .setTimestamp(new Date())
                    .setFooter('Battle Report Statistics', `https://i.imgur.com/XYzs8sl.png`)
                    .setAuthor('BattleBot', Bot.user.avatarURL);
                const defEmbed = new Discord.RichEmbed()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setAuthor(`${mentionedUser.username}'s Battle Report`, mentionedUser.avatarURL)
                    .setThumbnail(msg.author.avatarURL)
                    .setDescription(`You've been attacked! This battle report will state the casualties, loot, and glory received from this battle. Battle Result: ||${resultD}||`)
                    .addField('Your Troops:', `${tn2} Thanosid and ${sn2} saimonGays`, true)
                    .addField('Attacking Troops:', `${tCho} Thanosid and ${sCho} saimonGays`, true)
                    .addField('Thanosid Casualties', `-${tn2 - db.get(`${mentionedUser.id}.tAmt`)}`, true)
                    .addField('saimonGay Casualties', `-${sn2 - db.get(`${mentionedUser.id}.sAmt`)}`, true)
                    .addField('Loot', `-${a} rubies!`, true)
                    .addField('Glory', `${gloryD} points!`, true)
                    .setTimestamp(new Date())
                    .setFooter('Battle Report Statistics', `https://i.imgur.com/XYzs8sl.png`)
                    .setAuthor('BattleBot', Bot.user.avatarURL);
                msg.channel.send(`Attacker's Items[2]: ${t1} Thanosid and ${s1} saimonGays\nDefender's Items: ${db.get(`${mentionedUser.id}.tAmt`)} Thanosid and ${db.get(`${mentionedUser.id}.sAmt`)} saimonGays`);
                msg.author.send(attEmbed);
                mentionedUser.send(defEmbed);
                if (db.get(`${msg.author.id}.glory`) < 0) {
                    db.add(`${msg.author.id}.glory`, -db.get(`${msg.author.id}.glory`));
                }
                else if (db.get(`${mentionedUser.id}.glory`) < 0) {
                    db.add(`${mentionedUser.id}.glory`, -db.get(`${mentionedUser.id}.glory`));
                }
                db.add(`${msg.author.id}.tAmt`, t1);
                db.add(`${msg.author.id}.sAmt`, s1);
            }
            const warnEmbed = new Discord.RichEmbed()
                .setAuthor(`${mentionedUser.username}'s Scout Report`, mentionedUser.avatarURL)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setThumbnail(msg.author.avatarURL)
                .setDescription('You are being attacked! The attacking army is projected to be here in 5 minutes! Your scouts have prepared a report for you of the incoming army.')
                .addField('Attacking Thanosid', `${Math.round(tCho * (0.5 + Math.random()))}`, true)
                .addField('Attacking saimonG', `${Math.round(sCho * (0.5 + Math.random()))}`, true)
                .setTimestamp(new Date())
                .setFooter('Scout Report', Bot.user.avatarURL);
            function sendWarning() {
                mentionedUser.send(warnEmbed);
            }
            time = 30000;
            setTimeout(sendWarning, time - 10000);
            setTimeout(fight, time, tCho, sCho, tn2, sn2);
        });
    }
}
exports.default = fight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFaEQsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFBO0lBOFVuQyxDQUFDO0lBNVVELElBQUk7UUFDQSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0MsSUFBSSxhQUFhLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBQztnQkFDN0IsR0FBRyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPO2FBQ1Y7WUFHRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDNUQsR0FBRyxDQUFDLEtBQUssQ0FBQyx5TkFBeU4sQ0FBQyxDQUFDO2dCQUNyTyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLElBQUksQ0FBQyxDQUFD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