import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GalleryModel } from '../../../models/gallery.model';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  @Input() onGalleriesUpdated: EventEmitter<any>;

  galleries: GalleryModel[];

  constructor(
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.updateGalleryList();
    this.onGalleriesUpdated.subscribe(() => this.updateGalleryList());
  }

  updateGalleryList(): void {
    this.galleryService.listGalleries().subscribe(galleries => this.galleries = galleries);
  }

  onSingleGalleryUpdated(): void {
    this.onGalleriesUpdated.emit();
  }
}
