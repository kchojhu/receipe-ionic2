import {Ingredient} from "./ingredient";
export class Receipe {
  constructor(public title:string, public description:string, public difficulty: string,
              public ingredients :Ingredient[]) {}
}
