import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/model/authResponse';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: '',
  };
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (
      this.credentials.username != '' &&
      this.credentials.password != '' &&
      this.credentials.username != null &&
      this.credentials.password != null
    ) {
      console.log('Have to Submit Form the server');
      //token generated
      this.loginService.generateToken(this.credentials).subscribe(
        (response: AuthResponse) => {
          this.loginService.loginUser(response['jwttoken'], response['user']);
          window.location.href = '/dashboard';
        },
        (error: any) => {
          console.log(error);
          alert('Invalid Credentials');
        }
      );
    } else {
      console.log('Files are empty !!');
      alert('User name or Password missing');
    }
  }
}
