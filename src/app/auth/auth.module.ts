import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        HttpClientModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{path:'', component: AuthComponent}])
    ]
})
export class AuthModule {}