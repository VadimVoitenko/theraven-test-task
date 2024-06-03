import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { IAuthCredentials } from '../interfaces/IAuthCredentials';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { API_ROUTES } from '../../../shared/api/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(user: IAuthCredentials): Observable<IAuthResponse> {
    this.isLoggedIn = true;
    return this.http.post<IAuthResponse>(API_ROUTES.LOGIN, user);
  }

  logout() {
    this.isLoggedIn = false;
    this.localStorageService.clear();
    this.router.navigateByUrl(API_ROUTES.LOGIN);
  }

  isAutenticated(): boolean {
    return this.isLoggedIn;
  }
}
