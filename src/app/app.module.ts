import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// imported modules
import { AppRoutingModule } from './app-routing.module';
import { AppMatsModule } from './app-mats.module';
import { AppPipesModule } from './app-pipes.module';

// services
import { ImageSelectorService } from './services/image-selector.service';
import { GalleryService } from './services/gallery.service';
import { ConfigService } from './services/config.service';

// components
import { AppComponent } from './components/app/app.component';
import { ContentDisplayComponent } from './components/content-display/content-display.component';
import { ImageScrollComponent } from './components/image-scroll/image-scroll.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// debug data sources
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { environment } from '../environments/environment';

const imports: any = [
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  AppMatsModule,
  AppPipesModule
];

if (!environment.production)
  imports.push(
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ));

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentDisplayComponent,
    ImageScrollComponent
  ],
  imports: imports,
  providers: [
    ImageSelectorService,
    GalleryService,
    ConfigService,
    InMemoryDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
