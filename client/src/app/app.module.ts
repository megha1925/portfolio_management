import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllAssetPriceComponent } from './components/all-asset-price/all-asset-price.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SellAssetComponent } from './components/sell-asset/sell-asset.component';
import { ViewAssetComponent } from './components/view-asset/view-asset.component';
import { ViewEachMutualComponent } from './components/view-each-mutual/view-each-mutual.component';
import { ViewEachStockComponent } from './components/view-each-stock/view-each-stock.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    AllAssetPriceComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SellAssetComponent,
    ViewAssetComponent,
    ViewEachMutualComponent,
    ViewEachStockComponent,
    ErrorComponent,
    ContactUsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
