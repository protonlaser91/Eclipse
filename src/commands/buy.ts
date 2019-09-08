import * as db from "quick.db";
import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { itemModel } from "../models/itemModel";
import { itemData } from "../itemData";

export default class buy implements IBotCommand {

    private readonly _command = "buy"

    name(): string {
        return "buy";
    } 

    help(): string {
        return 'buy';
    }   

    cooldown(): number {
        return 5;
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if(args.length < 1){
            msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
            return;
        }
        let newItemName = args.join(" ");
        let amount: any = args[0]
        console.log(amount);
        if (isNaN(Number(amount))){
            msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
            args = ['1',amount];
            amount = 1;
        }

        if (args[1].toLowerCase().includes('thanos')) 
            newItemName = 'Thanosid';
        else if (args[1].toLowerCase().includes('sai'))
            newItemName = 'saimonGay';
        //newItemName = args[1];
        console.log(args);
        let item: itemModel = null as any;
        
        itemData.items.forEach(element => {
            if (element.name.toLowerCase() == newItemName.toLowerCase()){
                item = element;
            }
        });

        if (item === null){
            msg.reply("That doesn't exist!");
            return;
        }

        let userMoney: number = db.get(`${msg.author.id}.money`)

        if (userMoney < item.price * amount){
            msg.reply("You do not have enough rubies to afford that, you poor scrub!");
            return;
        }

        db.add(`${msg.author.id}.money`,-amount * item.price);
        if (db.get(`${msg.author.id}.items`)[0] === item.name){
            db.add(`${msg.author.id}.tAmt`,amount);
        } else {
            db.add(`${msg.author.id}.sAmt`,amount);
        }
        msg.channel.send(`You have successfully bought ${amount} ${item.name}!`);
    }   

}