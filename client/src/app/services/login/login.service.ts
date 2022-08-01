import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../../model/authResponse';
import { API_URL } from '../../app.constants';

interface booleanReturn {
  res: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //calling the server to generate token
  generateToken(credentials: any) {
    //token generate
    return this.http.post<AuthResponse>(`${API_URL}/authenticate`, credentials);
  }

  //for login user
  loginUser(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    return true;
  }

  // To check the Login
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //To logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  ok: boolean = true;

  async fetchData(): Promise<boolean> {
    let token = localStorage.getItem('token');

    const value = await fetch(`${API_URL}/authorize`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response.json())
      .then((data) => {
        this.ok = data;
        return data;
      });

    return value;
  }

  checkToken(): boolean {
    this.fetchData();
    return this.ok;
  }
}
