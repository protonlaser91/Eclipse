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
            msg.delete(0).catch(console.error);
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
            var attackDeployA = 0;
            var attackDeployV = 0;
            if (args[2].toLowerCase().includes('thanos')) {
                attackDeployT += parseInt(args[1]);
            }
            else if (args[2].toLowerCase().includes('sai')) {
                attackDeployS += parseInt(args[1]);
            }
            else if (args[2].toLowerCase().includes('anu')) {
                attackDeployA += parseInt(args[1]);
            }
            else if (args[2].toLowerCase().includes('var')) {
                attackDeployV += parseInt(args[1]);
            }
            else {
                msg.reply(`I could not find troop ${args[2]}`);
                return;
            }
            for (var e = 4; e < 8; e += 2) {
                if (args[e] !== undefined) {
                    if (args[e].toLowerCase().includes('thanos')) {
                        attackDeployT += parseInt(args[e - 1]);
                    }
                    else if (args[e].toLowerCase().includes('sai')) {
                        attackDeployS += parseInt(args[e - 1]);
                    }
                    else if (args[e].toLowerCase().includes('anu')) {
                        attackDeployA += parseInt(args[e - 1]);
                    }
                    else if (args[e].toLowerCase().includes('var')) {
                        attackDeployV += parseInt(args[e - 1]);
                    }
                    else {
                        msg.reply(`I could not find troop ${args[e]}`);
                        return;
                    }
                }
            }
            msg.channel.send(`T: ${attackDeployT}, S: ${attackDeployS}, A: ${attackDeployA}, V: ${attackDeployV}`);
            if (attackDeployT < 0 || attackDeployS < 0) {
                msg.reply('Nice try!');
                return;
            }
            const attackTotalT = db.get(`${msg.author.id}.tAmt`);
            const attackTotalS = db.get(`${msg.author.id}.sAmt`);
            const attackTotalA = db.get(`${msg.author.id}.aAmt`);
            const attackTotalV = db.get(`${msg.author.id}.vAmt`);
            let john = false;
            function zCheck(attackerDeploy, attackerTotal, troopName) {
                if (attackerDeploy > attackerTotal) {
                    msg.reply(`You don't have enough ${troopName} to launch this attack!`);
                    john = true;
                }
            }
            zCheck(attackDeployT, attackTotalT, 'Thanosid\'s');
            zCheck(attackDeployS, attackTotalS, 'saimonGay\'s');
            zCheck(attackDeployA, attackTotalA, 'anumonGamer\'s');
            zCheck(attackDeployV, attackTotalV, 'FaZe Varun\'s');
            if (john) {
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
            var defenderA = db.get(`${mentionedUser.id}.aAmt`);
            var defenderV = db.get(`${mentionedUser.id}.vAmt`);
            var attackerMoney = db.get(`${msg.author.id}.money`);
            var defenderMoney = db.get(`${mentionedUser.id}.money`);
            var attackerGlory = db.get(`${msg.author.id}.glory`);
            var defenderGlory = db.get(`${mentionedUser.id}.glory`);
            let tooMuchWork = new Discord.RichEmbed()
                .setColor([12, 12, 12])
                .setDescription(`Yer Troops Sonny-boy`)
                .setThumbnail(mentionedUser.avatarURL)
                .setAuthor(`${msg.author.username}'s Spy Report`, msg.author.avatarURL)
                .addField('Yer Thanosid', attackDeployT, true)
                .addField('Yer saimonGay', attackDeployS, true)
                .addField('Yer anumonGamers', attackDeployA, true)
                .addField('Yer FaZe Varun', attackDeployV, true)
                .addBlankField()
                .addField('Yer enemy Thanosid', defenderT, true)
                .addField('Yer enemy saimonGay', defenderS, true)
                .addField('Yer enemy anumonGamers', defenderA, true)
                .addField('Yer enemy FaZe Varun', defenderV, true)
                .setFooter(`Ailunian IV`)
                .setTimestamp(new Date());
            msg.channel.send(tooMuchWork);
            return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFaEQsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFBO0lBK1l2QyxDQUFDO0lBN1lHLElBQUk7UUFDQSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQyxJQUFJLGFBQWEsS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFDO2dCQUM3QixHQUFHLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ3hDLE9BQU87YUFDVjtZQUdELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxF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