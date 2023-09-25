import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8085/api/users';

  constructor(private http:HttpClient) { }

  GetUsers(){
    return this.http.get(`${this.apiUrl}`);
  }

  GetUserById(id:any){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  CreateUser(data:any){
    return this.http.post(`${this.apiUrl}/create`,data);
  }

  UpdateUser(id:any,data:any){
    return this.http.put(`${this.apiUrl}/${id}/update`,data);
  }

  DeleteUser(id:any){
    return this.http.delete(`${this.apiUrl}/${id}/delete`);
  }
}
