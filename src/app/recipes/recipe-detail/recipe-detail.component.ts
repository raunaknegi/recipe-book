import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recievedRecipe:Recipe={name:'',description:'',imagePath:'',ingredients:[]};

  id:number=0;

  constructor(private recipeService:RecipeService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }
  
  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.id=+params['id']
        this.recievedRecipe=this.recipeService.getRecipeById(this.id)        
      }
    )
  }

  SendIngredients(){
    this.recipeService.AddIngredientsToShopping(this.recievedRecipe.ingredients)
  }

  DeleteRecipe(){
    this.recipeService.DeleteRecipe(this.id)
    this.router.navigate(['/'])
  }

  checkClick(){
    console.log('clicked')
  }

}
