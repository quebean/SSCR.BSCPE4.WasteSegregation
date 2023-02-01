import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthModule } from '@auth0/auth0-angular';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AboutComponent } from './about/about.component';
import { RedeemHistoryComponent } from './redeem-history/redeem-history.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    TransactionHistoryComponent,
    AboutComponent,
    RedeemHistoryComponent,
    SettingsComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BreadcrumbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-r4ippv6ku3wmg522.us.auth0.com',
      clientId: 'oyt7LXPJK3CDNpXNLS3tWw77bBLochtI',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
