import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { ErrorComponent } from "./error/error.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
    declarations:[
        ErrorComponent,
        SpinnerComponent,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        ErrorComponent,
        SpinnerComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{}