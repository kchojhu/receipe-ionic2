import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {ReceipePage} from "../pages/receipe/receipe";
import {ReceipesPage} from "../pages/receipes/receipes";
import {ShoppingsListPage} from "../pages/shoppings-list/shoppings-list";
import {TabsPage} from "../pages/tabs/tabs";
import {ShoppingListService} from "../services/shopping-list.service";
import {ReceipesService} from "../services/receipes.service";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth.service";
import {DatabaseOptionsPage} from "../pages/database-options/database-options";

const entryComponents: any[] = [MyApp, EditRecipePage,
  ReceipePage, ReceipesPage, ShoppingsListPage, TabsPage,
  SigninPage, SignupPage, DatabaseOptionsPage];

@NgModule({
  declarations: entryComponents,
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents,
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService, ReceipesService, AuthService]
})
export class AppModule {
}
