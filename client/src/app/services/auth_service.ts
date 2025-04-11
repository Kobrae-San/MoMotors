import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3002';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor(private http: HttpClient) {}


  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.success && response.data?.access_token) {
            this.storeToken(response.data.access_token);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiry');
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private storeToken(token: string): void {
    localStorage.setItem('access_token', token);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        localStorage.setItem('token_expiry', (payload.exp * 1000).toString());
      }
    } catch (e) {
      console.error('Erreur lors du décodage du token:', e);
    }
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const expiry = localStorage.getItem('token_expiry');
    return expiry ? new Date().getTime() < parseInt(expiry) : false;
  }

  isTokenExpired(): boolean {
    return !this.hasValidToken();
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Erreur lors du décodage du token:', e);
      return null;
    }
  }
}
