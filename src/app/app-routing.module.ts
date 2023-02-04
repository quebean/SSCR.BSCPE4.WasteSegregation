import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserGuard } from './guard/user.guard';
import { RedeemHistoryComponent } from './redeem-history/redeem-history.component';
import { SettingsComponent } from './settings/settings.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  {
    path: "",  redirectTo: 'app/dashboard', pathMatch: 'full'
  },
  {
    path: "app",
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "dashboard", 
        component: DashboardComponent, 
        data: { breadcrumb: "Dashboard" },
        canActivate: [UserGuard]
      },
      {
        path: "transactions", 
        component: TransactionHistoryComponent, 
        data: { breadcrumb: "Transactions" },
        canActivate: [UserGuard]
      },
      {
        path: "redeem-history", 
        component: RedeemHistoryComponent, 
        data: { breadcrumb: "Redeem History" },
        canActivate: [UserGuard]
      },
      {
        path: "settings", 
        component: SettingsComponent, 
        data: { breadcrumb: "Settings" }
      },
      {
        path: "about", 
        component: AboutComponent, 
        data: { breadcrumb: "About" }
      }
    ]
  },
  {
    path: "**",  redirectTo: 'app/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
