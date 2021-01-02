import { Subject } from 'rxjs';
import {Ingredient} from '../shared/ingredient.modal';

export class ShoppingService{
    ingredientChanged=new Subject<Ingredient[]>()
    ItemEdit=new Subject<number>()

    ingredients:Ingredient[]=[
        new Ingredient('cherry',101010),
        new Ingredient('banana',10),
        new Ingredient('salt',1)
      ]
    
    GetIngredients(){
        return this.ingredients.slice()
    }

    GetIngredient(index:number){
        return this.ingredients[index]
    }

    AddIngredient(Ingredient:Ingredient){
        this.ingredients.push(Ingredient)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    RecipeIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    UpdateIngredients(newIngredient:Ingredient,index:number){
        this.ingredients[index]=newIngredient
        this.ingredientChanged.next(this.ingredients.slice())
    }

    DeleteIngredients(index:number){
        this.ingredients.splice(index,1)
        this.ingredientChanged.next(this.ingredients.slice())
    }
}
