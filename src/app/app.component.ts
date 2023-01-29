import { Component, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authService: AuthService,
    private modalService: NgbModal) {
  }

  login() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin 
      }
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}