
import { writeFile } from "fs/promises";
import IWritable from "./IWritable";


export default interface Menu {
    mealname: string;
    quantity: string;
    price: string;
}

export class HtmlWriter implements IWritable{
    // @ts-ignore
    async write(menuStr: { [mealtype: string]: Menu[]}): Promise<object> {
        let content = ``;
        Object.entries(menuStr).forEach(([mealtype, menus]) => {
            content += `<h2> ${mealtype} </h2>`;
            menus.forEach((menu) => {
                content += "<table>" 
                + `<tr><td class="menu-item">${menu.price}</td>
                <td class="menu-item">${menu.mealname}</td>
                <td class="menu-item">${menu.quantity}</td></tr>` 
                + "</table>";
            });
        });
        await writeFile('menu.html', content);
    }
}

export class TextWriter implements IWritable{
    // @ts-ignore
    async write(menuStr: { [mealtype: string]: Menu[]}): Promise<object> {
        let content = '';
        Object.entries(menuStr).forEach(([mealtype, menus]) => {
            content += `* ${mealtype} *\n`;
            menus.forEach((menu) => {
                content += `${menu.mealname}, ${menu.quantity}, ${menu.price}\n`;
            });
        });
        await writeFile('menu.txt', content);
    }
}

module.exports = {
    HtmlWriter,
    TextWriter
}