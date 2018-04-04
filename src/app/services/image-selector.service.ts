import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageSelectorService {
  private imageRngUrl = 'api/rng-image';

  constructor(
    private httpClient: HttpClient
  ) { }

  getNextImage(): Observable<string> {
    return this.httpClient.get<string>(this.imageRngUrl);
  }
}
