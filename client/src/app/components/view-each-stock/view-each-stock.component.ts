import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SaleAsset } from 'src/app/model/saleasset';
import { StockDetail } from 'src/app/model/stockdetail';

@Component({
  selector: 'app-view-each-stock',
  templateUrl: './view-each-stock.component.html',
  styleUrls: ['./view-each-stock.component.scss']
})
export class ViewEachStockComponent implements OnInit {

  @Output() addEvent=new EventEmitter()
  @Output() removeEvent=new EventEmitter()
  @Input() stock:StockDetail={stId:0,stockName:"",stockCount:10,currentPrice:0}
  //
  sales:SaleAsset={assetName:"",soldUnits:0}
  assetSelected:boolean=false
  @Input() index:number=0
  

  constructor() { }

  ngOnInit(): void {
  }

  doOperation(){
    this.assetSelected=!this.assetSelected
    if(this.assetSelected==true){
      this.sales.assetName=this.stock.stockName
      this.addEvent.emit(this.sales)
    }else{
      this.sales.soldUnits=0
      this.removeEvent.emit(this.sales.assetName)
    }
  }
}
