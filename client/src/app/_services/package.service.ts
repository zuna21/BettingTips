import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../_interfaces/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl: string = 'https://localhost:5001/api';

  constructor(
    private http: HttpClient
  ) { }

  public getAllPackages() {
    return this.http.get<Package[]>(`${this.baseUrl}/package`);
  }
}
