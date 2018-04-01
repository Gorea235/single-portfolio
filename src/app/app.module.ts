import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMatsModule } from './app-mats.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMatsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
