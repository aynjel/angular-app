import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Angular 11 CRUD with Web API";

  userDetails = {
    email: '',
    name: '',
    education: '',
  };

  constructor(
    private toastr: ToastrService, 
    private authService: AuthService, 
    private router: Router,
    private cookieService: CookieService
    ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userDetails = res.data;
        console.log(res);
      },
      error: (error: any) => {
        // this.toastr.error(error.message + ' Please login again');
        console.log(error);
      }
    });
  }

  OnLogout() {
    this.authService.Logout().subscribe({
      next: (res: any) => {
        this.cookieService.delete('token');
        this.toastr.success(res.message);
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    })
  }

  OnToast() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
