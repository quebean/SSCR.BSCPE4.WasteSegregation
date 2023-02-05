import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private dataService: DataService
  ) {
    
  }
  ngOnInit(): void {
    this.dataService.initUser()
  }
  
}