import Menu from "./writers";

export default interface IWritable {
    write(menuStr: { [mealtype: string]: Menu }): Promise<object>;
}