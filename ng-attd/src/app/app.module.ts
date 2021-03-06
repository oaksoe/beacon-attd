import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import {
    HeaderComponent,
    SidemenuComponent,
    LoginComponent,
    AttendanceListComponent,
} from './components';

import {
    ConfigService,
    HttpService,
    PubSubService,
    AuthService,
} from './services';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidemenuComponent,
        LoginComponent,
        AttendanceListComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, 
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
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
        ConfigService,
        HttpService,
        PubSubService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
