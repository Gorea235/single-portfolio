import {
  Component, Input, OnInit, OnDestroy, ViewChild,
  ElementRef
} from '@angular/core';
import { ImageSelectorService } from '../../../services/image-selector.service';

@Component({
  selector: 'app-home-image-scroll',
  templateUrl: './image-scroll.component.html',
  styleUrls: ['./image-scroll.component.css']
})
export class ImageScrollComponent implements OnInit, OnDestroy {
  minScrollInterval = 5000;
  maxScrollInterval = 20000;

  @Input('size') size: number;
  @Input('active') active: boolean;
  imgOnLeft = true;
  imgSrcLeft: string;
  imgSrcRight: string;
  imgOffset = 0;
  scrollTimerId;

  constructor(
    private imageSelectorService: ImageSelectorService
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
      if (this.imgOnLeft) {
        this.imgSrcRight = img;
      } else {
        this.imgSrcLeft = img;
      }
      console.log(img);
    });
  }

  imgLeftLoad(): void {
    this.imgOffset = 0;
    this.imgOnLeft = true;
    this.startScrollTimer();
  }

  imgRightLoad(): void {
    this.imgOffset = -100;
    this.imgOnLeft = false;
    this.startScrollTimer();
  }
}
