import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import {ReceipePage} from "../receipe/receipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ReceipesService} from "../../services/receipes.service";
import {Receipe} from "../../models/receipe.model";
import {AuthService} from "../../services/auth.service";
import {DatabaseOptionsPage} from "../database-options/database-options";

@Component({
  selector: 'page-receipes',
  templateUrl: 'receipes.html'
})
export class ReceipesPage {
  receipes: Receipe[];
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private receipesService: ReceipesService,
              private popOverController: PopoverController,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.receipes = this.receipesService.getReceipes();
    console.log(this.receipes);
  }

  onNewReceipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'New'
    });
  }

  onLoadReceipe(receipe: Receipe, index: number) {
    this.navCtrl.push(ReceipePage, {
      receipe: receipe,
      index: index
    });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertController.create({
      title: 'An error occured',
      message: errorMessage,
      buttons:['Ok']
    });
    alert.present();
  }


  onShowOptions(event: MouseEvent) {
    console.log('show options');
    const loading = this.loadingController.create({
      content: 'Pleaset wait...'
    });
    const popover = this.popOverController.create(DatabaseOptionsPage);
    popover.present({
      ev: event
    });

    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }

        if (data.action === 'load') {
          loading.present();
          this.authService.getActiveUser().getToken().then(
            (token:string) => {
              this.receipesService.fetchList(token).subscribe((list:Receipe[]) => {
                console.log('Success!', list);
                if (list) {
                  this.receipes = list;
                } else {
                  this.receipes = [];
                }
                loading.dismiss();
              }), error => {
                console.log('Error!');
                loading.dismiss();
              };
            }
          );
        } else if (data.action === 'store') {
          loading.present();
          this.authService.getActiveUser().getToken().then(
            (token:string) => {
              this.receipesService.storeList(token).subscribe(() => {
                console.log('Success!');
                loading.dismiss();
              }), error => {
                console.log('Error!');
                loading.dismiss();
                this.handleError(error.json().error);
              };
            }
          );
        }

      });
  }
}
