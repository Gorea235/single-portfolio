import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GalleryModel } from '../models/gallery-model';
import { GalleryImageModel } from '../models/gallery-image-model';
import { HttpHelperService } from './http-helper.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GalleryService {
  private galleryUrl = 'api/galleries';
  private galleryImageUrl = 'images';

  constructor(
    private httpClient: HttpClient,
    private httpHelperService: HttpHelperService
  ) { }

  // fetching

  /**
   * Fetches the list of galleries.
   * The gallery models *do not* have their image properties populated.
   */
  listGalleries(): Observable<GalleryModel[]> {
    return this.httpClient
      .get<GalleryModel[]>(
        this.galleryUrl,
        this.httpHelperService.defaultOps
      );
  }

  /**
   * Fetches the gallery with the given ID.
   * The image property is populated.
   */
  getGallery(id: number): Observable<GalleryModel> {
    return this.httpClient
      .get<GalleryModel>(
        `${this.galleryUrl}/${id}`,
        this.httpHelperService.defaultOps
      )
      .pipe(switchMap(gallery =>
        this.listImages(gallery).pipe(switchMap(imgs => {
          gallery.images = imgs;
          return of(gallery);
        }))
      ));
  }

  /**
   * Lists all the images in a gallery.
   */
  listImages(gallery: GalleryModel): Observable<GalleryImageModel[]> {
    return this.httpClient
      .get<GalleryImageModel[]>(
        `${this.galleryUrl}/${gallery.id}/${this.galleryImageUrl}`,
        this.httpHelperService.defaultOps
      );
  }

  /**
   * Gets the image with the given ID in a gallery.
   */
  getImage(gallery: GalleryModel, id: number): Observable<GalleryImageModel> {
    return this.httpClient
      .get<GalleryImageModel>(
        `${this.galleryUrl}/${gallery.id}/${this.galleryImageUrl}/${id}`,
        this.httpHelperService.defaultOps
      );
  }

  // creating

  /**
   * Creates a new gallery.
   * @returns Whether the creation was successful or not.
   */
  createGallery(gallery: GalleryModel): Observable<number> {
    return this.httpClient
      .post(
        `${this.galleryUrl}`,
        gallery,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }

  /**
   * Creates a new image within a gallery.
   * @returns Whether the creation was successful or not.
   */
  createImage(gallery: GalleryModel, img: GalleryImageModel): Observable<number> {
    return this.httpClient
      .post(
        `${this.galleryUrl}/${gallery.id}/${this.galleryImageUrl}`,
        img,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }

  // updating

  /**
   * Updates the given gallery with the new data.
   * @returns Whether the update was successful or not.
   */
  updateGallery(gallery: GalleryModel): Observable<number> {
    return this.httpClient
      .patch(
        `${this.galleryUrl}/${gallery.id}`,
        gallery,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }

  /**
   * Updates the given image within the given gallery with the new data.
   * @returns Whether the update was successful or not.
   */
  updateImage(gallery: GalleryModel, img: GalleryImageModel): Observable<number> {
    return this.httpClient
      .patch(
        `${this.galleryUrl}/${gallery.id}/${this.galleryImageUrl}/${img.id}`,
        img,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }

  // deleting

  /**
   * Deletes the given gallery in its entirety.
   * @returns Whether the deletion was successful or not.
   */
  deleteGallery(gallery: GalleryModel): Observable<number> {
    return this.httpClient
      .delete(
        `${this.galleryUrl}/${gallery.id}`,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }

  /**
   * Deletes the given image within the given gallery.
   * @returns Whether the deletion was successful or not.
   */
  deleteImage(gallery: GalleryModel, img: GalleryImageModel): Observable<number> {
    return this.httpClient
      .delete(
        `${this.galleryUrl}/${gallery.id}/${this.galleryImageUrl}/${img.id}`,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }
}
