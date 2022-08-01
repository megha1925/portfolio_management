import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AssetSaleResponse } from 'src/app/model/assetSaleResponse';
import { AllMutualFund } from 'src/app/model/availablemutualfund';
import { AllStock } from 'src/app/model/availablestock';
import { MutualFund } from 'src/app/model/mutualfund';
import { Portfolio } from 'src/app/model/portfolio';
import { SaleAsset } from 'src/app/model/saleasset';
import { StockDetail } from 'src/app/model/stockdetail';
import { CalculatenetworthserviceService } from 'src/app/services/calcNetworth/calculatenetworthservice.service';
import { LoginService } from 'src/app/services/login/login.service';
import { MutualfundserviceService } from 'src/app/services/mutualFund/mutualfundservice.service';
import { StockserviceService } from 'src/app/services/stock/stockservice.service';

@Component({
  selector: 'app-sell-asset',
  templateUrl: './sell-asset.component.html',
  styleUrls: ['./sell-asset.component.scss'],
})
export class SellAssetComponent implements OnInit {
  // //============== sell Stocks ============================
  // @Output() addEvent = new EventEmitter();
  // @Output() removeEvent = new EventEmitter();
  // @Input() stock: StockDetail = {
  //   stId: 0,
  //   stockName: '',
  //   stockCount: 10,
  //   currentPrice: 0,
  // };
  // salesStock: SaleAsset = { assetName: '', soldUnits: 0 };
  // assetSelected: boolean = false;
  // @Input() indexStock: number = 0;

  // doOperationStock() {
  //   this.assetSelected = !this.assetSelected;
  //   if (this.assetSelected == true) {
  //     this.salesStock.assetName = this.stock.stockName;
  //     this.addEvent.emit(this.salesStock);
  //   } else {
  //     this.salesStock.soldUnits = 0;
  //     this.removeEvent.emit(this.salesStock.assetName);
  //   }
  // }
  // //========================================================

  // //============= sell mutual ===============================
  // @Input() mutual: MutualFund = {
  //   mfId: 0,
  //   mutualFundName: '',
  //   mutualFundUnits: 0,
  //   currentPrice: 0,
  // };
  // salesMutual: SaleAsset = { assetName: '', soldUnits: 0 };
  // @Input() indexMutual: number = 0;
  // assetSelectedMutual: boolean = false;

  // doOperationMutual() {
  //   this.assetSelected = !this.assetSelected;
  //   if (this.assetSelected == true) {
  //     this.salesMutual.assetName = this.mutual.mutualFundName;
  //     this.addEvent.emit(this.salesMutual);
  //   } else {
  //     this.salesMutual.soldUnits = 0;
  //     this.removeEvent.emit(this.salesMutual.assetName);
  //   }
  // }

  // //============================================================

  sell: boolean = false;
  message: string = '';
  saleAsset: SaleAsset[] = [];
  panelOpenState = false;
  token: string | null = '';
  mutualFundl: MutualFund[] = [];
  stockDetailList1: StockDetail[] = [];
  assetSaleResponse: AssetSaleResponse = {
    saleStatus: false,
    networth: 0,
    map: new Map(),
  };
  portfolioResponse: Portfolio = {
    portfolioid: 0,
    stockDetailList: [],
    mutualFundList: [],
  };
  currentMfPrice: AllMutualFund = {
    mutualFundId: 0,
    mutualFundName: '',
    mutualFundValue: 0,
  };
  currentStockPrice: AllStock = { stockId: 0, stockName: '', stockValue: 0 };

  constructor(
    private router: Router,
    private calculatedNetService: CalculatenetworthserviceService,
    private loginService: LoginService,
    private mfservice: MutualfundserviceService,
    private sdService: StockserviceService
  ) {}

  ngOnInit(): void {
    if (!this.loginService.checkToken()) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
    this.getAsset();
  }

  sellAsset() {
    this.token = this.loginService.getToken();
    if (this.token != null) {
      this.calculatedNetService.sellAsset(this.saleAsset).subscribe(
        (data: AssetSaleResponse) => {
          console.log(data);
          this.assetSaleResponse = data;

          console.log(this.assetSaleResponse.networth);
          console.log(this.assetSaleResponse.map);
          console.log(this.assetSaleResponse.saleStatus);
          this.sell = true;
          this.getAsset();
          this.removeAll();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  getAsset() {
    this.calculatedNetService.getAsset().subscribe(
      (data: Portfolio) => {
        console.log(data);
        this.portfolioResponse = data;
        this.updateStockDetailList();
        this.updateMutualFundList();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  add(e: SaleAsset) {
    if (e.soldUnits <= 0) {
      alert("You can't sell 0 units");
    }
    this.saleAsset.push(e);
  }
  remove(e: string) {
    this.saleAsset.splice(this.getIndexByname(e), 1);
  }
  getIndexByname(name: string) {
    for (let i = 0; i < this.saleAsset.length; i++) {
      if (this.saleAsset[i].assetName.match(name)) {
        return i;
      }
    }
    return -1;
  }

  removeAll() {
    this.saleAsset.splice(0);
  }

  updateMutualFundList() {
    this.mutualFundl = this.portfolioResponse.mutualFundList;
    for (let i = 0; i < this.mutualFundl.length; i++) {
      this.currentMfPrice = {
        mutualFundId: 0,
        mutualFundName: '',
        mutualFundValue: 0,
      };
      this.token = this.loginService.getToken();
      if (this.token != null) {
        this.mfservice
          .getCurrentMutualFund(this.mutualFundl[i].mutualFundName)
          .subscribe(
            (data: AllMutualFund) => {
              console.log(data);
              if (
                this.mutualFundl[i].mutualFundName.match(data.mutualFundName)
              ) {
                this.mutualFundl[i].currentPrice = data.mutualFundValue;
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
      }
    }
  }

  updateStockDetailList() {
    this.stockDetailList1 = this.portfolioResponse.stockDetailList;
    for (let i = 0; i < this.stockDetailList1.length; i++) {
      this.currentStockPrice = { stockId: 0, stockName: '', stockValue: 0 };
      this.token = this.loginService.getToken();
      if (this.token != null) {
        this.sdService
          .getStockDetails(this.stockDetailList1[i].stockName)
          .subscribe(
            (data: AllStock) => {
              console.log(data);
              if (this.stockDetailList1[i].stockName.match(data.stockName)) {
                this.stockDetailList1[i].currentPrice = data.stockValue;
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
      }
    }
  }
}
