import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Transaction } from '../models/transaction.model';
import { Redeem } from '../models/redeem.model';

@Injectable({providedIn: 'root'})
export class DataService {

    apiBaseUrl = 'http://localhost/api';

    constructor(private httpClient: HttpClient) { }
    
    CreateUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/CreateUser`, user);
    }

    GetUserBySubjectId(subjectId: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/GetUserBySubjectId`, {subjectId});
    }

    GetTransactionsByTagId(tagId: string): Observable<Transaction> {
        return this.httpClient.post<Transaction>(`${this.apiBaseUrl}/user/GetTransactionsByTagId`, {tagId});
    }

    CreateRedeem(redeem: Redeem): Observable<Redeem> {
        return this.httpClient.post<Redeem>(`${this.apiBaseUrl}/user/CreateRedeem`, redeem);
    }

    GetRedeemsBySubjectId(subjectId: string): Observable<Redeem> {
        return this.httpClient.post<Redeem>(`${this.apiBaseUrl}/user/GetRedeemsBySubjectId`, {subjectId});
    }
}