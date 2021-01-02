import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from './user.model';

@Injectable()
export class AuthService{
    user=new BehaviorSubject<any>(null);
    autoLogoutTimer:any;

    constructor(private http:HttpClient,private route:Router){}

    signup(email:string,password:string){
        return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPI,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.HandleError),tap(
            response=>{
                this.handleToken(response.email,response.localId,response.idToken,+response.expiresIn)
            }
        ))
    }

    Login(email:string,password:string){
        return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPI,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.HandleError),tap(
            response=>{
                this.handleToken(response.email,response.localId,response.idToken,+response.expiresIn)
            }
        ))
    }

    Logout(){
        this.user.next(null);
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData');
    }

    AutoLogin(){
        let user = JSON.parse(localStorage.getItem('userData')!);
        if (!user){
            return;
        }
        let loadedUser=new UserModel(user.email,user.id,user._token,new Date(user._tokenExpiration))
        if (loadedUser.token){
            this.user.next(loadedUser)
            let time=new Date(user._tokenExpiration).getTime() - new Date().getTime()
            this.AutoLogout(time)
        }        
    }

    AutoLogout(expirationTime:number){
        this.autoLogoutTimer=setTimeout(
            ()=>{
                this.Logout();
            },expirationTime);
    }

    private handleToken(email:string,Userid:string,token:string,expiry:number){
        const expDate=new Date(new Date().getTime()+ expiry*1000)
        const user=new UserModel(            
            email,
            Userid,
            token,
            expDate
        )
        this.user.next(user)
        this.AutoLogout(expiry*1000);
        localStorage.setItem('userData',JSON.stringify(user))

    }

    private HandleError(ErrorResponse:HttpErrorResponse){
        let errorMessage='Error occured';
        if (!ErrorResponse.error || !ErrorResponse.error.error){
            return throwError(errorMessage);
        }

        switch(ErrorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='User with this email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage='Wrong email or password';
                break;
            case 'INVALID_PASSWORD':
                errorMessage='Wrong email or password';
        }
        return throwError(errorMessage)
    }
}