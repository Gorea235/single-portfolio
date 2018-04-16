import { Component, Input } from '@angular/core';
import { GalleryModel } from '../../../models/gallery.model';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent {
  @Input() gallery: GalleryModel;
}
