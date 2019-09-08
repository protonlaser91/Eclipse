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
        function compareSecondColumn(a: (string | number)[], b: (string | number)[]) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? 1 : -1;
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
        let fmlst: any = []
        let glst: any = []
        let mlst: any = []
        let llst: any = []
        let slst: any = []
        let plst: any = []
        let fmlstID: any = []
        let glstID: any = []
        let mlstID: any = []
        let llstID: any = []
        let slstID: any = []
        let plstID: any = []
        var cName = db.get(`${msg.author.id}.clanname`)
        for (var x  = 0; x < Clan.get(`${cName}.memberids`).length; x++){
            var mid = Clan.get(`${cName}.memberids`);
            var mun = Clan.get(`${cName}.memberuns`);
            switch (db.get(`${mid}.position`)){
                case 'Commander':
                    console.log('got ocmmander!')
                    console.log(mun[x])
                    var commandid = mid[x];
                    var commandun = mun[x];
                    break;
                case 'Field Marshal':
                    fmlst.push([mun[x],db.get(`${mid[x]}.glory`)]);
                    fmlstID.push([mid[x],db.get(`${mid[x]}.glory`)]);
                    break;
                case 'General':
                    glst.push([mun[x],db.get(`${mid[x]}.glory`)]);
                    glstID.push([mid[x],db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Major':
                    mlst.push([mun[x],db.get(`${mid[x]}.glory`)]);
                    mlstID.push([mid[x],db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Lieutenant':
                    llst.push([mun[x],db.get(`${mid[x]}.glory`)]);
                    llstID.push([mid[x],db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Sergeant':
                    slst.push([mun[x],db.get(`${mid[x]}.glory`)]);
                    slstID.push([mid[x],db.get(`${mid[x]}.glory`)]);
                    break;
                case 'Private':
                    plst.push([mun[x],db.get(`${mid[x]}.glory`)]);
                    plstID.push([mid[x],db.get(`${mid[x]}.glory`)]);
                    break;
            }
        }
        fmlst.sort(compareSecondColumn);
        glst.sort(compareSecondColumn);
        mlst.sort(compareSecondColumn);
        llst.sort(compareSecondColumn);
        slst.sort(compareSecondColumn);
        plst.sort(compareSecondColumn);
        fmlstID.sort(compareSecondColumn);
        glstID.sort(compareSecondColumn);
        mlstID.sort(compareSecondColumn);
        llstID.sort(compareSecondColumn);
        slstID.sort(compareSecondColumn);
        plstID.sort(compareSecondColumn);
        var megaList = [commandid,db.get(`${commandid}.glory`)] + fmlst + glst + mlst + llst + slst + plst;
        var megaListUN = [commandun,db.get(`${commandid}.glory}`)] + fmlstID + glstID + mlstID + llstID + slstID + plstID;
        var secc = megaList[1][0];
    }

    if (args[0] === undefined){
        msg.reply('no!');
        return;
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
                    if (isNaN(Number(args.slice(1)[x]))){
                        cl.push(args.slice(1)[x].toLowerCase())
                    }
                    else {
                        cl.push(`${args.slice(1)[x]}`)
                    }
                }
                let cl2 = cl.join(' ');
                let cNamer = db.get(`${allUsers[x].id}.clanname`)
                for (var x = 0; x < clanlist.length; x++){
                    console.log(clanlist[x])
                    if (clanlist[x].includes(cl2)){
                        db.set(`${msg.author.id}.clanname`,clanlist[x]);
                        db.set(`${msg.author.id}.position`,`Private`);
                        Clan.push(`${cNamer}.members`,msg.author)
                        console.log(Clan.all())
                       msg.reply(`Successfully added you to clan \`${clanlist[x]}\``)
                       return;
                   }
               }
               msg.reply('Unable to find that clan! If this is an error, please message p1ng!');
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
                msg.reply('clan already exists!')
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
            //showw! 
            for (var x = 0; x < megaListUN.length; x++){
                console.log(megaListUN);
                console.log(megaListUN.length);
                msg.channel.send(megaListUN[x][0]);
            }
            
            
            msg.reply(`You are in the clan \`${db.get(`${msg.author.id}.clanname`)}\` and you are a \`${db.get(`${msg.author.id}.position`)}\`!`);
            return;
        } else if (args[0].toLowerCase().includes('p')){
            msg.reply('notaddedyet!');
            return;
        }
         else {
            msg.reply('Proper usage: `!clan <make/join/leave> <clanname>`')
            msg.reply(Clan.all())
            return;
        }
    }

}