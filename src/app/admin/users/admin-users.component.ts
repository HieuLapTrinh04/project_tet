import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ⭐ BẮT BUỘC
  styleUrl: './admin-users.component.css',
  template: `
<div class="admin-container">
  <h2>👤 QUẢN LÝ NGƯỜI DÙNG</h2>

  <table class="admin-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Role</th>
        <th>Hành động</th>
      </tr>
    </thead>

    <tbody>
      <tr *ngFor="let u of users">
        <td>{{ u.id }}</td>
        <td>{{ u.username }}</td>
        <td>
          <span
            class="role"
            [ngClass]="{
              admin: u.role === 'admin',
              user: u.role === 'user'
            }"
          >
            {{ u.role }}
          </span>
        </td>
        <td class="actions">
          <button class="btn admin" (click)="setRole(u.id, 'admin')">
            Admin
          </button>
          <button class="btn user" (click)="setRole(u.id, 'user')">
            User
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `
})
export class AdminUsersComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe(data => {
        console.log(data); // debug
        this.users = data;
      });
  }

  setRole(id: number, role: string) {
    this.http.put(`http://localhost:3000/users/${id}/role`, { role })
      .subscribe(() => this.loadUsers());
        location.reload()
  }
}
