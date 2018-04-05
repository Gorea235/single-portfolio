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
export class GalleryItemComponent {
  imgSpacing = 5;

  @ViewChild('imgDisplayContainer') imgDisplayContainer: ElementRef;
  @Input() gallery: GalleryModel;

  constructor(
    private router: Router
  ) { }

  onClick(event): void {
    this.router.navigate([`${this.gallery.id}`]);
  }
}
