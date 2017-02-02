import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ReceipePage} from "../receipe/receipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ReceipesService} from "../../services/receipes.service";
import {Receipe} from "../../models/receipe.model";

@Component({
  selector: 'page-receipes',
  templateUrl: 'receipes.html'
})
export class ReceipesPage {
  receipes: Receipe[];
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private receipesService: ReceipesService
  ) {}

  ionViewWillEnter() {
    this.receipes = this.receipesService.getReceipes();
  }

  onNewReceipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'New'
    });
  }

}
