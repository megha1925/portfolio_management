import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user: String | null = '';
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    if (!this.loginService.checkToken()) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
    if (localStorage.getItem('user') !== null) {
      let u1 = localStorage.getItem('user')?.charAt(0)?.toUpperCase();
      let u2 = localStorage.getItem('user')?.slice(1);
      if (typeof u1 === 'string' && typeof u2 === 'string') this.user = u1 + u2;
    }
  }
}
