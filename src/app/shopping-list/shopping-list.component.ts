import { ShoppingListService } from './../services/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private mySub: Subscription = new Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

  ingredients!: Ingredient[] ;

  ngOnInit() {
    this.ingredients = this.shoppingListService.getItems();
    this.mySub = this.shoppingListService.ingredientsChange.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number) {
    this.shoppingListService.startEdit.next(index)
  }
  
  ngOnDestroy(): void {
      this.mySub.unsubscribe();
    }
} 
