import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[]=[]
  private subscription:any

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(){
    this.ingredients=this.shoppingService.GetIngredients()

    this.subscription=this.shoppingService.ingredientChanged.subscribe(
      (ingredients:Ingredient[]) =>{
        this.ingredients=ingredients
      }
    )
  }

  EditItem(index:number){
    this.shoppingService.ItemEdit.next(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


}
