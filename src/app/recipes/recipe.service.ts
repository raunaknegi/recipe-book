import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingService } from '../shopping-list/shopping.service';
import {Recipe} from './recipe.modal';

@Injectable()
export class RecipeService{
    RecipeChanged=new Subject<Recipe[]>()
    // private recipes:Recipe[]=[
    //     new Recipe('Testing name',
    //                'Testing Description',
    //                'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //                [
    //                     new Ingredient('bread',1),
    //                     new Ingredient('cheese',2)
    //                ]),
    //     new Recipe('Testing name2',
    //                'Testing Description2',
    //                'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //                [
    //                    new Ingredient('hotdog',1),
    //                    new Ingredient('sauce',1)
    //                ])
    //   ]
    private recipes:Recipe[]=[];
    
    constructor(private shoppingService:ShoppingService){}
    
    getRecipes(){
        return this.recipes.slice()
    }

    getRecipeById(id:number){
        return this.recipes[id]
    }

    replaceRecipes(recipes:Recipe[]){
        this.recipes=recipes
        this.RecipeChanged.next(this.recipes.slice())
    }

    AddIngredientsToShopping(ingredients:Ingredient[]){
        this.shoppingService.RecipeIngredients(ingredients)
    }

    UpdateRecipe(index:number,recipe:Recipe){
        this.recipes[index]=recipe
        this.RecipeChanged.next(this.recipes.slice())
    }

    AddRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.RecipeChanged.next(this.recipes.slice())
    }
    
    DeleteRecipe(id:number){
        this.recipes.splice(id,1)
        this.RecipeChanged.next(this.recipes.slice())
    }
}