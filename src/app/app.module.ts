import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingService } from './shopping-list/shopping.service';
import { AppRoutingModule } from './approuting.module';

import { RecipeService } from './recipes/recipe.service';
import { HttpRoutingService } from './shared/http-route.service';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthInterceptor } from './auth/auth-intercepter.service';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule
  ],
  providers: [ShoppingService,
              RecipeService,
              HttpRoutingService,
              RecipeResolverService,
            {
              provide:HTTP_INTERCEPTORS,
              useClass:AuthInterceptor,
              multi:true
            }],
  bootstrap: [AppComponent]
})
export class AppModule { }
