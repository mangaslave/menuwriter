import { resolve } from "path";
import { rejects } from "assert";
import { EOL } from "os";
import { readFile } from "node:fs/promises";
import IWritable from "./IWritable";
import Menu, { TextWriter, HtmlWriter } from "./writers";

//const csvFilePath = './menu.csv';
const csv = require('csvtojson');

export default class Csvmenuparser{

    public _meal: string[] = [];



    private constructor(data: string[]) {
        this._meal = data;
    }

    static parseLine(line: string): { mealtype: string, menu: Menu } {
        const [mealtype, mealname, quantity, price] = line.split(',');
        return { mealtype, 
            menu: {mealname, quantity, price} };
    }

    static async buildmenu(filename: string) {
        // const menu = await Csvmenuparser.buildmenu(menu.csv)
       const data = await readFile(filename, "utf8");
    //    return new Csvmenuparser(data.split(EOL)).map();
        return data.split(EOL)
        .reduce((acc: { [key: string]: Menu[] }, line) => {
            const { mealtype, menu } = Csvmenuparser.parseLine(line);
            if (!acc[mealtype]) {
              acc[mealtype] = [];
            }
            acc[mealtype].push(menu);
            return acc;
          }, {});
    }
}

async function main() {
    const content = await Csvmenuparser.buildmenu("menu.csv")
    console.log(content);
    // @ts-ignore
    const txtFile:IWritable = new TextWriter();
    // @ts-ignore
    await txtFile.write(content);
    // @ts-ignore
    const htmlFile:IWritable = new HtmlWriter();
    // @ts-ignore
    await htmlFile.write(content);
}

main();


