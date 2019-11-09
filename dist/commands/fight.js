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
            function roundIf(n, round = 0.3) {
                return n - Math.floor(n) <= round ? Math.floor(n) : Math.ceil(n);
            }
            function logb(b, n) {
                return Math.log(n) / Math.log(b);
            }
            msg.delete(0).catch(console.error);
            let mentionedUser = msg.mentions.users.first();
            if (mentionedUser === msg.author) {
                msg.reply(`You can't attack yourself!`);
                return;
            }
            if (args.length < 2 || !mentionedUser) {
                msg.reply("Proper Usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it will be defaulted as 5 hours #TIME NOT ADDED YET");
                return;
            }
            const attackTotalT = db.get(`${msg.author.id}.tAmt`);
            const attackTotalS = db.get(`${msg.author.id}.sAmt`);
            const attackTotalA = db.get(`${msg.author.id}.aAmt`);
            const attackTotalV = db.get(`${msg.author.id}.vAmt`);
            var attackDeployT = 0;
            var attackDeployS = 0;
            var attackDeployA = 0;
            var attackDeployV = 0;
            var allvar = false;
            if (args[1].toLowerCase().includes('al')) {
                allvar = true;
                attackDeployT = attackTotalT;
                attackDeployS = attackTotalS;
                attackDeployA = attackTotalA;
                attackDeployV = attackTotalV;
                msg.channel.send('You are sending ALL of your troops!');
            }
            else if (isNaN(Number(args[1]))) {
                msg.channel.send("Please insert a number/all for the amount of troops you wish to send!");
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
            if (!allvar) {
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
                for (var e = 4; e < 10; e += 2) {
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
            }
            msg.channel.send(`T: ${attackDeployT}, S: ${attackDeployS}, A: ${attackDeployA}, V: ${attackDeployV}`);
            if (attackDeployT < 0 || attackDeployS < 0) {
                msg.reply('Nice try!');
                return;
            }
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
            db.add(`${msg.author.id}.aAmt`, -attackDeployA);
            db.add(`${msg.author.id}.vAmt`, -attackDeployV);
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
            function elevate(aTroopn, dTroopn, l) {
                let aGlory = db.get(`${msg.author.id}.glory`);
                let dGlory = db.get(`${mentionedUser.id}.glory`);
                aTroopn /= (1 + (dGlory / 1000));
                dTroopn /= (1 + (aGlory / 1000));
                if (aTroopn > dTroopn) {
                    aTroopn -= dTroopn;
                    aTroopn = roundIf(aTroopn * (1 + dGlory / 1000));
                    dTroopn = 0;
                }
                else if (aTroopn < dTroopn) {
                    dTroopn -= aTroopn;
                    dTroopn = roundIf(dTroopn * (1 + (aGlory / 1000)));
                    aTroopn = 0;
                }
                else {
                    dTroopn = 0;
                    aTroopn = 0;
                }
                return [aTroopn, dTroopn];
            }
            function gcalc(tloss1, tloss2, sloss1, sloss2, aloss1, aloss2, floss1, floss2, g1, g2, attW) {
                let totalPoints = Math.ceil((g1 + g2) / 10);
                totalPoints *= g1 > g2 ? Math.ceil((g1 + g2) / (1 + g1)) : Math.ceil((g1 + g2) / (1 + g2));
                let tfactor1 = 1 + (0.95 * aloss1 + 0.3 * floss1 + 0.8 * tloss1 + 0.15 * sloss1) / 1000;
                let tfactor2 = 1 + (0.95 * aloss2 + 0.3 * floss2 + 0.8 * tloss2 + 0.15 * sloss2) / 1000;
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
            function fight(lstA, lstD) {
                var [attackDeployV, attackDeployA, attackDeployS, attackDeployT] = lstA;
                var [defenderV, defenderA, defenderS, defenderT] = lstD;
                var [attackDeployA, defenderA] = elevate(attackDeployA, defenderA, 'a');
                console.log(defenderA);
                console.log(attackDeployA);
                var attackTDeath = [0];
                var defendTDeath = [0];
                var anumonD;
                defenderA > 0 ? anumonD = true : anumonD = false;
                if (anumonD) {
                    if (defenderV > 0.3) {
                        defenderV *= Math.pow((3 / 5), attackDeployT);
                        msg.channel.send('A');
                        attackTDeath.push(Math.ceil(logb(3 / 5, 0.3 / defenderV)));
                    }
                    if (defenderA > 0.3) {
                        defenderA *= Math.pow((3 / 5), attackDeployT);
                        msg.channel.send('B');
                        attackTDeath.push(Math.ceil(logb(3 / 5, 0.3 / defenderA)));
                    }
                    if (defenderS > 0.3) {
                        defenderS *= Math.pow((3 / 5), attackDeployT);
                        msg.channel.send('C');
                        attackTDeath.push(Math.ceil(logb(3 / 5, 0.3 / defenderS)));
                    }
                }
                else {
                    if (defenderV > 0.3) {
                        defenderV *= Math.pow((2 / 5), attackDeployT);
                        msg.channel.send('D');
                        attackTDeath.push(Math.ceil(logb(2 / 5, 0.3 / defenderV)));
                    }
                    if (defenderA > 0.3) {
                        defenderA *= Math.pow((2 / 5), attackDeployT);
                        msg.channel.send('E');
                        attackTDeath.push(Math.ceil(logb(2 / 5, 0.3 / defenderA)));
                    }
                    if (defenderS > 0.3) {
                        defenderS *= Math.pow((2 / 5), attackDeployT);
                        msg.channel.send('F');
                        attackTDeath.push(Math.ceil(logb(2 / 5, 0.3 / defenderS)));
                    }
                }
                if (attackDeployV > 0.3) {
                    attackDeployV *= Math.pow((1 / 2), defenderT);
                    msg.channel.send('G');
                    defendTDeath.push(Math.ceil(logb(1 / 2, 0.3 / attackDeployV)));
                }
                if (attackDeployA > 0.3) {
                    attackDeployA *= Math.pow((1 / 2), defenderT);
                    msg.channel.send('H');
                    defendTDeath.push(Math.ceil(logb(1 / 2, 0.3 / attackDeployA)));
                }
                if (attackDeployS > 0.3) {
                    attackDeployS *= Math.pow((1 / 2), defenderT);
                    msg.channel.send('I');
                    defendTDeath.push(Math.ceil(logb(1 / 2, 0.3 / attackDeployS)));
                }
                console.log(attackTDeath);
                console.log(defendTDeath);
                var maxThanosA = Math.max(...attackTDeath);
                if (maxThanosA > attackDeployT) {
                    attackDeployT = 0;
                }
                else {
                    attackDeployT -= maxThanosA;
                }
                var maxThanosD = Math.max(...defendTDeath);
                if (maxThanosD > defenderT) {
                    defenderT = 0;
                }
                else {
                    defenderT -= maxThanosD;
                }
                var [attackDeployT, defenderT] = elevate(attackDeployT, defenderT, 't');
                var [attackDeployS, defenderS] = elevate(attackDeployS, defenderS, 's');
                var [attackDeployV, defenderV] = elevate(attackDeployV, defenderV, 'v');
                defenderV = roundIf(defenderV);
                defenderA = roundIf(defenderA);
                defenderS = roundIf(defenderS);
                defenderT = roundIf(defenderT);
                attackDeployV = roundIf(attackDeployV);
                attackDeployA = roundIf(attackDeployA);
                attackDeployS = roundIf(attackDeployS);
                attackDeployT = roundIf(attackDeployT);
                msg.channel.send(`defendFFV: ${defenderV}, S: ${defenderS}, T: ${defenderT}, A: ${defenderA}`);
                msg.channel.send(`attackFFV: ${attackDeployV}, S: ${attackDeployS}, T: ${attackDeployT}, A: ${attackDeployA}`);
            }
            fight([attackDeployV, attackDeployA, attackDeployS, attackDeployT], [defenderV, defenderA, defenderS, defenderT]);
        });
    }
}
exports.default = fight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFaEQsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFBO0lBNlp2QyxDQUFDO0lBM1pHLElBQUk7UUFDQSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxTQUFTLE9BQU8sQ0FBQyxDQUFTLEVBQUUsUUFBZ0IsR0FBRztnQkFDM0MsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEUsQ0FBQztZQUVELFNBQVMsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQyxDQUFDO1lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUss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O2dCQUMxQyxXQUFXLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUMsTUFBTSxHQUFHLElBQUksR0FBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUM7Z0JBQzlFLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUMsTUFBTSxHQUFHLElBQUksR0FBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUM7Z0JBRTlFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDMUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUEsQ0FBQyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUUxRSxJQUFJLFdBQVcsR0FBRyxFQUFFLEVBQUM7b0JBQ2pCLEVBQUUs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