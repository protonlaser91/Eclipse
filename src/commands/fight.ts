import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";
import { isNull } from "util";
const cooldowns: any = new Discord.Collection();

export default class fight implements IBotCommand {

    private readonly _command = "fight"

    name(): string {
        return "fight";
    }   
    
    help(): string {
        return "fight";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    cooldown(): number {
        return 2;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        msg.channel.send('FIGHT FUNCTION BEING REMODELED!'); //remodel
        msg.delete(0);
        let mentionedUser = msg.mentions.users.first();
        if (mentionedUser === msg.author){
            msg.reply(`You can't attack yourself!`);
            return;
        }
        
        //!attack @ShishirB 1000 Thanosid //time in milliseconds for 5 hour attack (default) -208.333 x^3 + 2885.71 x^2 - 13356. x + 20710
        if (args.length < 3 || !mentionedUser || isNaN(Number(args[1]))){
            msg.reply("Proper usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it will be defaulted as 5 hours #TIME NOT ADDED YET");
            return;
        }

        if (args[3] !== undefined){
            if (isNaN(Number(args[3]))){
                msg.reply("Proper usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it shall be defaulted as 5 hours #TIME NOT ADDED YET");
                return;
            }

        }
        else {
            args.push(`0`);
        }

        let time: number;
        if (args[5] !== undefined){
            if (isNaN(Number(args[5]))){
                time = 5;
                var rubyAmt = 31;
            }
            else {
                time = parseInt(args[5])
                if (time >= 1 && time < 5){
                    var rubyAmt = -208.333*time**3 + 2885.71*time**2 - 13356*time + 20710;
                }
                else if (time < 1){
                    var rubyAmt = -1.08356*time*10^6 *(Math.log(0.990814*time));
                }
            }
        
        }
        var attackDeployT = 0;
        var attackDeployS = 0;
        var attackDeployA = 0;
        var attackDeployV = 0;
        if (args[2].toLowerCase().includes('thanos')){
            attackDeployT += parseInt(args[1])

        } else if (args[2].toLowerCase().includes('sai')){
            attackDeployS += parseInt(args[1])

        } else {
            msg.reply(`I could not find troop ${args[2]}`);
            return;
        }
        function addTroop(troopName: String){

        }
        if (args[4] !== undefined){
            if (args[4].toLowerCase().includes('thanos')){
                attackDeployT += parseInt(args[3])
            } else if (args[4].toLowerCase().includes('sai')){
                attackDeployS += parseInt(args[3])
            } else {
                msg.reply(`I could not find troop ${args[4]}`);
                return;
            }
        } 

        if (attackDeployT < 0 || attackDeployS < 0 ){
            msg.reply('Nice try!')
            return;
        }
        
        const attackTotalT = db.get(`${msg.author.id}.tAmt`)
        const attackTotalS = db.get(`${msg.author.id}.sAmt`) 

        if (attackDeployT > attackTotalT){
            msg.reply("You don't have enough Thanosid to launch this attack!");
            return;
        } else if (attackDeployS > attackTotalS){
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
             const expirationTime: number = timestamps.get(msg.author.id) + cooldownAmount;
         
             if (now < expirationTime) {
                 const timeLeft = (expirationTime - now) / 1000;
                 if (timeLeft > 3600){
                     msg.author.send(`You have already attacked this user in the past 24 hours! Please wait ${Math.round(timeLeft/3600)} more hour(s) before attempting another attack!`);
                     return;
                 } else if (timeLeft > 60 && timeLeft < 3600){
                     msg.author.send(`You have already attacked this user in the past 24 hours! Please wait ${Math.round(timeLeft/60)} more minute(s) before attempting another attack!`);
                     return;
                 } else {
                 msg.author.send(`You have already attacked this user in the past 24 hours! Please wait ${Math.round(timeLeft)} more second(s) before attempting another attack!`);
                 return;
             }
         }
         }
         timestamps.set(msg.author.id, now);
         setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

        db.add(`${msg.author.id}.tAmt`,-attackDeployT); //subtract attackDeployers
        db.add(`${msg.author.id}.sAmt`,-attackDeployS);

       /*  var bal1 = db.get(`${msg.author.id}.money`)
        var bal2 = db.get(`${mentionedUser.id}.money`)
        */
        var defenderT = db.get(`${mentionedUser.id}.tAmt`);
        var defenderS = db.get(`${mentionedUser.id}.sAmt`);
        var attackerMoney = db.get(`${msg.author.id}.money`);
        var defenderMoney = db.get(`${mentionedUser.id}.money`);
        var attackerGlory = db.get(`${msg.author.id}.glory`);
        var defenderGlory = db.get(`${mentionedUser.id}.glory`);
        msg.channel.send(`Attacker's Items[0]: ${attackDeployT} Thanosid and ${attackDeployS} saimonGays\nDefender's Items: ${defenderT} Thanosid and ${defenderS} saimonGays`);
         //remodel BELOW, saimonGay FP = 2, FFV FP = 30, anu = 1
        function elevate(aTroopn: number,dTroopn: number,l: string){
           let aGlory = db.get(`${msg.author.id}.glory`)
           let dGlory = db.get(`${mentionedUser.id}.glory`)
           aTroopn /= (1 + (dGlory/1000)); 
           dTroopn /= (1 + (aGlory/1000));
           if (aTroopn > dTroopn){
               //attacker wins this minibattle
               aTroopn -= dTroopn;
               aTroopn = Math.ceil(aTroopn * (1 + dGlory/1000))
               db.add(`${mentionedUser.id}.${l}Amt`,-db.get(`${mentionedUser.id}.${l}Amt`));
           } else if (aTroopn < dTroopn){
               //defender wins!
               dTroopn -= aTroopn
               dTroopn = Math.ceil(dTroopn*(1 + (aGlory/1000)))
               db.add(`${mentionedUser.id}.${l}Amt`,-db.get(`${mentionedUser.id}.${l}Amt`)+dTroopn);
               aTroopn = 0;
           } else {
               //tie
               db.add(`${mentionedUser.id}.${l}Amt`,-db.get(`${mentionedUser.id}.${l}Amt`));
               aTroopn = 0;
           }
           return aTroopn;
        }   
        //separate thanosid and saimonGay make weighted glory balance! DONE
        function gcalc(tloss1: number,tloss2: number, sloss1: number,sloss2: number, g1: number,g2: number, attW: boolean){
            let totalPoints = Math.ceil((g1 + g2)/10);
            totalPoints *= g1 > g2 ? Math.ceil((g1+g2)/(1+g1)) : Math.ceil((g1+g2)/(1+g2));
            let tfactor1 = 1 + (tloss1 + 0.2*sloss1)/1000;
            let tfactor2 = 1 + (tloss2 + 0.2*sloss2)/1000;

            var h1 = g1 > g2 ? g1/(1+g1+g2) * totalPoints: g2/(1+g1+g2) * totalPoints; //48
            var l1 = g1 > g2 ? g2/(1+g1+g2) * totalPoints: g1/(1+g1+g2) * totalPoints; //59

            if (totalPoints < 50){
                h1 = 50;
                l1 = 30;
            }

            if (totalPoints > 600){
                h1 /= 1.5;
                l1 /= 1.5;
            }
            if (attW){
                if (g1 > g2){
                    db.add(`${msg.author.id}.glory`,Math.ceil(l1*tfactor1));
                    db.add(`${mentionedUser.id}.glory`,-Math.floor(l1/tfactor2));
                } else { //if g2 > g1
                db.add(`${msg.author.id}.glory`,Math.ceil(h1*tfactor1));
                db.add(`${mentionedUser.id}.glory`,-Math.floor(h1/tfactor2));
            } 
        } else { //if defender WON
            if (g1 > g2){
                db.add(`${msg.author.id}.glory`,-Math.floor(h1/tfactor1));
                db.add(`${mentionedUser.id}.glory`,Math.ceil(h1*tfactor2));
            } else { //if g2 > g1
                db.add(`${msg.author.id}.glory`,-Math.floor(l1/tfactor1));
                db.add(`${mentionedUser.id}.glory`,Math.ceil(l1*tfactor2));
            }
        }
        return [(db.get(`${msg.author.id}.glory`) - g1),(db.get(`${mentionedUser.id}.glory`) - g2)]
        }
        console.log("seriously??");

        function fight(t1: number,s1: number,t2: number,s2: number){
           let battleStat = "";
           let tn = Math.abs(t1-t2);
           let sn = Math.abs(s1-s2);
           //t1 = elevate(tCho,tn2,'t');
          // s1 = elevate(sCho,sn2,'s');
//jjj       
           let tU2 = db.get(`${mentionedUser.id}.tAmt`);
           let sU2 = db.get(`${mentionedUser.id}.sAmt`);
           msg.channel.send(`Attacker's Items [1]: ${t1} Thanosid and ${s1} saimonGays\nDefender's Items: ${tU2} Thanosid and ${sU2} saimonGays`);
            var a: number = 0;
            var b: boolean = true;
            var gloryA = 0;
            var gloryD = 0;
           if (s1/(2**tU2) >= 1){
               console.log('A');
               s1 = Math.ceil(s1/(2**tU2));
               db.add(`${mentionedUser.id}.tAmt`,-tU2);
               //attacker won!
               b = true;
               a = s1 * 3 + t1 * 75;
               db.add(`${mentionedUser.id}.money`,-a);
               db.add(`${msg.author.id}.money`,a);
           }
           else if (s1/(2**tU2) < 1 && s1/(2**tU2) > 0){
                    console.log('B');
                   var exp1 = Math.ceil(Math.log2(s1));
                if (exp1 === -Infinity){
                    exp1 = 0;
                }
               db.add(`${mentionedUser.id}.tAmt`,-exp1);
               s1 = 0;
               //defender won!
               b = false;
               a = 0
           }

           //swap s1 = 50
           if (sU2/(2**t1) >= 1){
               console.log('C')
               db.add(`${mentionedUser.id}.sAmt`,Math.ceil(sU2/(2**t1))-sU2);
               t1 = 0;
            //defender won! HHHELLLPPPPPP!!!
            b = false;
            a = 0;
           } 
           else if (sU2/(2**t1) < 1 && sU2/(2**t1) > 0){
               console.log('D');
               var exp2 = Math.ceil(Math.log2(sU2));
               if (exp2 === -Infinity){
                   exp2 = 0;
               }
               t1 -= exp2;
               db.add(`${mentionedUser.id}.sAmt`,-sU2);
               //attacker won!
               b = true;
               a = sU2 * 3 + tU2 * 75;
               db.add(`${mentionedUser.id}.money`,a);
               db.add(`${msg.author.id}.money`,-a);
           }

           if (db.get(`${msg.author.id}.money`) < 0){
                db.add(`${msg.author.id}.money`,-db.get(`${msg.author.id}.money`))
           } else if (db.get(`${mentionedUser.id}.money`) < 0){
                db.add(`${mentionedUser.id}.money`,-db.get(`${mentionedUser.id}.money`))
           }
        
           if (b){
               var resultA = 'Victory! Your forces were able to overpower the defending army!';
               var resultD = 'Defeat! The attacking army was too powerful...';
           } else {
               var resultA = 'Defeat! The defense was too stubborn...';
               var resultD = 'Victory! Your forces held off the attacking army successfully!';
           }
        /* [gloryA, gloryD] = gcalc(tCho-t1,(tn2 - db.get(`${mentionedUser.id}.tAmt`)),sCho-s1,(sn2 - db.get(`${mentionedUser.id}.sAmt`)),db.get(`${msg.author.id}.glory`),db.get(`${mentionedUser.id}.glory`),b)
           const attEmbed = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${msg.author.username}'s Battle Report`,msg.author.avatarURL)
                                .setThumbnail(mentionedUser.avatarURL)
                                .setDescription(`This battle report will state the casualties, loot, and glory received from this battle. Battle Result: ||${resultA}||`)
                                .addField('Your Troops:',`${tCho} Thanosid and ${sCho} saimonGays`,true)
                                .addField('Defending Troops:',`${tn2} Thanosid and ${sn2} saimonGays`,true)
                                .addField('Thanosid Casualties',`-${tCho - t1}`,true)
                                .addField('saimonGay Casualties',`-${sCho - s1}`,true)
                                .addField('Loot',`${a} rubies!`,true)
                                .addField('Glory',`${gloryA} points!`,true)
                                .setTimestamp(new Date())
                                .setFooter('Battle Report Statistics',`https://i.imgur.com/XYzs8sl.png`)
                                .setAuthor('BattleBot',Bot.user.avatarURL);
            
           const defEmbed = new Discord.RichEmbed()
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setAuthor(`${mentionedUser.username}'s Battle Report`,mentionedUser.avatarURL)
                                .setThumbnail(msg.author.avatarURL)
                                .setDescription(`You've been attacked! This battle report will state the casualties, loot, and glory received from this battle. Battle Result: ||${resultD}||`)
                                .addField('Your Troops:',`${tn2} Thanosid and ${sn2} saimonGays`,true)
                                .addField('Attacking Troops:',`${tCho} Thanosid and ${sCho} saimonGays`,true)
                                .addField('Thanosid Casualties',`-${tn2 - db.get(`${mentionedUser.id}.tAmt`)}`,true)
                                .addField('saimonGay Casualties',`-${sn2 - db.get(`${mentionedUser.id}.sAmt`)}`,true)
                                .addField('Loot',`-${a} rubies!`,true)
                                .addField('Glory',`${gloryD} points!`,true)
                                .setTimestamp(new Date())
                                .setFooter('Battle Report Statistics',`https://i.imgur.com/XYzs8sl.png`)
                                .setAuthor('BattleBot',Bot.user.avatarURL);
           msg.channel.send(`Attacker's Items[2]: ${t1} Thanosid and ${s1} saimonGays\nDefender's Items: ${db.get(`${mentionedUser.id}.tAmt`)} Thanosid and ${db.get(`${mentionedUser.id}.sAmt`)} saimonGays`);
           msg.author.send(attEmbed);
           mentionedUser.send(defEmbed);
           if (db.get(`${msg.author.id}.glory`) < 0){
            db.add(`${msg.author.id}.glory`,-db.get(`${msg.author.id}.glory`));
           }
            else if (db.get(`${mentionedUser.id}.glory`) < 0) {
                db.add(`${mentionedUser.id}.glory`,-db.get(`${mentionedUser.id}.glory`));
            }
           
           db.add(`${msg.author.id}.tAmt`,t1);
           db.add(`${msg.author.id}.sAmt`,s1);
        }
         const warnEmbed = new Discord.RichEmbed()
                            .setAuthor(`${mentionedUser.username}'s Scout Report`,mentionedUser.avatarURL)
                            .setColor(Math.floor(Math.random() * 16777214)+1)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('You are being attacked! The attacking army is projected to be here in 5 minutes! Your scouts have prepared a report for you of the incoming army.')
                            .addField('Attacking Thanosid',`${Math.round(tCho * (0.5 + Math.random()))}`,true)
                            .addField('Attacking saimonG',`${Math.round(sCho * (0.5 + Math.random()))}`,true)
                            .setTimestamp(new Date())
                            .setFooter('Scout Report',Bot.user.avatarURL);
        
        function sendWarning(){
            mentionedUser.send(warnEmbed);
        }
        time = 30000;
         setTimeout(sendWarning,time-10000);
         setTimeout(fight,time,tCho,sCho,tn2,sn2);   
        */
        }
    }
}
