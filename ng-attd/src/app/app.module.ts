import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
} from '@angular/material';

import { AppComponent } from './app.component';

import {
    HeaderComponent,
    SidemenuComponent,
} from './components';

import {
    PubSubService,
} from './services';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidemenuComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, 
        ReactiveFormsModule,
        MatButtonModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        MatSortModule,
        MatMenuModule,
        MatExpansionModule,
    ],
    providers: [
        PubSubService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
