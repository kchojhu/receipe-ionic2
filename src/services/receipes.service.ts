import {Receipe} from "../models/receipe.model";
import {Ingredient} from "../models/ingredient";
export class ReceipesService {
  private receipes: Receipe[] = [];

  addReceipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.receipes.push(new Receipe(title, description, difficulty, ingredients));
    console.log('added receipe:' + title);
  }

  getReceipes() {
    return this.receipes.slice();
  }

  updateReceipe(index: number, title: string, description:string, difficulty:string, ingredients: Ingredient[]) {
    this.receipes[index] = new Receipe(title, description, difficulty, ingredients);
  }

  removeReceipe(index: number) {
    this.receipes.slice(index, 1);
  }
}
