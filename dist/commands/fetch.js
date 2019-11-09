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
const request = require('request');
var firstLine;
const cheerio = require('cheerio');
class fetch {
    constructor() {
        this._command = "fetch";
    }
    name() {
        return "fetch";
    }
    help() {
        return "fetch";
    }
    cooldown() {
        return 4;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            function randint(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            function image(msg) {
                var options = {
                    url: "http://results.dogpile.com/serp?qc=images&q=" + args.join("+"),
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                };
                function reqfunc(error, response, body) {
                    if (error) {
                        return;
                    }
                    var a = cheerio.load(body);
                    var links = a(".image a.link");
                    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                    console.log(urls);
                    if (!urls.length) {
                        msg.channel.send("NO images HOMIE!");
                        return;
                    }
                    msg.channel.send({ files: [urls[0]] });
                }
                request(options, reqfunc);
            }
            image(msg);
        });
    }
}
exports.default = fetch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmV0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxJQUFJLFNBQWMsQ0FBQztBQUNuQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkMsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFBO0lBNEVuQyxDQUFDO0lBMUVELElBQUk7UUFDQSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUV0RSxTQUFTLE9BQU8sQ0FBQyxHQUFXLEVBQUMsR0FBVztnQkFFeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELFNBQVMsS0FBSyxDQUFDLEdBQW9CO2dCQUMvQixJQUFJLE9BQU8sR0FBRztvQkFDVixHQUFHLEVBQUUsOENBQThDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3BFLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsV0FBVzt3QkFDckIsWUFBWSxFQUFFLFFBQVE7cUJBQ3pCO2lCQUNKLENBQUE7Z0JBRUQsU0FBUyxPQUFPLENBQUMsS0FBVSxFQUFFLFFBQWEsRUFBRSxJQUFTO29CQUNqRCxJQUFJLEtBQUssRUFBRTt3QkFFUCxPQUFPO3FCQUNWO29CQUdELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRzNCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFLL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUVuRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFFZixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUNwQyxPQUFPO3FCQUNWO29CQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUdELE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFFN0IsQ0FBQztZQUlJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQixDQUFDO0tBQUE7Q0FNSTtBQTlFTCx3QkE4RUsifQ==