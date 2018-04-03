import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigModel } from '../models/config-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private configUrl = 'api/config';

  constructor(
    private httpClient: HttpClient
  ) { }

  getConfig(key: string): Observable<ConfigModel> {
    return this.httpClient.get<ConfigModel>(`${this.configUrl}/${key}`);
  }

  setConfig(key: string, value: string) {

  }
}
