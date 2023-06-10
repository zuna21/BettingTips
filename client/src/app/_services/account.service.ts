import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../_interfaces/userLogin';
import { User } from '../_interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { UserCreate } from '../_interfaces/userCreate';
import { Package } from '../_interfaces/package';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = 'https://localhost:5001/api';
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  setUser(userValue: User) {
    this.user.next(userValue);
  }

  getUser(): User | null {
    return this.user.getValue();
  }

  login(userLogin: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, userLogin);
  }

  register(userCreate: UserCreate) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, userCreate);
  }

  selectNewPackage(newPackage: Package) {
    return this.http.put<User>(`${this.baseUrl}/account/selectNewPackage`, newPackage);
  }

  getUserByToken() {
    return this.http.get<User>(`${this.baseUrl}/account/getUserByToken`);
  }
}
