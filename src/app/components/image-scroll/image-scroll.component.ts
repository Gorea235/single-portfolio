import { Component, Input, OnInit, OnDestroy, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ImageSelectorService } from '../../services/image-selector.service';
import { ImageHelperService } from '../../services/image-helper.service';
import { GalleryImageModel } from '../../models/gallery-image.model';

@Component({
  selector: 'app-image-scroll',
  templateUrl: './image-scroll.component.html',
  styleUrls: ['./image-scroll.component.css']
})
export class ImageScrollComponent implements OnInit, OnChanges, OnDestroy {
  minScrollInterval = 5000;
  maxScrollInterval = 20000;

  @Input() size: number;
  @Input() active: boolean;

  imgOnLeft = true;
  imgLeft: GalleryImageModel;
  imgSrcLeft: string;
  imgRight: GalleryImageModel;
  imgSrcRight: string;
  imgOffset = 0;
  scrollTimerId;

  constructor(
    private imageSelectorService: ImageSelectorService,
    private imageHelperService: ImageHelperService
  ) { }

  ngOnInit(): void {
    if (this.active)
      this.scrollNext();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.active) {
      if (this.active) {
        if (this.imgOnLeft && !this.imgSrcLeft)
          this.scrollNext(); // immediate scroll if we didn't start
        else
          this.startScrollTimer(); // continue scroll timer otherwise
      } else {
        this.clearScrollTimer();
      }
    }
  }

  ngOnDestroy(): void {
    this.clearScrollTimer();
  }

  startScrollTimer(): void {
    this.scrollTimerId = setTimeout(() => {
      this.scrollNext();
    }, (Math.random() * (this.maxScrollInterval - this.minScrollInterval)) + this.minScrollInterval);
  }

  clearScrollTimer(): void {
    clearTimeout(this.scrollTimerId);
  }

  scrollNext(): void {
    this.imageSelectorService.getNextImage().subscribe(img => {
      const url = this.imageHelperService.getSmallImageUrl(img);
      if (this.imgOnLeft) {
        this.imgRight = img;
        this.imgSrcRight = url;
      } else {
        this.imgLeft = img;
        this.imgSrcLeft = url;
      }
    }, err => {
      console.error('unable to fetch image, restarting timer');
      this.startScrollTimer();
    });
  }

  imgLoad(fromLeft, event): void {
    if (fromLeft === this.imgOnLeft) return;
    this.imgOnLeft = !this.imgOnLeft;
    this.startScrollTimer();
  }

  imgError(event): void {
    console.error('failed to load image, restarting timer');
    console.error(event);
    this.startScrollTimer();
  }
}
