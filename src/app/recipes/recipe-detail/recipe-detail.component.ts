import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  id: number | undefined;
  
  constructor(private shoppingListService:ShoppingListService,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id)
      }
    )
  }

  toShoppingList(recipe:Recipe){
    this.shoppingListService.addIngredientToShoppingList(recipe.ingredients!)
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id!);
    this.router.navigate(['recipes'])
  }
}
