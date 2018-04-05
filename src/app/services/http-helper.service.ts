import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HttpHelperService {
  cookieLoginToken = 'token';
  defaultOps: {} = {
    withCredentials: true
  };
  respOps: {} = {
    withCredentials: true,
    observe: 'response'
  };
  statusSwitch = switchMap((resp: HttpResponse<Object>) => of(resp.status));

  constructor() { }
}
