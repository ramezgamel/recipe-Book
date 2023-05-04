import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] | undefined;
  recipeSubscription!: Subscription;
  
  
  constructor(private recipeService:RecipesService) { }
  

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}
