import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryModel } from '../../../models/gallery-model';
import { GalleryImageModel } from '../../../models/gallery-image-model';
import { ImageHelperService } from '../../../services/image-helper.service';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnChanges {
  imgSpacing = 5;

  @ViewChild('imgDisplayContainer') imgDisplayContainer: ElementRef;
  @Input() gallery: GalleryModel;

  displayedImages: string[];

  constructor(
    private router: Router,
    private imageHelperService: ImageHelperService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gallery) {
      const imgs = [];
      this.gallery.images.slice(0, 3).forEach(element => {
        imgs.push(this.imageHelperService.getSmallImageUrl(element));
      });
      this.displayedImages = imgs;
    }
  }

  onClick(event): void {
    this.router.navigate([`${this.gallery.id}`]);
  }
}
