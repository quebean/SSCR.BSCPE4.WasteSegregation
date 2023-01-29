import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authService: AuthService
  ) {}

  logout() {
    this.authService.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}
