import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChange = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Meat', 5),
    new Ingredient('Tomatoes', 10)
  ];
  
  constructor() { }

  getItems(){
    return this.ingredients.slice()
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  addIngredient(ingredient:Ingredient){
    this.checkIngredient(ingredient)
    console.log("addd" , this.ingredientsChange )

    this.ingredientsChange.next(this.ingredients.slice())
  };

  addIngredientToShoppingList(recipeIngredients: Ingredient[]){

    for (let i = 0; i < recipeIngredients.length; i++) {
      this.checkIngredient(recipeIngredients[i])
    }
    this.ingredientsChange.next(this.ingredients.slice())
  };
  
  checkIngredient(ing:Ingredient){
    let exist = this.ingredients.find(ele => ele.name === ing.name);
    if (exist){
        exist.amount += ing.amount;
      }else {
        this.ingredients.push(ing)
      }
  };

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice())
  }
}
