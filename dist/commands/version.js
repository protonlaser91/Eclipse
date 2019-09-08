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
var db = require('quick.db');
var Clan = new db.table('clan');
class version {
    constructor() {
        this._command = "version";
    }
    name() {
        return "version";
    }
    help() {
        return "version";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const versionEmbed = new Discord.RichEmbed()
                .setAuthor('Bendy Man aka The Creator', msg.author.avatarURL, `https://www.google.com/search?q=rick+roll&oq=rick+roll&aqs=chrome..69i57.1981j0j7&sourceid=chrome&ie=UTF-8`)
                .setDescription('Current version and build.')
                .setColor([200, 50, 20])
                .setThumbnail(Bot.user.avatarURL)
                .addField('Version', 0.2, true)
                .addField('Build', 'alpha', true)
                .addBlankField()
                .addField('Current update', 'Added clan functionality and features.')
                .addField('Future update plans', 'Add ShishirBendyBot')
                .setFooter('Bendy Corporation', msg.author.avatarURL)
                .setTimestamp(new Date());
            msg.channel.send(versionEmbed);
        });
    }
}
exports.default = version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy92ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoQyxNQUFxQixPQUFPO0lBQTVCO1FBRXFCLGFBQVEsR0FBRyxTQUFTLENBQUE7SUFpQ3pDLENBQUM7SUEvQkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDbkIsU0FBUyxDQUFDLDJCQUEyQixFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDLDRHQUE0RyxDQUFDO2lCQUN4SyxjQUFjLENBQUMsNEJBQTRCLENBQUM7aUJBQzVDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JCLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDaEMsUUFBUSxDQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDO2lCQUM1QixRQUFRLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUM7aUJBQzlCLGFBQWEsRUFBRTtpQkFDZixRQUFRLENBQUMsZ0JBQWdCLEVBQUMsd0NBQXdDLENBQUM7aUJBQ25FLFFBQVEsQ0FBQyxxQkFBcUIsRUFBQyxxQkFBcUIsQ0FBQztpQkFDckQsU0FBUyxDQUFDLG1CQUFtQixFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2lCQUNuRCxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTtDQUVKO0FBbkNELDBCQW1DQyJ9