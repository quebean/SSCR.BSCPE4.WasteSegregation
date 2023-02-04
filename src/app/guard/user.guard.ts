import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, map } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {

    constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.user$
            .pipe(
                concatMap(profile => {
                    return this.dataService.GetUserBySubjectId(profile?.sub!);
                }),
                map(user => {
                    if (user) {
                        return true;
                    }
                    this.router.navigate(['app','settings']);
                    return false
                })
            )

    }
}