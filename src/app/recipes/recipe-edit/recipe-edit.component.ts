import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }
  
  recipeForm:FormGroup=new FormGroup({})
  id:number=0;
  isEdit=false;

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.id=+params['id']
        this.isEdit=params['id']!=null
        this.FormInit()
      }
    )
  }

  private FormInit(){
    let name='';
    let path='';
    let description='';
    let ingredients=new FormArray([])

    if(this.isEdit){
      let recipe=this.recipeService.getRecipeById(this.id)
      name=recipe.name
      path=recipe.imagePath
      description=recipe.description
      if (recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }        
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(name,Validators.required),
      'imagePath':new FormControl(path,Validators.required),
      'description':new FormControl(description,Validators.required),
      'ingredients':ingredients
    })
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  DeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  AddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,[Validators.required]),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  OnSubmit(){
    if(this.isEdit){
      this.recipeService.UpdateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeService.AddRecipe(this.recipeForm.value);
    }
    this.HandleRoute()
  }

  HandleRoute(){
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }
}
