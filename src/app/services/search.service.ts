import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryModel } from '../models/gallery.model';

@Injectable()
export class SearchService {
  private searchUrl = 'api/search';

  constructor(
    private httpClient: HttpClient
  ) { }

  search(term: string): Observable<GalleryModel[]> {
    return this.httpClient.get<GalleryModel[]>(this.searchUrl, {
      params: new HttpParams()
        .append('term', term)
    });
  }
}
