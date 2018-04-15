import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
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
  statusError = catchError(err => of(err));
  statusSwitch = switchMap((resp: HttpResponse<Object>) => of(resp.status));

  constructor() { }
}
