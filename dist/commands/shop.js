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
class shop {
    constructor() {
        this._command = "shop";
    }
    name() {
        return "shop";
    }
    help() {
        return "shop";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    cooldown() {
        return 3;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let shopEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('Items')
                .setAuthor('Shop', msg.author.avatarURL)
                .setDescription('Buy troops here. Run !info <troop_name> to understand more about the troop.')
                .setThumbnail('https://i.imgur.com/od8x6yh.png')
                .addBlankField()
                .addField('Thanosid', `800 rubies`, true)
                .addField('saimonGay', '2 rubies', true)
                .setImage('https://i.imgur.com/6KR69ku.png')
                .setTimestamp()
                .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png');
            msg.channel.send(shopEmbed);
        });
    }
}
exports.default = shop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFJdEMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBbUN0QyxDQUFDO0lBakNHLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBR0ssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ2QsUUFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDbkIsUUFBUSxDQUFDLE9BQU8sQ0FBQztpQkFDakIsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDdkMsY0FBYyxDQUFDLDZFQUE2RSxDQUFDO2lCQUM3RixZQUFZLENBQUMsaUNBQWlDLENBQUM7aUJBQy9DLGFBQWEsRUFBRTtpQkFDZixRQUFRLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUM7aUJBQ3hDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQztpQkFDdkMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDO2lCQUMzQyxZQUFZLEVBQUU7aUJBQ2QsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7WUFDeEcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUFBO0NBRUo7QUFyQ0QsdUJBcUNDIn0=