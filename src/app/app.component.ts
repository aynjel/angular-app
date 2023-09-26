import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:any;

  constructor(private authService:AuthService){
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (res: any) => {
        this.user = res.data;
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
