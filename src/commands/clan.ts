import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { isNull } from "util";
var db = require('quick.db');
var Clan = new db.table('clan');

export default class clan implements IBotCommand {

    private readonly _command = "clan"

    name(): string {
        return "clan";
    } 

    help(): string {
        return "clan";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        function cTC(a: (string | number)[], b: (string | number)[]) { //compareThirdColumn
            if (a[2] === b[2]) {
                return 0;
            }
            else {
                return (a[2] < b[2]) ? 1 : -1;
            }
        }
        //hierarchy! Commander --> Field Marshal --> General --> Major --> Lieutenant --> Sergeant --> Private
        var clanlist: string[] = []
                let allUsers = Bot.users.array();
                for (var x  = 0; x < allUsers.length; x++){
                    if (clanlist.includes(db.get(`${allUsers[x].id}.clanname`))){
                        continue;
                    }
                    clanlist.push(db.get(`${allUsers[x].id}.clanname`));
                }
        
        if (db.get(`${msg.author.id}.clanname`) != 'None'){
        var noSec = false;
        let fmlst: any = []
        let glst: any = []
        let mlst: any = []
        let llst: any = []
        let slst: any = []
        let plst: any = []
        var cName = db.get(`${msg.author.id}.clanname`)
        for (var x  = 0; x < Clan.get(`${cName}.memberids`).length; x++){
            var mid = Clan.get(`${cName}.memberids`);
            var mun = Clan.get(`${cName}.memberuns`);
            //UserID, Username, Glory Amount!
            switch (db.get(`${mid[x}.position`)){
                case 'Commander':
                    console.log('got ocmmander!')
                    console.log(mun[x])
                    var commandid = mid[x];
                    var commandun: any = `***Cdr.***  ${mun[x]}`;
                    break;
                case 'Field Marshal':
                    fmlst.push([mid[x],`**F. Marshal**  ${mun[x]}`,db.get(`${mid[x]}.glory`)]);
                    break;
                case 'General':
                    glst.push([mid[x],`*Gen.*  ${mun[x]}`,db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Major':
                    mlst.push([mid[x],`*Maj.*  ${mun[x]}`,db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Lieutenant':
                    llst.push([mid[x],`Lt.  ${mun[x]}`,db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Sergeant':
                    slst.push([mid[x],`Sgt.  ${mun[x]}`,db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Private':
                    plst.push([mid[x],`Pvt.  ${mun[x]}`,db.get(`${mid[x]}.glory`)]);
                    break;
            }
        }
        fmlst.sort(cTC);
        glst.sort(cTC);
        mlst.sort(cTC);
        llst.sort(cTC);
        slst.sort(cTC);
        plst.sort(cTC);

        var megaList: any = [[commandid,commandun,db.get(`${commandid}.glory`)]].concat(fmlst,glst,mlst,llst,slst,plst);
        try {
            var secc = megaList[1][0];
        } catch {
            //User is only member in clan!
            var noSec = true;
        }
    }

    if (args[0] === undefined){
        msg.reply('no!');
        args = ['s'];
    }
        //var clanlist: String[] = [];
        if (args[0].toLowerCase().includes('j')){
            if (args.length < 2){
                msg.reply('Proper usage: `!clan <make/join/leave/show> <clanname>`')
                msg.channel.send(`Available Clans: ${clanlist}`) //turn into embed LATER
                return;
            }
            if (db.get(`${msg.author.id}.clanname`) == 'None'){
                let cl = []
                for (var x = 0; x < args.slice(1).length; x++){
                    try {
                        cl.push(args.slice(1)[x].toLowerCase())
                    }
                    catch {
                        cl.push(`${args.slice(1)[x]}`)
                    }
                }
                let cl2 = cl.join(' ');
                for (var x = 0; x < clanlist.length; x++){
                    console.log(clanlist[x]);
                    if (clanlist[x].toLowerCase().includes(cl2)){
                        if (Clan.get(`${clanlist[x]}.memberids`).length >= 12){
                            msg.reply('This clan is full!');
                            return;
                        }
                        db.set(`${msg.author.id}.clanname`,clanlist[x]);
                        db.set(`${msg.author.id}.position`,`Private`);
                        megaList.push(msg.author.id,`Pvt.  ${msg.author.username}`,db.get(`${msg.author.id}.glory`));
                        Clan.push(`${clanlist[x]}.memberids`,msg.author.id)
                        Clan.push(`${clanlist[x]}.memberuns`,msg.author.username)
                        console.log(cl2)
                       msg.reply(`Successfully added you to clan \`${clanlist[x]}\``)
                       return;
                   }
               }
               msg.reply('Unable to find that clan! If this is an error, please message p1ng!');
               msg.reply(`Expected reply: ${clanlist}\n Reply received: ${cl2}`);
            } else {
                msg.reply('You are already in a clan!')
            }

        }

        else if (args[0].toLowerCase().includes('m')){
            let rAmt = db.get(`${msg.author.id}.money`)
            if (rAmt < 5000){
                msg.reply('You do not have enough rubies to create a clan! You need at least 5000 rubies or message the author of this bot for permission to add a clan.');
                return;
            }
            if (args.length < 2){
                msg.reply('Proper usage: `!clan make <clanname>`')
                return;
            }
            let cname2 = args.slice(1).join(' ')
            if (Clan.all().includes(cname2)){
                msg.reply('clan already exists or is too similar to other clan names!')
                return;
            }
            msg.reply(`clan name: ${cname2}`)
            db.add(`${msg.author.id}.money`,-5000);
            console.log(cname2)
            if (isNull(Clan.get(cname2))){
                Clan.set(cname2,{prestige:0,money:0,memberids:[msg.author.id],memberuns:[msg.author.username]});
                //Clan.set('havingFun',{prestige:0,money:0,members:[msg.author]})
            } else {
                msg.reply('That clan already exists!');
            }
            db.set(`${msg.author.id}.clanname`,cname2)
            db.set(`${msg.author.id}.position`,'Commander')
            msg.reply(`Successfully created clan \`${args.slice(1).join(' ')}\` and made you a Commander!`)
        } else if (args[0].toLowerCase().includes('l')){
            if (db.get(`${msg.author.id}.clanname`) === 'None'){
                msg.reply('You are not in a clan to leave!');
                return;
            }
            var index = mid.indexOf(msg.author.id);
            var indexUN = mun.indexOf(msg.author.username)
            if (index > -1 || indexUN > -1) {
                mid.splice(index, 1); //means delete whatever is at index!
                mun.splice(indexUN, 1);
            } else {
                msg.reply('There was an error removing you from the clan.')
                return;
            }
            if (db.get(`${msg.author.id}.position`) === 'Commander'){
                db.set(`${msg.author.id}.position`,'')
                db.set(`${msg.author.id}.clanname`,'None')
                db.set(`${secc}.position`,'Commander');
            }
            //find way to remove specific user from Clan db COMPLETE
            Clan.set(`${db.get(`${msg.author.id}.clanname`)}.memberids`,mid)
            Clan.set(`${db.get(`${msg.author.id}.clanname`)}.memberuns`,mun)
            msg.reply(`Successfully removed you from clan ${db.get(`${msg.author.id}.clanname`)}`)
            
            db.set(`${msg.author.id}.clanname`,'');
            db.set(`${msg.author.id}.position`,'');
        } else if (args[0].toLowerCase().includes('s')){
            if (db.get(`${msg.author.id}.clanname`) === 'None'){
                msg.reply('You are not in a clan!');
                return;
            }
            //showw!  //UserID, Username, Glory Amount! For loop is for testing! 12 ppl per clan, list 8 on showEmbed
            var clanID = megaList.indexOf([msg.author.id,msg.author.username,db.get(`${msg.author.id}.glory`)]);
            msg.channel.send(megaList)
            if (megaList.length >= 8){ //ideal condition
                if (clanID < 4){
                    var pC = megaList.slice(0,8);
                }
                else if (clanID >= 4 && clanID <= megaList.length-4){ 
                    var pC = megaList.slice(clanID-4,clanID+4);
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
                            .addField(`#${baseID}: ${pC[0][1]}`,`${pC[0][2]} glory points!`,false)
                            .addField(`#${baseID+1}: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                            .addField(`#${baseID+2}: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                            .addField(`#${baseID+3}: ${pC[3][1]}`,`${pC[3][2]} glory points!`,false)
                            .addField(`#${baseID+4}: ${pC[4][1]}`,`${pC[4][2]} glory points!`,false)
                            .addField(`#${baseID+5}: ${pC[5][1]}`,`${pC[5][2]} glory points!`,false)
                            .addField(`#${baseID+6}: ${pC[6][1]}`,`${pC[6][2]} glory points!`,false)
                            .addField(`#${baseID+7}: ${pC[7][1]}`,`${pC[7][2]} glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                        msg.channel.send(sEmbedFull);
                
            } else {
                var pC = megaList;
                switch (pC.length){
                    case 7:
                        const sEmbed7 = new Discord.RichEmbed()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                        .setThumbnail(msg.author.avatarURL)
                        .setDescription('See the top 7 people in your clan!')
                        .addField(`**#1:** ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                        .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                        .addField(`#3: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                        .addField(`#4: ${pC[3][1]}`,`${pC[3][2]} glory points!`,false)
                        .addField(`#5: ${pC[4][1]}`,`${pC[4][2]} glory points!`,false)
                        .addField(`#6: ${pC[5][1]}`,`${pC[5][2]} glory points!`,false)
                        .addField(`#7: ${pC[6][1]}`,`${pC[6][2]} glory points!`,false)
                        .setFooter('Leaderboards',msg.author.avatarURL)
                        .setAuthor('BattleBot',Bot.user.avatarURL);
                        msg.channel.send(sEmbed7);
                        break;
                    case 6:
                            const sEmbed6 = new Discord.RichEmbed()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('See the top 6 people in your clan!')
                            .addField(`**#1:** ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                            .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                            .addField(`#3: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                            .addField(`#4: ${pC[3][1]}`,`${pC[3][2]} glory points!`,false)
                            .addField(`#5: ${pC[4][1]}`,`${pC[4][2]} glory points!`,false)
                            .addField(`#6: ${pC[5][1]}`,`${pC[5][2]} glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                            msg.channel.send(sEmbed6);
                            break;
                    case 5:
                            const sEmbed5 = new Discord.RichEmbed()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('See the top 5 people in your clan!')
                            .addField(`**#1**: ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                            .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                            .addField(`#3: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                            .addField(`#4: ${pC[3][1]}`,`${pC[3][2]} glory points!`,false)
                            .addField(`#5: ${pC[4][1]}`,`${pC[4][2]} glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                            msg.channel.send(sEmbed5);
                            break;
                    case 4:
                            const sEmbed4 = new Discord.RichEmbed()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('See the top 4 people in your clan!')
                            .addField(`**#1:** ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                            .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                            .addField(`#3: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                            .addField(`#4: ${pC[3][1]}`,`${pC[3][2]} glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                            msg.channel.send(sEmbed4);
                            break;
                    case 3:
                            const sEmbed3 = new Discord.RichEmbed()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('See the top 3 people in your clan!')
                            .addField(`**#1:** ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                            .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                            .addField(`#3: ${pC[2][1]}`,`${pC[2][2]} glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                            msg.channel.send(sEmbed3);
                            break;
                    case 2:
                            const sEmbed2 = new Discord.RichEmbed()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('See the top 2 people in your clan!')
                            .addField(`**#1:** ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                            .addField(`#2: ${pC[1][1]}`,`${pC[1][2]} glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                            msg.channel.send(sEmbed2);
                            break;
                    case 1:
                            const sEmbed1 = new Discord.RichEmbed()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor(`${db.get(`${msg.author.id}.clanname`)} Clan Leaderboard!`)
                            .setThumbnail(msg.author.avatarURL)
                            .setDescription('See the top person in your clan! (Hail Ashwin IV)')
                            .addField(`**#1:** ${pC[0][1]}`,`**${pC[0][2]}** glory points!`,false)
                            .setFooter('Leaderboards',msg.author.avatarURL)
                            .setAuthor('BattleBot',Bot.user.avatarURL);
                            msg.channel.send(sEmbed1);
                            break;
                }
                
            }
            //remember to bold user in showList/pC!,and BOLD titles like F.Marshal Bendy or Maj. Shquitler I or Com. Bandy
            
            
            msg.reply(`You are in the clan \`${db.get(`${msg.author.id}.clanname`)}\` and you are a \`${db.get(`${msg.author.id}.position`)}\`!`);
            return;
        } else if (args[0].toLowerCase().includes('p')){
            msg.reply('notaddedyet!');
            return;
        } else if (args[0].toLowerCase().includes('i')){
            if (args.length < 2){
                msg.reply('Proper usage: `!clan i <user> OPTIONAL: <position>`')
                return;
            }
            if (db.get(`${msg.author.id}.clanname`) == 'None'){
                msg.reply('You are not a clan, so you cannot invite someone!');
                return;
            } 
            let mentionedUser = msg.mentions.users.first();
            msg.channel.send(`Sent invitation to ${mentionedUser}!`)
            mentionedUser.send(`Hello! The user ${msg.author.username} has invited you to join their clan, ${db.get(`${msg.author.id}.clanname`)}! If you would like to join, simply go on the server and type !clan j ${db.get(`${msg.author.id}.clanname`)}`);
        }
         else {
            msg.reply('Proper usage: `!clan <make/join/leave> <clanname>`')
            msg.reply(Clan.all())
            return;
        }
    }

}
