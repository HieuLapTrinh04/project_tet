import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart'; // URL API của server backend

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm trong giỏ hàng
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: { product_id: number; name: string; price: number; image: string; quantity: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cartItemId}`);
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${cartItemId}`, { quantity });
  }
}
