import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { Redeem } from '../models/redeem.model';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class DataService {

    // apiBaseUrl = 'http://localhost/api';
    apiBaseUrl = 'https://kejatoritestappservice.azurewebsites.net/api';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }
    
    CreateUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/CreateUser`, user);
    }

    GetUserBySubjectId(subjectId: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/GetUserBySubjectId`, {subjectId});
    }

    GetTransactionsByTagId(tagId: string): Observable<Transaction[]> {
        return this.httpClient.post<Transaction[]>(`${this.apiBaseUrl}/transaction/GetTransactionsByTagId`, {tagId});
    }

    CreateRedeem(redeem: Redeem): Observable<Redeem> {
        return this.httpClient.post<Redeem>(`${this.apiBaseUrl}/redeem/CreateRedeem`, redeem);
    }

    GetRedeemsBySubjectId(subjectId: string): Observable<Redeem[]> {
        return this.httpClient.post<Redeem[]>(`${this.apiBaseUrl}/redeem/GetRedeemsBySubjectId`, {subjectId});
    }

    private userSubject = new BehaviorSubject<User|null>(null);
    user$ = this.userSubject.asObservable();

    initUser() {
        this.authService.user$.subscribe(profile => {
            this.GetUserBySubjectId(profile?.sub!).subscribe(user => {
                this.userSubject.next(user);
            })
        })
    }

    getUser(): Observable<any> {
        return this.user$
    }
}