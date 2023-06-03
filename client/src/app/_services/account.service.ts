import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../_interfaces/userLogin';
import { User } from '../_interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { UserCreate } from '../_interfaces/userCreate';

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

  setUserToLocalStorage(settingUser: User | null) {
    if (!settingUser) localStorage.removeItem('user');
    else {
      const userToSet = {
        username: settingUser.username,
        email: settingUser.email
      }
      localStorage.setItem('user', JSON.stringify(userToSet));
    }
  }

  login(userLogin: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, userLogin);
  }

  register(userCreate: UserCreate) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, userCreate);
  }
}
