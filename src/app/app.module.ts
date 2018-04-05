import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// imported modules
import { AppRoutingModule } from './app-routing.module';
import { AppMatsModule } from './app-mats.module';
import { AppPipesModule } from './app-pipes.module';

// services
import { HttpHelperService } from './services/http-helper.service';
import { ImageSelectorService } from './services/image-selector.service';
import { GalleryService } from './services/gallery.service';
import { SearchService } from './services/search.service';
import { ImageHelperService } from './services/image-helper.service';

// components
import { AppComponent } from './components/app/app.component';
import { ContentDisplayComponent } from './components/content-display/content-display.component';
import { ImageScrollComponent } from './components/image-scroll/image-scroll.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

// debug data sources
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { environment } from '../environments/environment';

const imports: any = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
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
    ImageScrollComponent,
    ContactInfoComponent
  ],
  imports: imports,
  providers: [
    HttpHelperService,
    ImageSelectorService,
    GalleryService,
    InMemoryDataService,
    SearchService,
    ImageHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
