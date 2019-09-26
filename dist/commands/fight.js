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
            msg.channel.send('FIGHT FUNCTION BEING REMODELED!');
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
            var attackDeployT = 0;
            var attackDeployS = 0;
            if (args[2].toLowerCase().includes('thanos')) {
                attackDeployT += parseInt(args[1]);
            }
            else if (args[2].toLowerCase().includes('sai')) {
                attackDeployS += parseInt(args[1]);
            }
            else {
                msg.reply(`I could not find troop ${args[2]}`);
                return;
            }
            if (args[4] !== undefined) {
                if (args[4].toLowerCase().includes('thanos')) {
                    attackDeployT += parseInt(args[3]);
                }
                else if (args[4].toLowerCase().includes('sai')) {
                    attackDeployS += parseInt(args[3]);
                }
                else {
                    msg.reply(`I could not find troop ${args[4]}`);
                    return;
                }
            }
            if (attackDeployT < 0 || attackDeployS < 0) {
                msg.reply('Nice try!');
                return;
            }
            const attackTotalT = db.get(`${msg.author.id}.tAmt`);
            const attackTotalS = db.get(`${msg.author.id}.sAmt`);
            if (attackDeployT > attackTotalT) {
                msg.reply("You don't have enough Thanosid to launch this attack!");
                return;
            }
            else if (attackDeployS > attackTotalS) {
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
            db.add(`${msg.author.id}.tAmt`, -attackDeployT);
            db.add(`${msg.author.id}.sAmt`, -attackDeployS);
            var defenderT = db.get(`${mentionedUser.id}.tAmt`);
            var defenderS = db.get(`${mentionedUser.id}.sAmt`);
            msg.channel.send(`Attacker's Items[0]: ${attackDeployT} Thanosid and ${attackDeployS} saimonGays\nDefender's Items: ${defenderT} Thanosid and ${defenderS} saimonGays`);
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
            }
        });
    }
}
exports.default = fight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFaEQsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFBO0lBa1Z2QyxDQUFDO0lBaFZHLElBQUk7UUFDQSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQyxJQUFJLGFBQWEsS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFDO2dCQUM3QixHQUFHLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ3hDLE9BQU87YUFDVjtZQUdELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUM1RCxHQUFHLENBQUMsS0FBSyxDQUFDLHlOQUF5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