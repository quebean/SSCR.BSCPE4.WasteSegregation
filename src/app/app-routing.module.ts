import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RedeemHistoryComponent } from './redeem-history/redeem-history.component';
import { SettingsComponent } from './settings/settings.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  {
    path: "",  redirectTo: 'app/dashboard', pathMatch: 'full'
  },
  {
    path: "app",
    children: [
      {
        path: "dashboard", component: DashboardComponent
      },
      {
        path: "transactions", component: TransactionHistoryComponent
      },
      {
        path: "redeem-history", component: RedeemHistoryComponent
      },
      {
        path: "settings", component: SettingsComponent
      },
      {
        path: "about", component: AboutComponent
      }
    ]
  },
  {
    path: "home", component: HomeComponent
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
