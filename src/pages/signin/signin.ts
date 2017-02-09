import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private loadingController: LoadingController,
              private alertController: AlertController
  ) {}

  onSignin(form: NgForm) {
    console.log(form.value);
    const loading = this.loadingController.create({
      content: 'Sigining you in...'
    });
    this.authService.signin(form.value.email, form.value.password).then(data => {
      console.log(data);
      loading.dismiss();
    }).catch(error => {
      console.log(error);
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Signin failed!',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    })
  }

}
