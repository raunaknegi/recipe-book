import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector:'app-alert',
    templateUrl:'./error.component.html',
    styleUrls:['./error.component.css']
})
export class ErrorComponent{
    @Input() message:string='';
    @Output() closeErrorComponent=new EventEmitter<void>();

    CloseComponent(){
        this.closeErrorComponent.emit();
    }
}