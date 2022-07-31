import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public loggedIn: boolean = false;
  constructor(private loginService: LoginService,private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();

    if (!this.loginService.checkToken()) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
    
  }
}
