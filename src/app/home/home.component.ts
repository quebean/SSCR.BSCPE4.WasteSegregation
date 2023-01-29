import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  
  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  ngOnDestroy(): void {
    this.spinner.hide();
  }
}
