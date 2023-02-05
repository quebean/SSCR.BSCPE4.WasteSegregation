import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Transaction } from '../models/transaction.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  profile: any;
  user!: any;
  transactions!: Transaction[];

  constructor(
    private authService: AuthService, 
    private dataService: DataService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.authService.user$.subscribe(profile => {
      this.profile = profile?.sub;
      this.dataService.GetUserBySubjectId(this.profile).subscribe(user => {
        this.user = user;
        this.dataService.GetTransactionsByTagId(this.user.tagId).subscribe(transactions => {
          this.transactions = transactions;
        })
      })
    })
  }
}
