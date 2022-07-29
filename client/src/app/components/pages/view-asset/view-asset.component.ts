import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss'],
})
export class ViewAssetComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    if (!this.loginService.checkToken()) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
  }
}
