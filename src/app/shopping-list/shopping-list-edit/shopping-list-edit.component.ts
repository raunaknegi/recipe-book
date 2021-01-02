import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {

  @ViewChild('form') Form:any
  EditSubscription:any
  ItemIndex:number=0;
  EditMode=false;
  EditedItem:Ingredient={name:'',amount:0}
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.EditSubscription=this.shoppingService.ItemEdit.subscribe(
      (index:number)=>{
        this.ItemIndex=index
        this.EditMode=true
        this.EditedItem=this.shoppingService.GetIngredient(this.ItemIndex)
        this.Form.setValue({
          'name':this.EditedItem.name,
          'amount':this.EditedItem.amount
        })
      }
    )
  }
  ClearForm(){
    this.EditMode=false;
    this.Form.resetForm()
  }

  OnDelete(){
    this.ClearForm()
    this.shoppingService.DeleteIngredients(this.ItemIndex)
  }

  submit(form:NgForm){
    const values=form.value
    var ingredient=new Ingredient(values.name,values.amount)
    if(this.EditMode){
      this.shoppingService.UpdateIngredients(ingredient,this.ItemIndex)
    }else{
      this.shoppingService.AddIngredient(ingredient)
    }
    this.ClearForm()
  }

  ngOnDestroy(){
    this.EditSubscription.unsubscribe()
  }

}
