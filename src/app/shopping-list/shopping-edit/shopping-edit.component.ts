import { Subscription } from 'rxjs';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm?: NgForm ;
  subscription?: Subscription ;
  editItemIndex?: number ;
  editMode = false;
  editedItem?: Ingredient ;

  constructor(private shoppingListService:ShoppingListService) { }
  

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEdit.subscribe((index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )

  }

  onSubmit(form: NgForm){
    let newIngredient = new Ingredient(form.value.name , form.value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex!, form.value);
    }else {
      console.log("user trigger add")
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset();
  }
  
  onClear(){
    this.shoppingListForm?.reset()
    this.editMode = false;
  }


  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex!);
    this.onClear()
  }


  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
