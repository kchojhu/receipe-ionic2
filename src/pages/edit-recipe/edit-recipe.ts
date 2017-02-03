import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, ActionSheetController, AlertController, ToastController} from "ionic-angular";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {ReceipesService} from "../../services/receipes.service";
import {Receipe} from "../../models/receipe.model";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  receipeForm: FormGroup;
  receipe: Receipe;
  index: number;
  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.receipe.title;
      description = this.receipe.description;
      difficulty = this.receipe.difficulty;
      for (let ingredient of this.receipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.receipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    console.log('subbited');
    const value = this.receipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0 ){
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      })
    }

    if (this.mode === 'Edit') {
      console.log('Update Receipe');
      this.receipeService.updateReceipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.receipeService.addReceipe(value.title, value.description, value.difficulty, ingredients);
    }

    this.receipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientsAlert().present();
          }
        },
        {
          text: 'Remove all Ingredient',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray> this.receipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }

              const toast = this.toastController.create({
                message: 'item deleted',
                duration: 1000,
                position: 'top'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  selectOptions = ['Easy', 'Medium', 'Hard'];

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController,
              private toastController: ToastController,
              private receipeService: ReceipesService
  ) {

  }

  private createNewIngredientsAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastController.create({
                message: 'Please enter the name',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }

            (<FormArray> this.receipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastController.create({
              message: 'item added',
              duration: 1000,
              position: 'top'
            });
            toast.present();
          }
        }
      ]
    });

  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.receipe = this.navParams.get('receipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
}
