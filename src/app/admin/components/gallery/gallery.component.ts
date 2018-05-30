import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryModel } from '../../../models/gallery.model';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  error: string;
  galleryId: number;
  gallery: GalleryModel;

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.galleryId = parseInt(params['galleryId'], 10);
      this.fetchGallery();
    });
  }

  fetchGallery(): void {
    this.galleryService.getGallery(this.galleryId)
      .subscribe(gallery => {
        this.gallery = gallery;
      }, err => {
        console.error(`Error, ${err.body.error}: ${err.body.message}`);
        switch (err.status) {
          case 404:
            this.error = 'Gallery was not found';
            break;
          case 500:
            this.error = 'A server error occured while fetching the gallery';
            break;
          default:
            this.error = 'An error occured while fetching the gallery';
            break;
        }
      });
  }

  onGalleryUpdated(): void {
    console.log('updateing gallery');
    this.fetchGallery();
  }
}
