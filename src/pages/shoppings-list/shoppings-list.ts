import {Component} from "@angular/core";
import {NavController, NavParams, PopoverController, LoadingController, AlertController} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../models/ingredient";

import {AuthService} from "../../services/auth.service";
import {DatabaseOptionsPage} from "../database-options/database-options";


@Component({
  selector: 'page-shoppings-list',
  templateUrl: 'shoppings-list.html'
})
export class ShoppingsListPage {
  ingredients: Ingredient[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shoppingListService: ShoppingListService,
              private popOverController: PopoverController,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertController.create({
      title: 'An error occured',
      message: errorMessage,
      buttons:['Ok']
    });
    alert.present();
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
              this.shoppingListService.fetchList(token).subscribe((list:Ingredient[]) => {
                console.log('Success!', list);
                if (list) {
                  this.ingredients = list;
                } else {
                  this.ingredients = [];
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
                this.shoppingListService.storeList(token).subscribe(() => {
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
