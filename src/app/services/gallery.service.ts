import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GalleryModel } from '../models/gallery-model';
import { GalleryImageModel } from '../models/gallery-image-model';

@Injectable()
export class GalleryService {
  private galleryUrl = 'api/galleries';
  private galleryImageUrl = 'images';

  constructor(
    private httpClient: HttpClient
  ) { }

  listGalleries(): Observable<GalleryModel[]> {
    return this.httpClient.get<GalleryModel[]>(this.galleryUrl);
  }

  getGallery(id: number): Observable<GalleryModel> {
    return this.httpClient.get<GalleryModel>(`${this.galleryUrl}/${id}`);
  }

  listImages(gallery: GalleryModel): Observable<GalleryImageModel[]> {
    return this.httpClient.get<GalleryImageModel[]>(`${this.galleryUrl}/${gallery.id}/${this.galleryImageUrl}`);
  }

  updateGallery(gallery: GalleryModel) {

  }
}
