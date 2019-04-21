import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    HeaderComponent,
    SidemenuComponent,
} from './components';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidemenuComponent,
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
