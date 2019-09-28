import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as db from "quick.db";

export default class info implements IBotCommand {

    private readonly _command = "info"

    name(): string {
        return "info";
    } 

    help(): string {
        return "info";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    cooldown(): number{
        return 3;
    }
    

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (!args.length || args.length > 2){
            msg.reply("Proper usage: `!info <troop_name>` ");
            return;
        }
        let troop = args.join(" ").toLowerCase();
        if (troop.includes("thanos")){
            var hex = `#9a55bd`
            var nam = "Thanosid"
            var a = db.get(`${msg.author.id}.tAmt`)
            var img = `https://i.imgur.com/XYzs8sl.png`
            var desc = "This troop is extremely powerful, and wipes out **half** of all saimonGay forces of your enemy. If only one saimonGay remains for the opposing side, it will run away like the traitor it is.\n\nIf you know how many saimonGays you are up against, you may use this formula to calculate how many Thanosid are necessary to defeat your enemy: ```roundUp(log2(saimonGays))```"
            var price = 800
            var speed = 0.2
            var loot = 75
        } else if (troop.includes('sai')){
            var hex =  `#32CD32`
            var nam = "saimonGay"
            var a = db.get(`${msg.author.id}.sAmt`)
            var img = `https://i.imgur.com/6KR69ku.png`
            var desc = "This troop is treacherous and deceitful... and extremely cheap. It will only fight if accompanied by others like it. That means that if **one** saimonGay is left, it will run away.\n\nTo find out how many saimonGays are needed to defeat enemy Thanosid, you may use this formula: ```saimonGays > 2^thanosidNumber```"
            var price = 2
            var speed = 2
            var loot = 3
        } else if (troop.includes('anu')){
                var hex =  `#FF6347`
                var nam = "anumonGamer"
                var a = db.get(`${msg.author.id}.aAmt`)
                var img = `https://huntforerror.files.wordpress.com/2017/06/pandi.png`
                var desc = "This troop is a pain in the neck and cuts all firepower on opposite side by **20**%! The Thanosid no longer snaps away **half** of all troops, now it can only snap away **2 for every 5** of a troop! However, an Anumon will only loot for itself, so be wary! \n\nThis troop is not stackable, but in order to work to fruition, you attack with more Anumons than the enemy has defending, or else the enemy gains the **20**% advantage! Glory also has an effect on this, so be careful when choosing your opponent!"
                var price = 600
                var speed = 2
                var loot = 0
        } else if (troop.includes('var') || troop.includes('ffv') || troop.includes('fv')){
                var hex =  `#FF6347`
                var nam = "Future FaZe Varun"
                var a = db.get(`${msg.author.id}.vAmt`)
                var img = `https://i.ytimg.com/vi/NvHRY1WtZLg/hqdefault.jpg`
                var desc = "The Future FaZe Varun troop is insanely powerful! It can obliterate hordes of saimonGays and is a primary attack troop only offset by its cost. It is able to loot insanely, travels fast, and causes utmost destruction. It does not have good defense stats, however! \n\nFuture FaZe Varun does not do well with Thanosid or anumonGamers due to their special attacks. It is still a very powerful troop!";
                var price = 200
                var speed = 4
                var loot = 40
        }
            else {
            msg.reply('That troop doesn\'t exist!');
            return;
        }
        let troopEmbed = new Discord.RichEmbed()
                                .setColor(hex)
                                .setTitle(`Information on troop ${nam}`)
                                .setAuthor('TroopCentral', msg.author.avatarURL)
                                .setDescription(desc)
                                .addField("Number of this troop",`${a}`,true)
                                .addField("Cost",`${price} rubies`,true)
                                .addField("Speed",`${speed}x multiplier`,true)
                                .addField("Looting",`${loot} capacity`,true)
                                .setThumbnail(msg.author.avatarURL)
                                .setImage(img)
                                .setTimestamp()
                                .setFooter('Powered by grigorythesmarmy207', 'https://i.imgur.com/XYzs8sl.png');
        msg.channel.send(troopEmbed);
    }

}