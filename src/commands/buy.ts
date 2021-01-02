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
        return 2  ;
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if(args.length < 1){
            msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
            return;
        }
        let newItemName = args.join(" "); //get item name (if it is multi spaced)
        let amount: any = args[0] //how much of item u want to buy
        console.log(amount);
        if (isNaN(Number(amount))){ //if amount is not a Number
            msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
            args = ['1',amount]; //yeah i was really smart 2 months ago and this works for some reason i cannot explain why
            //oh wait ahhh i see, so if only 1 arg was put in, it is assumed to be the troop. the first arg is gonna be the amount var, so we bump it back and redefine amount and we good!
            amount = 1;
        }

        if (amount <= 0 || amount % 1 != 0){
            msg.channel.send("Eh don't try and con me!");
            return;
        }

        if (args[1] === undefined){
            msg.reply('Proper Usage: \`!buy <amt> <troop>`\ If amt is left empty then it will be defaulted as 1.');
            return;
        }

        //change to switch later
        if (args[1].toLowerCase().includes('thanos')) 
            newItemName = 'Thanosid';
        else if (args[1].toLowerCase().includes('sai'))
            newItemName = 'saimonGay';
        else if (args[1].toLowerCase().includes('anu')){
            newItemName = 'anumonGamer';
        } else if (args[1].toLowerCase().includes('var') || args[1].toLowerCase().includes('ffv') || args[1].toLowerCase().includes('fv')){
            newItemName = 'REDACT';
        }
        //newItemName = args[1];
        console.log(args); //log all arguments
        let item: itemModel = null as any; //item is of type itemModel and is right now set to null (nothing)
        
        itemData.items.forEach(element => {
            if (element.name.toLowerCase() == newItemName.toLowerCase()){ //take all items in itemData, iterate through each "item" as an element.
                item = element; //if element name lowercase equals newitemname lowercase then set item = element
            }
        });

        if (item === null){
            msg.reply("That doesn't exist!"); //if item is still null, quite clearly the item does not exist.
            return; //dont run anything else, just return (since this Promise is of type void, it cannot return any value)
        }

        let userMoney: number = db.get(`${msg.author.id}.money`) //get user money

        if (userMoney < item.price * amount){ //eh self explanatory!
            msg.reply("You do not have enough rubies to afford that, you poor scrub!");
            return;
        }

        db.add(`${msg.author.id}.money`,-amount * item.price); //subtract the amount x itemprice from the user's balance
        switch (item.name){
            case "Thanosid":
                db.add(`${msg.author.id}.tAmt`,amount); //add the bought item in the amount the user asked for
                break;
            case "saimonGay":
                db.add(`${msg.author.id}.sAmt`,amount);
                break;
            case "anumonGamer":
                db.add(`${msg.author.id}.aAmt`,amount);
                break;
            case "REDACT":
                db.add(`${msg.author.id}.vAmt`,amount)
                break;
        }
        msg.channel.send(`You have successfully bought ${amount} ${item.name}!`); //yay it works! how beautiful is this code?! (not tryna be immodest)
     

}
}
