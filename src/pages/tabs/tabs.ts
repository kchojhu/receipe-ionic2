import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ShoppingsListPage} from "../shoppings-list/shoppings-list";
import {ReceipesPage} from "../receipes/receipes";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  shoppingListPage = ShoppingsListPage;
  receipesPage = ReceipesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
