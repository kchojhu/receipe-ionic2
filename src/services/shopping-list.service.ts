import {Ingredient} from "../models/ingredient";
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addItem(name:string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(`add item: name: ${name} amount: ${amount}`);
  }

  addItems(items:Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index:number) {
    console.log(`remove: ${index}`);
    this.ingredients = this.ingredients.slice(index + 1, 1);
  }
}
