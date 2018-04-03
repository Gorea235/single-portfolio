import { Component, Input } from '@angular/core';
import { GalleryModel } from '../../../models/gallery-model';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent {
  @Input() galleryList: GalleryModel[];
}
