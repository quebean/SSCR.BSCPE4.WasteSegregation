import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Redeem } from '../models/redeem.model';
import { User } from '../models/user.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-redeem-history',
  templateUrl: './redeem-history.component.html',
  styleUrls: ['./redeem-history.component.scss']
})
export class RedeemHistoryComponent implements OnInit{
  profile: any;
  user!: User;
  redeemForm!: FormGroup;
  redeems: Redeem[] = [];

  constructor(
    private authservice: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.dataService.getUser().subscribe(user => this.user = user);
    this.authservice.user$.subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {
    this.dataService.initUser()
    this.redeemForm = this.formBuilder.group({
        amount: [1, [Validators.required, Validators.min(1), Validators.max(this.user.rewardBalance)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
      })
    this.dataService.GetRedeemsBySubjectId(this.user.subjectId).subscribe(redeems => {
      this.redeems = redeems
    })
  }

  submitForm() {
    this.spinner.show();
    if(this.user && this.redeemForm.valid){
      let newRedeem: Redeem = {
        subjectId: this.profile.sub,
        description: this.redeemForm.value.description,
        amount: this.redeemForm.value.amount
      } 
      this.dataService.CreateRedeem(newRedeem).subscribe((redeem) => {
        this.user.rewardBalance = this.user.rewardBalance - newRedeem.amount;
        this.redeems.unshift(redeem);
        this.spinner.hide();
      })
    }
  }
}
