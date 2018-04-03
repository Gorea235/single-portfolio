import { Component } from '@angular/core';
import { GalleryModel } from '../../../models/gallery-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  galleryList: GalleryModel[];

  onGalleryListUpdate(event: GalleryModel[]) {
    this.galleryList = event;
  }
}
