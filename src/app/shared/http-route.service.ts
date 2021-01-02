import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.modal';
import {map,tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpRoutingService{
    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

    storeRecipes(){
        const recipes=this.recipeService.getRecipes()
        this.http.put('https://ng-recipe-fcbe7-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
            (response)=>{
            }
        )
    }

    fetchRecipes(){
            return this.http.get<Recipe[]>('https://ng-recipe-fcbe7-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map((recipes)=>{
                    return recipes.map(
                        (recipe)=>{
                            return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients:[]};
                        }
                    );
                }),
            tap(
                (recipes)=>{
                    this.recipeService.replaceRecipes(recipes)
                })

            );
    }
}