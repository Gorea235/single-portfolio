import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageKindModel } from '../models/image-kind.model';
import { HttpHelperService } from './http-helper.service';

@Injectable()
export class ImageKindService {
  private imageKindUrl = 'api/image-kinds';

  constructor(
    private httpClient: HttpClient,
    private httpHelperService: HttpHelperService
  ) { }

  listImageKinds(): Observable<ImageKindModel[]> {
    return this.httpClient
      .get<ImageKindModel[]>(
        this.imageKindUrl,
        this.httpHelperService.defaultOps
      );
  }
}
