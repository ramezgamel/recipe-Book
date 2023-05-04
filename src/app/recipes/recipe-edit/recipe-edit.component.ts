import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators, ɵTypedOrUntyped } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number | undefined;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipesService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm()
      }
    )

  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id!, this.recipeForm.value)
    }else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate(['recipes']);
  }
  
  onCancel(){
    this.router.navigate(['recipes', this.id])
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  getRecipeIngredient(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onDeleteIngredient(index: number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }

  initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredient:any = new FormArray([])
    
    if(this.editMode){
      let recipe = this.recipeService.getRecipe(this.id!);
      
      recipeName = recipe?.name ?? '';
      recipeImgPath = recipe?.imagePath ?? '';
      recipeDescription = recipe?.description ?? '';
      
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredient.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
      
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImgPath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredient
    })


  }


}
