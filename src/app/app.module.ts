import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// imported modules
import { AppRoutingModule } from './app-routing.module';
import { AppMatsModule } from './app-mats.module';
import { AppPipesModule } from './app-pipes.module';

// services
import { ImageSelectorService } from './services/image-selector.service';

// components
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


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
  providers: [
    ImageSelectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
