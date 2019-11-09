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
        function roundIf(n: number, round: number = 0.3){
            return n - Math.floor(n) <= round ? Math.floor(n) : Math.ceil(n)
        }

        function logb(b: number, n: number){ //change of base formula
            return Math.log(n)/Math.log(b)
        }

        msg.delete(0).catch(console.error);
        let mentionedUser = msg.mentions.users.first();
        if (mentionedUser === msg.author){
            msg.reply(`You can't attack yourself!`);
            return;
        }
        
        //!attack @ShishirB 1000 Thanosid //time in milliseconds for 5 hour attack (default) -208.333 x^3 + 2885.71 x^2 - 13356. x + 20710
        if (args.length < 2 || !mentionedUser){
            msg.reply("Proper Usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it will be defaulted as 5 hours #TIME NOT ADDED YET");
            return;
        }

        const attackTotalT = db.get(`${msg.author.id}.tAmt`)
        const attackTotalS = db.get(`${msg.author.id}.sAmt`) 
        const attackTotalA = db.get(`${msg.author.id}.aAmt`)
        const attackTotalV = db.get(`${msg.author.id}.vAmt`)

        var attackDeployT = 0;
        var attackDeployS = 0;
        var attackDeployA = 0;
        var attackDeployV = 0;
        var allvar = false;
        if (args[1].toLowerCase().includes('al')){
            allvar = true;
            attackDeployT = attackTotalT;
            attackDeployS = attackTotalS;
            attackDeployA = attackTotalA;
            attackDeployV = attackTotalV;
            msg.channel.send('You are sending ALL of your troops!')
        } else if (isNaN(Number(args[1]))){
            msg.channel.send("Please insert a number/all for the amount of troops you wish to send!");
            return;
        }

        if (args[3] !== undefined){
            if (isNaN(Number(args[3]))){
                msg.reply("Proper usage: `!attack <user> <amt1> <troop1> <amt2> <troop2> <time>`. Note that `<amt2>`,`<troop2>` and `<time in hours>` are optional. If time is not entered in, it shall be defaulted as 5 hours #TIME NOT ADDED YET");
                return;
            }

        }
        //else {
          //  args.push(`0`);
        //}

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
        if (!allvar){
        if (args[2].toLowerCase().includes('thanos')){
            attackDeployT += parseInt(args[1])

        } else if (args[2].toLowerCase().includes('sai')){
            attackDeployS += parseInt(args[1])

        } else if (args[2].toLowerCase().includes('anu')){
            attackDeployA += parseInt(args[1])
        } 
        else if (args[2].toLowerCase().includes('var')){
            attackDeployV += parseInt(args[1])

        }
        else {
            msg.reply(`I could not find troop ${args[2]}`);
            return;
        }
        //!attack @ShishirB 2 thanos 300 sai 4 anu 20 var
        for (var e = 4; e < 10; e+=2){
            if (args[e] !== undefined){
                if (args[e].toLowerCase().includes('thanos')){
                    attackDeployT += parseInt(args[e-1]);
                } else if (args[e].toLowerCase().includes('sai')){
                    attackDeployS += parseInt(args[e-1]);
                } else if (args[e].toLowerCase().includes('anu')){
                    attackDeployA += parseInt(args[e-1]);
                } else if (args[e].toLowerCase().includes('var')){
                    attackDeployV += parseInt(args[e-1]);
                } else {
                    msg.reply(`I could not find troop ${args[e]}`);
                    return;
                }
            }
        }
    }
        msg.channel.send(`T: ${attackDeployT}, S: ${attackDeployS}, A: ${attackDeployA}, V: ${attackDeployV}`);
        /* if (args[4] !== undefined){
            if (args[4].toLowerCase().includes('thanos')){
                attackDeployT += parseInt(args[3])
            } else if (args[4].toLowerCase().includes('sai')){
                attackDeployS += parseInt(args[3])
            } else {
                msg.reply(`I could not find troop ${args[4]}`);
                return;
            }
        } */

        if (attackDeployT < 0 || attackDeployS < 0 ){
            msg.reply('Nice try!')
            return;
        }
        
        //make function to do both 0 > checks! 
        let john: boolean = false;
        function zCheck(attackerDeploy: number,attackerTotal: number, troopName: string){
            if (attackerDeploy > attackerTotal){
                msg.reply(`You don't have enough ${troopName} to launch this attack!`);
                john = true;
            }
        }

        zCheck(attackDeployT,attackTotalT,'Thanosid\'s');
        zCheck(attackDeployS,attackTotalS,'saimonGay\'s');
        zCheck(attackDeployA,attackTotalA,'anumonGamer\'s');
        zCheck(attackDeployV,attackTotalV,'FaZe Varun\'s'); //SO IT SHOWS ALL OF THE TROOPS YOU CANNOT DEPLOY!
        

        if (john){
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
        db.add(`${msg.author.id}.aAmt`,-attackDeployA);
        db.add(`${msg.author.id}.vAmt`,-attackDeployV);

       /*  var bal1 = db.get(`${msg.author.id}.money`)
        var bal2 = db.get(`${mentionedUser.id}.money`)
        */
        var defenderT = db.get(`${mentionedUser.id}.tAmt`);
        var defenderS = db.get(`${mentionedUser.id}.sAmt`);
        var defenderA = db.get(`${mentionedUser.id}.aAmt`);
        var defenderV = db.get(`${mentionedUser.id}.vAmt`);
        var attackerMoney = db.get(`${msg.author.id}.money`);
        var defenderMoney = db.get(`${mentionedUser.id}.money`);
        var attackerGlory = db.get(`${msg.author.id}.glory`);
        var defenderGlory = db.get(`${mentionedUser.id}.glory`);
        let tooMuchWork = new Discord.RichEmbed()
            .setColor([12,12,12])
            .setDescription(`Yer Troops Sonny-boy`)
            .setThumbnail(mentionedUser.avatarURL)
            .setAuthor(`${msg.author.username}'s Spy Report`,msg.author.avatarURL)
            .addField('Yer Thanosid',attackDeployT,true)
            .addField('Yer saimonGay',attackDeployS,true)
            .addField('Yer anumonGamers',attackDeployA,true)
            .addField('Yer FaZe Varun',attackDeployV,true)
            .addBlankField()
            .addField('Yer enemy Thanosid',defenderT,true)
            .addField('Yer enemy saimonGay',defenderS,true)
            .addField('Yer enemy anumonGamers',defenderA,true)
            .addField('Yer enemy FaZe Varun',defenderV,true)
            .setFooter(`Ailunian IV`)
            .setTimestamp(new Date())
        msg.channel.send(tooMuchWork);
         //remodel BELOW, saimonGay FP = 2, FFV FP = 30, anu = 1

        function elevate(aTroopn: number,dTroopn: number,l: string){
           let aGlory = db.get(`${msg.author.id}.glory`)
           let dGlory = db.get(`${mentionedUser.id}.glory`)
           aTroopn /= (1 + (dGlory/1000)); 
           dTroopn /= (1 + (aGlory/1000));
           if (aTroopn > dTroopn){
               //attacker wins this minibattle
               aTroopn -= dTroopn;
               aTroopn = roundIf(aTroopn * (1 + dGlory/1000))
               //db.add(`${mentionedUser.id}.${l}Amt`,-db.get(`${mentionedUser.id}.${l}Amt`));
               dTroopn = 0;
           } else if (aTroopn < dTroopn){
               //defender wins!
               dTroopn -= aTroopn
               dTroopn = roundIf(dTroopn*(1 + (aGlory/1000)))
               //db.add(`${mentionedUser.id}.${l}Amt`,-db.get(`${mentionedUser.id}.${l}Amt`)+dTroopn);
               aTroopn = 0;
           } else {
               //tie
               //db.add(`${mentionedUser.id}.${l}Amt`,-db.get(`${mentionedUser.id}.${l}Amt`));
               dTroopn = 0;
               aTroopn = 0;
           }
           //console.log([aTroopn,dTroopn]);
           return [aTroopn,dTroopn];
        }   
        //separate thanosid and saimonGay make weighted glory balance! DONE


        function gcalc(tloss1: number,tloss2: number, sloss1: number,sloss2: number, aloss1: number, aloss2: number, floss1: number, floss2: number, g1: number,g2: number, attW: boolean){
            let totalPoints = Math.ceil((g1 + g2)/10);
            totalPoints *= g1 > g2 ? Math.ceil((g1+g2)/(1+g1)) : Math.ceil((g1+g2)/(1+g2));
            let tfactor1 = 1 + (0.95*aloss1 + 0.3*floss1 + 0.8*tloss1 + 0.15*sloss1)/1000;
            let tfactor2 = 1 + (0.95*aloss2 + 0.3*floss2 + 0.8*tloss2 + 0.15*sloss2)/1000;

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
        return [(db.get(`${msg.author.id}.glory`) - g1),(db.get(`${mentionedUser.id}.glory`) - g2)] //returns change in glory
        }

        function fight(lstA: number[], lstD: number[]){ //vast!
            var [attackDeployV,attackDeployA,attackDeployS, attackDeployT] = lstA
            var [defenderV,defenderA,defenderS, defenderT] = lstD
            //msg.channel.send(`Attacker: ${attackDeployA}, Def: ${defenderA}`)
            var [attackDeployA,defenderA] = elevate(attackDeployA,defenderA,'a');
            console.log(defenderA);
            console.log(attackDeployA);
            //defenderA = db.get(`${mentionedUser.id}.aAmt`);
            //anumonicFight complete
            var attackTDeath: number[] = [0];
            var defendTDeath: number[] = [0];
            var anumonD;
            defenderA > 0 ? anumonD = true : anumonD = false; //if defender has more than 0 anumons, 20% boost to D!, else -20% boost!
            if (anumonD){
                if (defenderV > 0.3){
                    defenderV *= (3/5) ** attackDeployT
                    msg.channel.send('A');
                    attackTDeath.push(Math.ceil(logb(3/5,0.3/defenderV)))
                }
                
                if (defenderA > 0.3){
                    defenderA *= (3/5) ** attackDeployT
                    msg.channel.send('B');
                    attackTDeath.push(Math.ceil(logb(3/5,0.3/defenderA)))
                }

                if (defenderS > 0.3){
                    defenderS *= (3/5) ** attackDeployT
                    msg.channel.send('C');
                    attackTDeath.push(Math.ceil(logb(3/5,0.3/defenderS)))
                }
                
            } else {
                if (defenderV > 0.3){
                    defenderV *= (2/5) ** attackDeployT
                    msg.channel.send('D');
                    attackTDeath.push(Math.ceil(logb(2/5,0.3/defenderV)))
                }
                
                if (defenderA > 0.3){
                    defenderA *= (2/5) ** attackDeployT
                    msg.channel.send('E');
                    attackTDeath.push(Math.ceil(logb(2/5,0.3/defenderA)))
                }

                if (defenderS > 0.3){
                    defenderS *= (2/5) ** attackDeployT
                    msg.channel.send('F');
                    attackTDeath.push(Math.ceil(logb(2/5,0.3/defenderS)))
                }
            } //attacker Thanosid has successfully completed its mission!

            if (attackDeployV > 0.3){
                attackDeployV *= (1/2) ** defenderT
                msg.channel.send('G');
                defendTDeath.push(Math.ceil(logb(1/2,0.3/attackDeployV)))
            }
            
            if (attackDeployA > 0.3){
                attackDeployA *= (1/2) ** defenderT
                msg.channel.send('H');
                defendTDeath.push(Math.ceil(logb(1/2,0.3/attackDeployA)))
            }

            if (attackDeployS > 0.3){
                attackDeployS *= (1/2) ** defenderT
                msg.channel.send('I');
                defendTDeath.push(Math.ceil(logb(1/2,0.3/attackDeployS)))
            }

            console.log(attackTDeath);
            console.log(defendTDeath);
            var maxThanosA = Math.max(...attackTDeath); //ATTACKER
            if (maxThanosA > attackDeployT){
                //means that attacker does not have enough TS to defeat defending nonThanos troops COMPLETELY! 
                attackDeployT = 0;
                //well, that's that ain't it?
            } else {
                //ohhh so you DO have at least enough to desTROY the enemy!!
                attackDeployT -= maxThanosA
            }

            var maxThanosD = Math.max(...defendTDeath); //DEFENDER
            if (maxThanosD > defenderT){
                //means that attacker does not have enough TS to defeat defending nonThanos troops COMPLETELY!
                defenderT = 0;
                //well, that's that ain't it?
            } else {
                //ohhh so you DO have at least enough to desTROY the enemy!!
                defenderT -= maxThanosD
            }

            var [attackDeployT,defenderT] = elevate(attackDeployT,defenderT,'t')
            var [attackDeployS,defenderS] = elevate(attackDeployS,defenderS,'s')
            var [attackDeployV, defenderV] = elevate(attackDeployV,defenderV,'v')

            defenderV = roundIf(defenderV)
            defenderA = roundIf(defenderA)
            defenderS = roundIf(defenderS)
            defenderT = roundIf(defenderT)
            attackDeployV = roundIf(attackDeployV)
            attackDeployA = roundIf(attackDeployA)
            attackDeployS = roundIf(attackDeployS)
            attackDeployT =roundIf(attackDeployT)

            msg.channel.send(`defendFFV: ${defenderV}, S: ${defenderS}, T: ${defenderT}, A: ${defenderA}`)
            msg.channel.send(`attackFFV: ${attackDeployV}, S: ${attackDeployS}, T: ${attackDeployT}, A: ${attackDeployA}`)

            //If thanos > 0, then ALL OTHER TROOPS ARE DEAD! THE VICTOR IS CLEARLY THE ATTACKER (or defender)!
            //It can be assumed that THANOSID is 0, and the only remaining troops at this stage are the Gamers, VarunD's, and saimoN's
            
            //if (attackDeployT > 0 || otherCondition){
                //attackerVictory
           // }

           // else if (db.get(`${mentionedUser.id}.tAmt`) > 0 || otherCondition){
                //defender Win!
          //  }
        }
        fight([attackDeployV,attackDeployA,attackDeployS,attackDeployT],[defenderV,defenderA,defenderS,defenderT]);
    }
}
