import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Receipe} from "../../models/receipe.model";
import {EditRecipePage} from "../edit-recipe/edit-recipe";

@Component({
  selector: 'page-receipe',
  templateUrl: 'receipe.html'
})
export class ReceipePage implements OnInit{
  receipe: Receipe;
  index: number;
  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ngOnInit(): void {
    this.receipe = this.navParams.get('receipe');
    this.index = this.navParams.get('index')

  }

  onEditReceipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'Edit',
      receipe: this.receipe,
      index: this.index
    })
  }

}
