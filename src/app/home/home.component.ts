import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Angular 11 CRUD with Web API";

  userDetails = {
    email: '',
  };

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.authService.getUserDetails(localStorage.getItem('token')).subscribe({
      next: (res: any) => {
        this.userDetails = res;
      },
      error: (error: any) => {
        this.toastr.error(error.message + ' Please login again');
      }
    })
  }

  OnLogout() {
    this.authService.Logout();
    this.toastr.success('Logout Successfully');
    this.router.navigate(['/login']);
  }

  OnToast() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
