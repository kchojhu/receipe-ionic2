import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../models/ingredient";


@Component({
  selector: 'page-shoppings-list',
  templateUrl: 'shoppings-list.html'
})
export class ShoppingsListPage {
  ingredients: Ingredient[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shoppingListService: ShoppingListService) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    console.log(form);
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(i: number) {
    this.shoppingListService.removeItem(i);
    this.loadItems();
  }

  private loadItems() {
    this.ingredients = this.shoppingListService.getItems();
  }

}
