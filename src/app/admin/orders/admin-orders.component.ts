import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ⭐ BẮT BUỘC
  styleUrl: './admin-orders.component.css',
  template: `
<div class="admin-container">
  <h2>🧾 QUẢN LÝ ĐƠN HÀNG</h2>

  <table class="admin-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Khách hàng</th>
        <th>Tổng tiền</th>
      </tr>
    </thead>

    <tbody>
      <tr *ngFor="let o of orders">
        <td>{{ o.id }}</td>
        <td class="user">{{ o.user }}</td>
        <td class="total">
          {{ o.total | number }} đ
        </td>
      </tr>
    </tbody>
  </table>
</div>

  `
})
export class AdminOrdersComponent {
  orders: any[] = [];

  constructor(private http: HttpClient) {
  const token = localStorage.getItem('token');

  this.http.get<any[]>(
    'http://localhost:3000/orders',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).subscribe({
    next: data => {
      console.log('Orders:', data);
      this.orders = data;
    },
    error: err => {
      console.error('Lỗi lấy orders:', err);
    }
  });
}

}
