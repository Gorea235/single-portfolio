import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpHelperService } from './http-helper.service';

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
        this.httpHelperService.statusError,
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
      this.httpHelperService.statusError,
      this.httpHelperService.statusSwitch
    );
  }

  logout(): void {
    this.cookieService.delete(this.httpHelperService.cookieLoginToken);
  }
}
