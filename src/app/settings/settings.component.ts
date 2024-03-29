import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../models/user.model';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  profile: any;
  user: User | null = null;
  userForm!: FormGroup;
  
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.userForm = this.formBuilder.group({
      tagId: ['', [Validators.required]],
    });
    this.authService.user$.subscribe((profile) => {
      this.profile = profile;
        this.dataService.GetUserBySubjectId(this.profile.sub).subscribe((user) => {
            this.user = user;
        })
      this.spinner.hide();
    })
  }

  logout() {
    this.authService.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }

  submitForm() {
    this.spinner.show();
    if (!this.user && this.userForm.valid) {
      let newUser = {
        subjectId: this.profile.sub,
        tagId: this.userForm.value.tagId.toUpperCase(),
        rewardBalance: 0
      }
      this.dataService.CreateUser(newUser).subscribe((user) => {
        this.user = user;
        this.spinner.hide();
      });
    }
  }
}
