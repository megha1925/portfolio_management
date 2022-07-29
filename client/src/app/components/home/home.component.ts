import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loggedIn: boolean = false;
  constructor(private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
  }
}
