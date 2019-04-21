import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
    LoginComponent,
    AttendanceListComponent,
} from './components';


const MAINMENU_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent }, 
    { path: 'attendanceList', component: AttendanceListComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(MAINMENU_ROUTES, { enableTracing: false }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
