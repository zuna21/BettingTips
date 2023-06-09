import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = 'https://localhost:5001/api';

  public getAllUnsubscriptionUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/user/getAllUnsubscriptionUsers`);
  }

  public approveUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/user/approveUser`, user);
  }

  public checkUserSubscription() {
    return this.http.get<User>(`${this.baseUrl}/user/checkUserSubscription`);
  }
}
