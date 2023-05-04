import { Recipe } from './../recipes/recipe.model';
import { Resolve } from "@angular/router";
import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';

@Injectable({providedIn: 'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private recipeService: RecipesService){}
    resolve(){
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.recipeService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}