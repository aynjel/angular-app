import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8085/api/auth';

  constructor(private http:HttpClient) { }

  Login(data:any){
    return this.http.post(`${this.apiUrl}/login`,data);
  }

  Register(data:any){
    return this.http.post(`${this.apiUrl}/register`,data);
  }
  
  Logout(){
    return localStorage.removeItem('token');
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  getUserDetails(token:any){
    // check if the cookie matches the token
    return this.http.get(`${this.apiUrl}/user`,{
      headers:{
        Authorization:token
      }
    });
  }
}
