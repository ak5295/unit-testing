import { ComponentAComponent } from './views/componentA/componentA.component';
import { HomeComponent } from './views/home/home.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'a', component: ComponentAComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComponentAComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
