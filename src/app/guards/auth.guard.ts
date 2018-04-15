import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(switchMap(status => {
      const loggedIn = status === 200;
      if (!loggedIn) this.router.navigate(['/admin/login']);
      return of(loggedIn);
    }));
  }
}
