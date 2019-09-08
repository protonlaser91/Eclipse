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
            function compareSecondColumn(a, b) {
                if (a[1] === b[1]) {
                    return 0;
                }
                else {
                    return (a[1] < b[1]) ? 1 : -1;
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
                let fmlst = [];
                let glst = [];
                let mlst = [];
                let llst = [];
                let slst = [];
                let plst = [];
                let fmlstID = [];
                let glstID = [];
                let mlstID = [];
                let llstID = [];
                let slstID = [];
                let plstID = [];
                var cName = db.get(`${msg.author.id}.clanname`);
                for (var x = 0; x < Clan.get(`${cName}.memberids`).length; x++) {
                    var mid = Clan.get(`${cName}.memberids`);
                    var mun = Clan.get(`${cName}.memberuns`);
                    switch (db.get(`${mid}.position`)) {
                        case 'Commander':
                            console.log('got ocmmander!');
                            console.log(mun[x]);
                            var commandid = mid[x];
                            var commandun = mun[x];
                            break;
                        case 'Field Marshal':
                            fmlst.push([mun[x], db.get(`${mid[x]}.glory`)]);
                            fmlstID.push([mid[x], db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'General':
                            glst.push([mun[x], db.get(`${mid[x]}.glory`)]);
                            glstID.push([mid[x], db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Major':
                            mlst.push([mun[x], db.get(`${mid[x]}.glory`)]);
                            mlstID.push([mid[x], db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Lieutenant':
                            llst.push([mun[x], db.get(`${mid[x]}.glory`)]);
                            llstID.push([mid[x], db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Sergeant':
                            slst.push([mun[x], db.get(`${mid[x]}.glory`)]);
                            slstID.push([mid[x], db.get(`${mid[x]}.glory`)]);
                            break;
                        case 'Private':
                            plst.push([mun[x], db.get(`${mid[x]}.glory`)]);
                            plstID.push([mid[x], db.get(`${mid[x]}.glory`)]);
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
                var megaList = [commandid, db.get(`${commandid}.glory`)] + fmlst + glst + mlst + llst + slst + plst;
                var megaListUN = [commandun, db.get(`${commandid}.glory}`)] + fmlstID + glstID + mlstID + llstID + slstID + plstID;
                var secc = megaList[1][0];
            }
            if (args[0] === undefined) {
                msg.reply('no!');
                return;
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
                        if (isNaN(Number(args.slice(1)[x]))) {
                            cl.push(args.slice(1)[x].toLowerCase());
                        }
                        else {
                            cl.push(`${args.slice(1)[x]}`);
                        }
                    }
                    let cl2 = cl.join(' ');
                    let cNamer = db.get(`${allUsers[x].id}.clanname`);
                    for (var x = 0; x < clanlist.length; x++) {
                        console.log(clanlist[x]);
                        if (clanlist[x].includes(cl2)) {
                            db.set(`${msg.author.id}.clanname`, clanlist[x]);
                            db.set(`${msg.author.id}.position`, `Private`);
                            Clan.push(`${cNamer}.members`, msg.author);
                            console.log(Clan.all());
                            msg.reply(`Successfully added you to clan \`${clanlist[x]}\``);
                            return;
                        }
                    }
                    msg.reply('Unable to find that clan! If this is an error, please message p1ng!');
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
                    msg.reply('clan already exists!');
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
                for (var x = 0; x < megaListUN.length; x++) {
                    console.log(megaListUN);
                    console.log(megaList.length);
                    msg.channel.send(megaListUN[x]);
                }
                msg.reply(`You are in the clan \`${db.get(`${msg.author.id}.clanname`)}\` and you are a \`${db.get(`${msg.author.id}.position`)}\`!`);
                return;
            }
            else if (args[0].toLowerCase().includes('p')) {
                msg.reply('notaddedyet!');
                return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwrQkFBOEI7QUFDOUIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoQyxNQUFxQixJQUFJO0lBQXpCO1FBRXFCLGFBQVEsR0FBRyxNQUFNLENBQUE7SUErTnRDLENBQUM7SUE3TkcsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLFNBQVMsbUJBQW1CLENBQUMsQ0FBc0IsRUFBRSxDQUFzQjtnQkFDdkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNmLE9BQU8sQ0FBQyxDQUFDO2lCQUNaO3FCQUNJO29CQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsQ0FBQztZQUVELElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQTtZQUNuQixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLEtB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