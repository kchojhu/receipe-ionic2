import {Ingredient} from "../models/ingredient";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http:Http, private authService: AuthService) {}

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
  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put("https://ionic2-receipe-book.firebaseio.com/" +
      userId + '/shoppings-list.json?auth=' + token,
      this.ingredients).map((response: Response) => {
      return response.json();
    });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get("https://ionic2-receipe-book.firebaseio.com/" +
      userId + '/shoppings-list.json?auth=' + token).map((response:Response) => {
      return response.json();
    }).do(data => {
      this.ingredients = data;
    });
  }
}
