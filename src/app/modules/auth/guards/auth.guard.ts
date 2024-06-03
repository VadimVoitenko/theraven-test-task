import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { API_ROUTES } from '../../../shared/api/routes';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAutenticated()) {
      return true;
    } else {
      this.router.navigateByUrl(API_ROUTES.LOGIN);
      return false;
    }
  }
}
