// home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.email = this.authService.email;
    this.password = this.authService.password;
  }
}
