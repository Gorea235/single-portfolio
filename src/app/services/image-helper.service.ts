import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageHelperService {
  private currentSuffix = 'l';
  private imgurUrl = 'https://i.imgur.com';
  private imgIdRe = /^(.*?)(\..+)$/;

  constructor() { }

  private getImageUrl(img: any, suffix: string): string {
    const id = typeof img === 'object' ? img.imageId : img;
    if (!id.startsWith('https://picsum.photos')) {
      const match = id.match(this.imgIdRe);
      return `${this.imgurUrl}/${match[1]}${suffix}${match[2]}`;
    } else {
      return id;
    }
  }

  getFullImageUrl(img: any): string {
    return this.getImageUrl(img, '');
  }

  getSmallImageUrl(img: any): string {
    return this.getImageUrl(img, this.currentSuffix);
  }
}
