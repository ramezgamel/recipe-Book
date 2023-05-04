import { map, Subject, take, tap, exhaustMap } from 'rxjs';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private _http: HttpClient, private _authService: AuthService){}
  private recipes:Recipe [] = [];
  recipeChanged = new Subject<Recipe[]>();
  
  storeRecipes(){
    return this._http.put(
      'https://recipebook-ff7cf-default-rtdb.firebaseio.com/recipes.json', this.recipes)
  }

  fetchRecipes(){
    return this._authService.user.pipe(take(1), exhaustMap(
      user => {
        return this._http.get<Recipe[]>('https://recipebook-ff7cf-default-rtdb.firebaseio.com/recipes.json');
      }
    ), map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
    }), tap(recipes => {
        this.setRecipes(recipes)
    })
    );

  }

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }


  getRecipes(){
    return this.recipes;
  }
  
  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
  }


  
}

// recipes:Recipe [] = [
//   new Recipe('Test Recipe', 
//   'this a simply test',
//   'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F31%2F16354-easy-meatloaf-mfs-74-1x1-1.jpg',
//   [new Ingredient("Meat", 10),
//   new Ingredient("French Fries", 20)]),
//   new Recipe('second Model', 
//   'second simple test', 
//   'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F31%2F16354-easy-meatloaf-mfs-74-1x1-1.jpg',
//   [new Ingredient("Pasta", 1),
//   new Ingredient("Milk", 2)])
// ];