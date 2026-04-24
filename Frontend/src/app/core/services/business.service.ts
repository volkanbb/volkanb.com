import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Business {
  id: number;
  name: string;
  subdomain: string;
  type: string;
}

export interface Product {
  id: number;
  businessId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBusinessBySubdomain(subdomain: string): Observable<Business> {
    return this.http.get<Business>(`${this.apiUrl}/business/by-subdomain/${subdomain}`);
  }

  getProductsByBusinessId(businessId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/business/${businessId}`);
  }
}
