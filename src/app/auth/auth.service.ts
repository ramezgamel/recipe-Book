import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';


export interface AuthResponseData {
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private _http: HttpClient, private _router:Router) { }
    
  // apiKey = 'AIzaSyDUek9dKP7NTk-KsCi9kkUaQL1_-mt2454';
  private _tokenExpirationTimer: any
  user = new BehaviorSubject<User>(null!);

  autoLogin(){
    const userData:{
      email: string,
      id: string,
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  signUp(email:string, password:string){
    return this._http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleErrors),tap(resData => {
        this.handleAuthentication(
          resData.email, 
          resData.localId, 
          resData.idToken, 
          +resData.expiresIn);
      }))
  }
  
  
  login(email:string, password:string){
    return this._http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrors),tap(resData => {
        this.handleAuthentication(
          resData.email, 
          resData.localId, 
          resData.idToken, 
          +resData.expiresIn);
      }))
  };

  logout(){
    this.user.next(null!);
    this._router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this._tokenExpirationTimer){
      clearTimeout(this._tokenExpirationTimer)
    }
    this._tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration)
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }


  private handleAuthentication(email:string, userId:string, idToken:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }


  private handleErrors(errorRes: HttpErrorResponse){
    let errorMessage= 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage)
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_NOT_FOUND': 
          errorMessage = 'Email is not found!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password';
          break;
        case 'USER_DISABLED':
          errorMessage = 'User banned';
          break;
        case 'EMAIL_EXISTS' : 
          errorMessage = 'This email exists!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': 
          errorMessage = 'Too many attempts, Try again later!' ;
          break;
      }
      return throwError(errorMessage);
  }
};
