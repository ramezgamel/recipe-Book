import { Ingredient } from './../shared/ingredient.model';
export class Recipe {
    // public name:string | undefined;
    // public description:string | undefined;
    // public imagePath:string | undefined;
    // public ingredients:Ingredient[] | undefined;

    constructor(public name:string, public description:string, public imagePath:string, public ingredients: Ingredient[]){

        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}