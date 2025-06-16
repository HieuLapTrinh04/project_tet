import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  loginError: string = "";
    constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:3000/login', this.loginData).subscribe({
      next: (response: any) => {
        // Kiểm tra xem phản hồi có token hay không
        if (response && response.token) {
          console.log('Đăng nhập thành công:', response);
          alert(response.message || 'Đăng nhập thành công!');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
          this.loginError = ''; // Xóa thông báo lỗi nếu có
        } else {
          // Trường hợp không nhận được token (xử lý bất thường)
          console.error('Lỗi không mong đợi:', response);
          this.loginError = 'Đã xảy ra lỗi, vui lòng thử lại.';
        }
      },
      error: (error) => {
        // Xử lý lỗi trả về từ backend
        this.loginError = error.error.message || 'Thông tin đăng nhập không chính xác!';
        console.error('Lỗi khi đăng nhập:', error);
      },
    });
  }
}
