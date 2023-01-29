import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  breadcrumbs$!: Observable<any[]>;

  constructor(private bcService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbs$ = this.bcService.breadcrumbs$;
  }
}
