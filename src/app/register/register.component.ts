import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  hide = true;
  educations = [
    { value: 'High School', viewValue: 'High School' },
    { value: 'Bachelors', viewValue: 'Bachelors' },
    { value: 'Masters', viewValue: 'Masters' },
    { value: 'Doctorate', viewValue: 'Doctorate' },
    { value: 'Diploma', viewValue: 'Diploma' }
  ];

  constructor(public fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  registrationForm = this.fb.group({
    name:[null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')])],
    education: [null, Validators.required],
    dob: [null, Validators.required],
    gender: [null, Validators.required],
    company: [null, Validators.required]
  })

  OnSubmit() {
    this.authService.Register(this.registrationForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.toastr.error(error.message);
      }
    })
  }
}
