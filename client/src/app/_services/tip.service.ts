import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tip } from '../_interfaces/tip';

@Injectable({
  providedIn: 'root'
})
export class TipService {
  private baseUrl: string = 'https://localhost:5001/api';

  constructor(
    private http: HttpClient
  ) { }

  public getTipsByPackageId(id: string) {
    return this.http.get<Tip[]>(`${this.baseUrl}/tip/${id}`);
  }

  public getAllActiveTips() {
    return this.http.get<Tip[]>(`${this.baseUrl}/tip`);
  }
}
