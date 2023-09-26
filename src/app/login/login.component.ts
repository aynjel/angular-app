import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm?: FormGroup;

  constructor(
    private authService: AuthService, 
    private toastr: ToastrService, 
    private router: Router, 
    private cookieService: CookieService,
    ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
      ])
    });
  }

  OnSubmit():void {
    this.authService.Login(this.loginForm?.value).subscribe({
      next: (res: any) => {
        this.cookieService.set('token', res.token);
        this.toastr.success(res.message);
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (e: any) => {
        this.toastr.error(e.error.message);
        console.log(e);
      }
    })
  }
}
