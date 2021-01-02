import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.modal';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem:Recipe={name:'',description:'',imagePath:'',ingredients:[]}
  @Input() index:number=0;

  constructor() { }  

  ngOnInit(){
  }

  // RecipeClicked(){
  //   this.recipeService.selectedRecipe.emit(this.recipeItem)
  // }

}
