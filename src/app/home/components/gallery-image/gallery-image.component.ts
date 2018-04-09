import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GalleryImageModel } from '../../../models/gallery-image.model';
import { ImageHelperService } from '../../../services/image-helper.service';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css']
})
export class GalleryImageComponent implements OnChanges {
  @Input() image: GalleryImageModel;
  imageSrc: string;
  showImgCloseUp = false;

  constructor(
    private imageHelperService: ImageHelperService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.image)
      this.imageSrc = this.imageHelperService.getMediumUrl(this.image);
  }

  imgClicked(event): void {
    this.showImgCloseUp = true;
  }

  closeUpClosed(event): void {
    this.showImgCloseUp = false;
  }
}
