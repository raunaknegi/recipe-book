import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";


const routes:Routes=[
    {path:'auth',component:AuthComponent}  
]
@NgModule({
    declarations:[
        AuthComponent,
    ],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        AuthService,
        AuthGuard
    ]
})
export class AuthModule{}