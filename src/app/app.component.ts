import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import firebase from "firebase";
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signInPage = SigninPage;
  signUpPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private menuController: MenuController, private authService: AuthService) {

    firebase.initializeApp({
      apiKey: "AIzaSyDi7t6gWW-cfF960ffxoJoD7CGhahBHbg8",
      authDomain: "ionic2-receipe-book.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }



  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuController.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuController.close();
    this.nav.setRoot(SigninPage);
  }
}
