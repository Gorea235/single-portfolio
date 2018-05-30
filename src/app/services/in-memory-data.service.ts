import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS, getStatusText } from 'angular-in-memory-web-api';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { ConfigModel } from '../models/config.model';
import { GalleryImageModel } from '../models/gallery-image.model';
import { GalleryModel } from '../models/gallery.model';
import { ImageKindModel } from '../models/image-kind.model';
import { ConfigService } from './config.service';
import { HttpHelperService } from './http-helper.service';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  private adminPassword = 'default';
  private galleryImagesRe = /^api\/galleries\/([0-9]+)\/images(?:\/([0-9]+)?)?$/;

  constructor(
    private cookieService: CookieService,
    private httpHelperService: HttpHelperService
  ) { }

  get(reqInfo: RequestInfo): Observable<any> {
    const imgUrlMatch = reqInfo.url.match(this.galleryImagesRe);
    if (imgUrlMatch)
      return this.getImages(reqInfo, imgUrlMatch);
    switch (reqInfo.collectionName) {
      case 'auth':
        return this.getAuth(reqInfo);
      case 'rng-image':
        return this.getRngImage(reqInfo);
      case 'search':
        return this.getSearch(reqInfo);
      case 'config':
        return this.getConfig(reqInfo);
      default:
        return undefined;
    }
  }

  post(reqInfo: RequestInfo): Observable<any> {
    const imgUrlMatch = reqInfo.url.match(this.galleryImagesRe);
    if (imgUrlMatch)
      return this.createImage(reqInfo, imgUrlMatch);
    switch (reqInfo.collectionName) {
      case 'auth':
        return this.postAuth(reqInfo);
      default:
        return undefined;
    }
  }

  patch(reqInfo: RequestInfo): Observable<any> {
    const imgUrlMatch = reqInfo.url.match(this.galleryImagesRe);
    if (imgUrlMatch)
      return this.updateImage(reqInfo, imgUrlMatch);
    return undefined;
  }

  put(reqInfo: RequestInfo): Observable<any> {
    switch (reqInfo.collectionName) {
      case 'config':
        return this.putConfig(reqInfo);
      default:
        return undefined;
    }
  }

  delete(reqInfo: RequestInfo): Observable<any> {
    const imgUrlMatch = reqInfo.url.match(this.galleryImagesRe);
    if (imgUrlMatch)
      return this.deleteImage(reqInfo, imgUrlMatch);
    return undefined;
  }

  private getAuth(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const config: { key: string, value: string }[] = reqInfo.utils.getDb()['config'];
      let status: number;

      switch (reqInfo.id) {
        case 'check':
          status =
            config[0].value !== '' &&
              this.cookieService.get(this.httpHelperService.cookieLoginToken) === config[0].value ?
              STATUS.OK : STATUS.BAD_REQUEST;
          break;
      }

      return this.finishOptions({
        status: status
      }, reqInfo);
    });
  }

  private postAuth(reqInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const config: { key: string, value: string }[] = reqInfo.utils.getDb()['config'];
      let status: number;

      switch (reqInfo.id) {
        case 'login':
          const reqBody = reqInfo.utils.getJsonBody(reqInfo.req);
          if (reqBody.password && reqBody.password === this.adminPassword) {
            const token = Math.random().toString();
            config[0].value = token;
            reqInfo.headers.set('Cookie', `${this.httpHelperService.cookieLoginToken}=${token}`);
            this.cookieService.set(this.httpHelperService.cookieLoginToken, token);
            status = STATUS.OK;
          } else
            status = STATUS.BAD_REQUEST;
          break;
      }

      return this.finishOptions({
        status: status
      }, reqInfo);
    });
  }

  private selectRandomItem<T>(lst: T[]): T {
    return lst[Math.floor(Math.random() * lst.length)];
  }

  private getRngImage(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const galleries: GalleryModel[] = reqInfo.utils.getDb()['galleries'];
      const body: GalleryImageModel = this.selectRandomItem(this.selectRandomItem(galleries).images);

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private getSearch(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      let body: GalleryModel[] = null;

      if (reqInfo.query.has('term')) {
        const term = reqInfo.query.get('term')[0];
        const re = new RegExp(`.*${term}.*`);
        body = [];
        reqInfo.utils.getDb()['galleries'].forEach((element: GalleryModel) => {
          if (element.name.search(re) >= 0)
            body.push(element);
        });
      }

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: body != null ? STATUS.OK : STATUS.BAD_REQUEST
      }, reqInfo);
    });
  }

  private getImages(reqInfo: RequestInfo, matches: RegExpMatchArray): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const galleries: GalleryModel[] = reqInfo.utils.getDb()['galleries'];

      const images: GalleryImageModel[] = reqInfo.utils.findById(galleries, reqInfo.id).images;
      let body: any = images;
      if (matches[2]) body = reqInfo.utils.findById(images, matches[2]);

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private createImage(reqInfo: RequestInfo, matches: RegExpMatchArray): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const galleries: GalleryModel[] = reqInfo.utils.getDb()['galleries'];
      const images: GalleryImageModel[] = reqInfo.utils.findById(galleries, reqInfo.id).images;

      const id = images[images.length - 1].id + 1;
      const reqBody = reqInfo.utils.getJsonBody(reqInfo.req);
      reqBody.id = id;
      images.push(reqBody);

      return this.finishOptions({
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private updateImage(reqInfo: RequestInfo, matches: RegExpMatchArray): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const galleries: GalleryModel[] = reqInfo.utils.getDb()['galleries'];
      const images: GalleryImageModel[] = reqInfo.utils.findById(galleries, reqInfo.id).images;

      const reqBody = reqInfo.utils.getJsonBody(reqInfo.req);
      images[matches[2]] = reqBody;

      return this.finishOptions({
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private deleteImage(reqInfo: RequestInfo, matches: RegExpMatchArray): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const galleries: GalleryModel[] = reqInfo.utils.getDb()['galleries'];
      const images: GalleryImageModel[] = reqInfo.utils.findById(galleries, reqInfo.id).images;

      const searchId = parseInt(matches[2], 10);
      images.splice(images.findIndex(img => img.id === searchId), 1);

      return this.finishOptions({
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private getConfig(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const config: ConfigModel[] = reqInfo.utils.getDb()['config'];
      let body: ConfigModel;

      config.forEach(element => {
        if (element.key === reqInfo.id)
          body = element;
      });

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private putConfig(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const config: ConfigModel[] = reqInfo.utils.getDb()['config'];

      let updated = false;
      config.forEach(element => {
        if (element.key === reqInfo.id) {
          element.value = reqInfo.utils.getJsonBody(reqInfo.req).value;
          updated = true;
        }
      });

      return this.finishOptions({
        status: updated ? STATUS.OK : STATUS.NOT_FOUND
      }, reqInfo);
    });
  }

  createDb() {
    const imageKinds: ImageKindModel[] = [
      {
        id: 0,
        name: 'Direct URL',
        desc: 'Direct image link'
      },
      {
        id: 1,
        name: 'Imgur ID',
        desc: 'Direct Imgur ID'
      }
    ];

    const categories: CategoryModel[] = [
      {
        id: 1,
        name: 'category0',
        desc: 'first category'
      },
      {
        id: 2,
        name: 'category1',
        desc: 'first category'
      },
      {
        id: 3,
        name: 'category2',
        desc: 'first category'
      },
      {
        id: 4,
        name: 'category3',
        desc: 'first category'
      },
      {
        id: 5,
        name: 'category4',
        desc: 'first category'
      }
    ];

    const galleries: GalleryModel[] = [
      {
        id: 0,
        name: 'gallery test',
        desc: 'testing gallery 1\ndescription\nover\nmultiple\nlines',
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        images: [
          {
            id: 0,
            desc: 'first image\nwith\nmultiline\ndescription',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 0,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[1],
              categories[2]
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'ijUsmYO.jpg',
            galleryId: 0,
            imageKind: imageKinds[1],
            categories: [
              categories[0],
              categories[1]
            ]
          },
          {
            id: 2,
            desc: 'second image',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 0,
            imageKind: imageKinds[0],
            categories: [
              categories[2],
              categories[3]
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'gallery test 2',
        desc: 'testing gallery 2',
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        images: [
          {
            id: 0,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 1,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[2]
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 1,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[4]
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 1,
            imageKind: imageKinds[0],
            categories: [
              categories[1],
              categories[3],
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'gallery test 3',
        desc: '',
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        images: [
          {
            id: 0,
            desc: 'first image gallery 3',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 2,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[1],
              categories[2],
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 2,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[1],
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 2,
            imageKind: imageKinds[0],
            categories: [
              categories[2],
              categories[3]
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'gallery test 4',
        desc: '',
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        images: [
          {
            id: 0,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 3,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[1],
              categories[2]
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 3,
            imageKind: imageKinds[0],
            categories: [
              categories[0],
              categories[1]
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toISOString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 3,
            imageKind: imageKinds[0],
            categories: [
              categories[2],
              categories[3]
            ]
          }
        ]
      }
    ];

    const config: ConfigModel[] = [
      {
        key: 'login_token',
        value: ''
      },
      {
        key: ConfigService.keyPortfolioTitle,
        value: 'test title'
      },
      {
        key: ConfigService.keyContactInfo,
        value: 'line 1\nline 2\nline 3'
      }
    ];

    return {
      galleries,
      config,
      'image-kinds': imageKinds,
      categories
    };
  }

  private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
