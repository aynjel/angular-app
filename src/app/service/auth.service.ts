import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8085/api/auth';

  constructor(
    private http:HttpClient, 
    private cookieService: CookieService
    ) {}

  Login(data:any){
    return this.http.post(`${this.apiUrl}/login`, data, {
      withCredentials: true 
    });
  }

  Register(data:any){
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  
  Logout(){
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true 
    });
  }

  isLoggedIn(){
    return this.cookieService.get('token');
  }

  getUserDetails(){
    return this.http.get(`${this.apiUrl}/user`,{
      withCredentials: true
    });
  }
}