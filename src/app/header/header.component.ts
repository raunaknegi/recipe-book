import { Component,OnDestroy,OnInit,Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpRoutingService } from '../shared/http-route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private httpRoutingService:HttpRoutingService,private authService:AuthService) {}
  collapsed=true;
  userAuthenticated=new Subscription()
  userLoggedIn:boolean=false;


  ngOnInit(): void {
    this.userAuthenticated=this.authService.user.subscribe(
      (user)=>{
        this.userLoggedIn=!!user;
      }
    )
  }

  Logout(){
    this.authService.Logout();
  }


  SaveData(){
    this.httpRoutingService.storeRecipes();
  }

  FetchData(){
    this.httpRoutingService.fetchRecipes().subscribe();
  }
  ngOnDestroy(){
    this.userAuthenticated.unsubscribe();
  }

}
