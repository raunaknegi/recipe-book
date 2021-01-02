import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})

export class AuthComponent{
    loginMode:boolean=true;
    loading:boolean=false;
    error:any=null;
    

    constructor(private authService:AuthService, private route:Router){}

    SwitchMode(){
        this.loginMode=!this.loginMode
    }

    SubmitAuthForm(form:NgForm){
        let email=form.value.email
        let password=form.value.password

        this.loading=true
        if (this.loginMode){
            this.authService.Login(email,password).subscribe(
                (response)=>{
                    this.error=null;
                    this.loading=false;
                    this.route.navigate(['/recipes']);
                },
                (errorResponse)=>{
                    this.error=errorResponse;                    
                    this.loading=false;
                    console.log(errorResponse);
                    
                }
            )
        }else{
            this.authService.signup(email,password).subscribe(
                (response)=>{
                    this.error=null;
                    this.loading=false;
                    this.route.navigate(['/recipes']);
                },
                (errorResponse)=>{
                    this.error=errorResponse
                    this.loading=false;
                    console.log(errorResponse)
                }
            )
        }
    }
    ResetError(){
        this.error=null;
    }
}