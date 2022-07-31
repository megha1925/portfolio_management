import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAssetPriceComponent } from './components/pages/all-asset-price/all-asset-price.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SellAssetComponent } from './components/pages/sell-asset/sell-asset.component';
import { ViewAssetComponent } from './components/pages/view-asset/view-asset.component';
import { AuthGuard } from './services/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactUsComponent,
    pathMatch: 'full',
  },
  {
    path: 'viewasset',
    component: ViewAssetComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'sellasset',
    component: SellAssetComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'currentprice',
    component: AllAssetPriceComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
