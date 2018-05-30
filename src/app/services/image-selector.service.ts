import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryImageModel } from '../models/gallery-image.model';

@Injectable()
export class ImageSelectorService {
  private imageRngUrl = 'api/rng-image';

  constructor(
    private httpClient: HttpClient
  ) { }

  getNextImage(): Observable<GalleryImageModel> {
    return this.httpClient.get<GalleryImageModel>(this.imageRngUrl);
  }
}
