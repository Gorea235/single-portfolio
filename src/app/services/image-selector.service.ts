import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ImageSelectorService {
  constructor() { }

  getNextImage(): Observable<string> {
    return of('https://picsum.photos/300?random?rng=' + Math.random());
  }
}
