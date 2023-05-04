import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private recipeService: RecipesService, private _authService:AuthService) { };
  isAuthentication = false;
  userSub!: Subscription;


  ngOnInit() {
    this.userSub = this._authService.user.subscribe(user => {
      this.isAuthentication = !!user ;
    })

  }

  onSaveData(){
    this.recipeService.storeRecipes().subscribe();
  };

  onFetchData(){
    this.recipeService.fetchRecipes().subscribe();
  };

  onLogout(){
    this._authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
