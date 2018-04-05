import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelperService } from './http-helper.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private authUrl = 'api/auth';
  private authCheckUrl = `${this.authUrl}/check`;
  private authLoginUrl = `${this.authUrl}/login`;

  constructor(
    private httpClient: HttpClient,
    private httpHelperService: HttpHelperService,
    private cookieService: CookieService
  ) { }

  isLoggedIn(): Observable<number> {
    return this.httpClient
      .get(
        this.authCheckUrl,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusSwitch
      );
  }

  login(password: string): Observable<number> {
    return this.httpClient.post(
      this.authLoginUrl,
      {
        password: password
      },
      this.httpHelperService.respOps
    ).pipe(
      this.httpHelperService.statusSwitch
    );
  }

  logout(): void {
    this.cookieService.delete(this.httpHelperService.cookieLoginToken);
  }
}
