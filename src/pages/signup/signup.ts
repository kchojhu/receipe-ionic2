import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private loadingController: LoadingController,
              private alertController: AlertController
  ) {}

  onSignup(form: NgForm) {
    const loading = this.loadingController.create({
      content: 'Sigining you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password).then((data) => {
      console.log(data);
      loading.dismiss();
    }).catch(error => {
      console.log(error);
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Signup failed!',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });

  }

}
