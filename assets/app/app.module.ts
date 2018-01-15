import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { AppComponent } from "./app.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {routing} from "./app.routing";
import {AuthService} from "./auth/auth.service";
import {ErrorComponent} from "./error/error.component";
import {ErrorService} from "./error/error.service";
import {MessageModule} from "./message/message.module";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        MessageModule,
        routing,
        HttpModule],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}