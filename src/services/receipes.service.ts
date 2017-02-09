import {Receipe} from "../models/receipe.model";
import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";

@Injectable()
export class ReceipesService {
  private receipes: Receipe[] = [];

  constructor(private http: Http, private authService: AuthService) {

  }

  addReceipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.receipes.push(new Receipe(title, description, difficulty, ingredients));
    console.log('added receipe:' + title);
  }

  getReceipes() {
    return this.receipes.slice();
  }

  updateReceipe(index: number, title: string, description:string, difficulty:string, ingredients: Ingredient[]) {

    this.receipes[index] = new Receipe(title, description, difficulty, ingredients);
    console.log(this.receipes);
  }

  removeReceipe(index: number) {
    this.receipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put("https://ionic2-receipe-book.firebaseio.com/" +
      userId + '/receipes.json?auth=' + token,
      this.receipes).map((response: Response) => {
      return response.json();
    });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get("https://ionic2-receipe-book.firebaseio.com/" +
      userId + '/receipes.json?auth=' + token).map((response:Response) => {
      const receipes: Receipe[] = response.json() ? response.json() : [];
      for (let item of receipes) {
        if (!item.hasOwnProperty('ingredients')) {
          item.ingredients = [];
        }
      }
      return receipes;
    }).do((receipes: Receipe[]) => {
      if (receipes) {
        this.receipes = receipes;
      } else {
        this.receipes = [];
      }
    });
  }
}



