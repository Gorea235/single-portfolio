import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GalleryModel } from '../models/gallery-model';

@Injectable()
export class GalleryService {
  private galleryUrl = 'api/galleries';

  constructor(
    private httpClient: HttpClient
  ) { }

  listGalleries(): Observable<GalleryModel[]> {
    return this.httpClient.get<GalleryModel[]>(this.galleryUrl);
  }

  getGallery(id: number): Observable<GalleryModel> {
    return this.httpClient.get<GalleryModel>(`${this.galleryUrl}/${id}`);
  }

  updateGallery(gallery: GalleryModel) {

  }
}
