import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

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
