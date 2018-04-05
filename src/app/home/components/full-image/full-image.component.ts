import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ImageHelperService } from '../../../services/image-helper.service';
import { GalleryImageModel } from '../../../models/gallery-image-model';

@Component({
  selector: 'app-full-image',
  templateUrl: './full-image.component.html',
  styleUrls: ['./full-image.component.css']
})
export class FullImageComponent implements OnChanges {
  @Input() image: GalleryImageModel;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  imageSrc;
  show = false;

  constructor(
    private imageHelperService: ImageHelperService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.image)
      this.imageSrc = this.imageHelperService.getFullImageUrl(this.image);
  }

  imgLoad(event): void {
    this.show = true;
  }

  closeImg(event): void {
    this.onClose.emit(0);
  }
}
