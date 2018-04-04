import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, getStatusText, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';
import { GalleryModel } from '../models/gallery-model';
import { ConfigModel } from '../models/config-model';
import { ImageKindModel } from '../models/image-kind-model';
import { CategoryModel } from '../models/category-model';
import { GalleryImageModel } from '../models/gallery-image-model';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  get(reqInfo: RequestInfo) {
    switch (reqInfo.collectionName) {
      case 'rng-image':
        return this.getRngImage(reqInfo);
      case 'config':
        return this.getRngImage(reqInfo);
      case 'search':
        return this.getSearch(reqInfo);
      default:
        return undefined;
    }
  }

  private selectRandomItem(lst: any[]): any {
    return lst[Math.floor(Math.random() * lst.length)];
  }

  private getRngImage(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const galleries = reqInfo.utils.getDb()['galleries'];
      const body: GalleryImageModel = this.selectRandomItem(this.selectRandomItem(galleries).images);

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private getConfig(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const config = reqInfo.utils.getDb()['config'];
      let body;
      // tslint:disable-next-line:triple-equals
      if (reqInfo.id == undefined)
        body = config;
      else {
        config.forEach(element => {
          if (reqInfo.id === element.key)
            body = element.value;
        });
      }

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private getSearch(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      let body: GalleryModel[] = null;

      console.log(reqInfo);
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

  createDb() {
    const imageKindDirect: ImageKindModel = {
      id: 0,
      name: 'Direct URL',
      desc: 'Direct image link'
    };

    const imageKindImgur: ImageKindModel = {
      id: 1,
      name: 'Imgur ID',
      desc: 'Direct Imgur ID'
    };

    const categories: CategoryModel[] = [
      {
        id: 0,
        name: 'category0',
        desc: 'first category'
      },
      {
        id: 1,
        name: 'category1',
        desc: 'first category'
      },
      {
        id: 2,
        name: 'category2',
        desc: 'first category'
      },
      {
        id: 3,
        name: 'category3',
        desc: 'first category'
      },
      {
        id: 4,
        name: 'category4',
        desc: 'first category'
      }
    ];

    const galleries: GalleryModel[] = [
      {
        id: 0,
        name: 'gallery test',
        desc: '',
        dateAdded: new Date().toString(),
        dateUpdated: new Date().toString(),
        images: [
          {
            id: 0,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 0,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[1],
              categories[2]
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'ijUsmYO.jpg',
            galleryId: 0,
            imageKind: imageKindImgur,
            categories: [
              categories[0],
              categories[1]
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 0,
            imageKind: imageKindDirect,
            categories: [
              categories[2],
              categories[3]
            ]
          }
        ]
      },
      {
        id: 1,
        desc: '',
        name: 'gallery test 2',
        dateAdded: new Date().toString(),
        dateUpdated: new Date().toString(),
        images: [
          {
            id: 0,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 1,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[2]
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 1,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[4]
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 1,
            imageKind: imageKindDirect,
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
        dateAdded: new Date().toString(),
        dateUpdated: new Date().toString(),
        images: [
          {
            id: 0,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 2,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[1],
              categories[2],
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 2,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[1],
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 2,
            imageKind: imageKindDirect,
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
        dateAdded: new Date().toString(),
        dateUpdated: new Date().toString(),
        images: [
          {
            id: 0,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 3,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[1],
              categories[2]
            ]
          },
          {
            id: 1,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 3,
            imageKind: imageKindDirect,
            categories: [
              categories[0],
              categories[1]
            ]
          },
          {
            id: 2,
            desc: '',
            dateTaken: new Date().toString(),
            imageData: 'https://picsum.photos/300?random?rng=' + Math.random(),
            galleryId: 3,
            imageKind: imageKindDirect,
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
        key: '',
        value: ''
      }
    ];

    return {
      galleries,
      config
    };
  }

  private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
