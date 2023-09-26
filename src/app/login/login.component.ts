import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private toastr: ToastrService, 
    private router: Router, 
    private cookieService: CookieService,
    private http: HttpClient
    ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  OnSubmit():void {
    this.http.post('http://localhost:8085/api/auth/login', this.loginForm?.value, {
      withCredentials: true 
    }).subscribe({
      next: (res: any) => {
        this.cookieService.set('token', res.token);
        this.toastr.success(res.message);
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    })
  }
}
