import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, getStatusText, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';
import { GalleryModel } from '../models/gallery-model';
import { ConfigModel } from '../models/config-model';

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

  private getRngImage(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const body = 'https://picsum.photos/300?random?rng=' + Math.random();

      return this.finishOptions({
        body: reqInfo.utils.getConfig().dataEncapsulation ?
          { body } : body,
        status: STATUS.OK
      }, reqInfo);
    });
  }

  private getConfig(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      let body;
      // tslint:disable-next-line:triple-equals
      if (reqInfo.id == undefined)
        body = reqInfo.utils.getDb()['config'];
      else {
        reqInfo.utils.getDb()['config'].forEach(element => {
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
    const galleries: GalleryModel[] = [
      {
        id: 0,
        name: 'gallery test',
        dateAdded: new Date,
        dateUpdated: new Date,
        images: [
          {
            id: 0,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 1,
                name: 'category1'
              },
              {
                id: 2,
                name: 'category2'
              }
            ]
          },
          {
            id: 1,
            dateTaken: new Date,
            imageId: 'ijUsmYO.jpg',
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 1,
                name: 'category1'
              }
            ]
          },
          {
            id: 2,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 2,
                name: 'category2'
              },
              {
                id: 3,
                name: 'category3'
              }
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'gallery test 2',
        dateAdded: new Date,
        dateUpdated: new Date,
        images: [
          {
            id: 0,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 2,
                name: 'category2'
              }
            ]
          },
          {
            id: 1,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 4,
                name: 'category4'
              }
            ]
          },
          {
            id: 2,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 1,
                name: 'category1'
              },
              {
                id: 3,
                name: 'category3'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'gallery test 3',
        dateAdded: new Date,
        dateUpdated: new Date,
        images: [
          {
            id: 0,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 1,
                name: 'category1'
              },
              {
                id: 2,
                name: 'category2'
              }
            ]
          },
          {
            id: 1,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 1,
                name: 'category1'
              }
            ]
          },
          {
            id: 2,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 2,
                name: 'category2'
              },
              {
                id: 3,
                name: 'category3'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'gallery test 4',
        dateAdded: new Date,
        dateUpdated: new Date,
        images: [
          {
            id: 0,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 1,
                name: 'category1'
              },
              {
                id: 2,
                name: 'category2'
              }
            ]
          },
          {
            id: 1,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 0,
                name: 'category0'
              },
              {
                id: 1,
                name: 'category1'
              }
            ]
          },
          {
            id: 2,
            dateTaken: new Date,
            imageId: 'https://picsum.photos/300?random?rng=' + Math.random(),
            categories: [
              {
                id: 2,
                name: 'category2'
              },
              {
                id: 3,
                name: 'category3'
              }
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
