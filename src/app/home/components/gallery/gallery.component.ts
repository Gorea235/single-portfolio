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
  gallery: GalleryModel;

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.galleryService.getGallery(parseInt(params['galleryId'], 10))
        .subscribe(gallery => {
          this.gallery = gallery;
        }, err => {
          const errObj = err.body || err.error;
          console.error(`Error, ${errObj.error}: ${errObj.message}`);
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
    });
  }

  dateFormat(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }
}
