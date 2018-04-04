import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ImageSelectorService } from '../../services/image-selector.service';
import { ImageHelperService } from '../../services/image-helper.service';

@Component({
  selector: 'app-image-scroll',
  templateUrl: './image-scroll.component.html',
  styleUrls: ['./image-scroll.component.css']
})
export class ImageScrollComponent implements OnInit, OnDestroy {
  minScrollInterval = 5000;
  maxScrollInterval = 20000;

  @Input() size: number;
  @Input() active: boolean;

  imgOnLeft = true;
  imgSrcLeft: string;
  imgSrcRight: string;
  imgOffset = 0;
  scrollTimerId;

  constructor(
    private imageSelectorService: ImageSelectorService,
    private imageHelperService: ImageHelperService
  ) { }

  ngOnInit(): void {
    this.scrollNext();
  }

  ngOnDestroy(): void {
    clearTimeout(this.scrollTimerId);
  }

  startScrollTimer(): void {
    this.scrollTimerId = setTimeout(() => {
      this.scrollNext();
    }, (Math.random() * (this.maxScrollInterval - this.minScrollInterval)) + this.minScrollInterval);
  }

  scrollNext(): void {
    this.imageSelectorService.getNextImage().subscribe(img => {
      const url = this.imageHelperService.getSmallImageUrl(img);
      if (this.imgOnLeft) {
        this.imgSrcRight = url;
      } else {
        this.imgSrcLeft = url;
      }
      console.log(img);
    });
  }

  imgLeftLoad(event): void {
    this.imgOffset = 0;
    this.imgOnLeft = true;
    this.startScrollTimer();
  }

  imgRightLoad(event): void {
    this.imgOffset = -100;
    this.imgOnLeft = false;
    this.startScrollTimer();
  }
}
