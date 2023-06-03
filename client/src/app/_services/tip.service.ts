import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tip } from '../_interfaces/tip';
import { TipCreate } from '../_interfaces/tipCreate';
import { Photo } from '../_interfaces/photo';

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

  public createTip(tipCreate: TipCreate) {
    return this.http.post<Tip>(`${this.baseUrl}/tip`, tipCreate);
  }

  public makeTipsInactive() {
    return this.http.get(`${this.baseUrl}/tip/makeTipsInactive`);
  }

  public createPhoto(formData: FormData) {
    return this.http.post<Photo>(`${this.baseUrl}/file`, formData);
  }
}
