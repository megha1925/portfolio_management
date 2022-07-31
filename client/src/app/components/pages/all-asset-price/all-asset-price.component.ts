import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllMutualFund } from 'src/app/model/availablemutualfund';
import { AllStock } from 'src/app/model/availablestock';
import { LoginService } from 'src/app/services/login/login.service';
import { MutualfundserviceService } from 'src/app/services/mutualFund/mutualfundservice.service';
import { StockserviceService } from 'src/app/services/stock/stockservice.service';

@Component({
  selector: 'app-all-asset-price',
  templateUrl: './all-asset-price.component.html',
  styleUrls: ['./all-asset-price.component.scss'],
})
export class AllAssetPriceComponent implements OnInit {
  token: string | null = '';
  allMutualFund: AllMutualFund[] = [];
  allStock: AllStock[] = [];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private mfservice: MutualfundserviceService,
    private sdService: StockserviceService
  ) {}

  ngOnInit(): void {
    if (!this.loginService.checkToken()) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
    this.getAllMutualFundDetails();
    this.getAllStockDetail();
  }

  getAllMutualFundDetails() {
    this.token = this.loginService.getToken();
    if (this.token != null) {
      this.mfservice.getAllMutualFund().subscribe(
        (data: AllMutualFund[]) => {
          console.log(data);
          this.allMutualFund = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  getAllStockDetail() {
    this.token = this.loginService.getToken();
    if (this.token != null) {
      this.sdService.getAllStockDetails().subscribe(
        (data: AllStock[]) => {
          console.log(data);
          this.allStock = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
