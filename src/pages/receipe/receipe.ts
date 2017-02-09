import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import {Receipe} from "../../models/receipe.model";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ReceipesService} from "../../services/receipes.service";

@Component({
  selector: 'page-receipe',
  templateUrl: 'receipe.html'
})
export class ReceipePage implements OnInit{
  receipe: Receipe;
  index: number;
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private shoppingListServcie:ShoppingListService,
              private receipeService: ReceipesService
  ) {}

  ngOnInit(): void {
    this.receipe = this.navParams.get('receipe');
    this.index = this.navParams.get('index')
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onEditReceipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'Edit',
      receipe: this.receipe,
      index: this.index
    })
  };

  onAddIngredients() {
    this.shoppingListServcie.addItems(this.receipe.ingredients);
  }

  onDeleteReceipe() {
    this.receipeService.removeReceipe(this.index);
    this.navCtrl.popToRoot();
  }





}
