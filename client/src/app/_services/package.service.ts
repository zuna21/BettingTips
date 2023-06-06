import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../_interfaces/package';
import { PackageCreate } from '../_interfaces/packageCreate';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl: string = 'https://localhost:5001/api';
  private packages = new BehaviorSubject<Package[]>([]);
  packages$ = this.packages.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  public setPackages(newPackages: Package[]) {
    this.packages.next(newPackages);
  }

  public getPackagesStore() {
    return this.packages.getValue();
  }

  public getAllPackages() {
    return this.http.get<Package[]>(`${this.baseUrl}/package`);
  }

  public getUserPackages() {
    return this.http.get<Package[]>(`${this.baseUrl}/package/getUserPackages`);
  }

  public getPackageById(id: string) {
    return this.http.get(`${this.baseUrl}/package/${id}`);
  }

  public addNewPackage(packageCreate: PackageCreate) {
    return this.http.post<Package>(`${this.baseUrl}/package`, packageCreate);
  }

  public deletePackage(id: number) {
    return this.http.delete(`${this.baseUrl}/package/${id}`);
  }
}
