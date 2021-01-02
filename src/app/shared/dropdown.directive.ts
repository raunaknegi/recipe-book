import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{

    @HostBinding('class.open') btn_click:boolean=false;    
    
    @HostListener('click') clickOpen() {
        this.btn_click=!this.btn_click
    }
}