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
  private allPackages = new BehaviorSubject<Package[]>([]);

  allPackages$ = this.allPackages.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public setAllPackages(allPackages: Package[]) {
    this.allPackages.next(allPackages);
  }

  public getAllPackagesCurrentValue() {
    return this.allPackages.getValue();
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
