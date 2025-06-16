import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // API: Lấy danh sách sản phẩm trang 1
  getFashionProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pageFashion`);
  }

  // API: Lấy danh sách sản phẩm trang 2
  getShoesProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pageGiay`);
  }

  // API: Lấy danh sách sản phẩm trang 3
  getGiftProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pageQuaTet`);
  }
}
