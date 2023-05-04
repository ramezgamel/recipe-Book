import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { PlaceHolderDirective } from '../shared/place-holder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private _authService: AuthService, 
              private _router:Router, 
              private cmpFactoryResolver: ComponentFactoryResolver){}

  isLoginMode = true;
  isLoading = false;
  error:string = '' ;
  @ViewChild(PlaceHolderDirective) hostView: PlaceHolderDirective | undefined;

  closeSub: Subscription | undefined;
  
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  
  onSubmit(form: NgForm){
    let authObs: Observable<AuthResponseData>;

    if(!form.valid){
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode){
      authObs = this._authService.login(form.value.email, form.value.password)
    }
    else {
      authObs = this._authService.signUp(form.value.email, form.value.password)
    };

    authObs.subscribe(
      res => {
        this.isLoading = false;
        this._router.navigate(['/recipes'])
      },
      errorMessage => {
        this.error = errorMessage;
        this.ShowErrorAlert(errorMessage)
        this.isLoading = false;
      }
    );


    form.reset();
  }

  onHandleError(){
    this.error = null!
  }

  private ShowErrorAlert(message: string){
    const cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewCmp = this.hostView?.viewContainerRef;
    const cmpRef = hostViewCmp?.createComponent(cmpFactory);

    cmpRef!.instance.message = message;
    this.closeSub = cmpRef?.instance.close.subscribe(() => {
      this.closeSub!.unsubscribe();
      hostViewCmp?.clear();
    })
  }
}
