import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppMatsModule } from './app-mats.module';
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppPipesModule } from './app-pipes.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMatsModule,
    AppPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
