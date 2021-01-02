import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpRoutingService } from '../shared/http-route.service';
import {Injectable} from '@angular/core';
import { RecipeService } from './recipe.service';
import {Recipe} from './recipe.modal';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private httpRoute:HttpRoutingService,private recipeService:RecipeService){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.recipeService.getRecipes()
        if (recipes.length===0){
            return this.httpRoute.fetchRecipes()
        }
        else{
            return recipes            
        }
        
    }
}