import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../app-injection-tokens';
import { tap } from 'rxjs/operators';
import { Token } from '../models/token';

export const ACCESS_TOKEN_KEY = 'bookclub_acess_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login(name: string, password: string): Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}api/auth/login`, {
      name, password
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    )
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token != null && token != undefined)
      return !this.jwtHelper.isTokenExpired(token);
    else
      return false
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  register(name: string, password: string): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}api/auth/register`, { name, password });
  }
}
