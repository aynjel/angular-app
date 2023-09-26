import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8085/api/auth';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  Login(data:any){
    return this.http.post(`${this.apiUrl}/login`,data);
  }

  Register(data:any){
    return this.http.post(`${this.apiUrl}/register`,data);
  }
  
  Logout(){
    return this.cookieService.delete('token');
  }

  isLoggedIn(){
    return this.cookieService.get('token');
  }

  getUserDetails(){
    // check if the cookie matches the token in the cookie
    // if it matches, return the user details
    // else return null
    return this.http.get(`${this.apiUrl}/user`,{
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.cookieService.get('token')}`
      }
    });
  }
}