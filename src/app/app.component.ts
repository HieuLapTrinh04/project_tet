import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Aos from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Project-Tet';
  products: any[] = [];
  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };
  productIdToDelete: number = 0;
  constructor(private http: HttpClient) {}
  ngOnInit() : void{
    Aos.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false, // Lặp lại hiệu ứng khi cuộn
      anchorPlacement: 'top-bottom', // Vị trí kích hoạt
    });
    this.getProducts();

  }
  getProducts() {
    this.http.get('http://localhost:3000/products').subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });

  }
  postProduct() {
    const apiUrl = 'http://localhost:3000/products'; // URL API POST
        this.http.post(apiUrl, this.newProduct, {responseType: 'text'}).subscribe({
      next: (response) => {
        console.log('Sản phẩm đã được tạo:', response);
        this.getProducts(); // Tải lại danh sách sản phẩm sau khi tạo thành công
      }, error :
      (error) => {
        console.error('Lỗi khi tạo sản phẩm:', error);
      }
  });
  }

  deleteProduct() {
    const apiUrl = `http://localhost:3000/products/${this.productIdToDelete}`;
    this.http.delete(apiUrl).subscribe({
      next: (response: any) => {
        console.log('Sản phẩm đã bị xóa:', response);
        this.getProducts(); // Tải lại danh sách sản phẩm sau khi xóa
      },
      error: (error: any) => {
        console.error('Lỗi khi xóa sản phẩm:', error);
      },
    });
  }
  
  
  role = localStorage.getItem('role');


  // register() {
  //   this.http.post('http://localhost:3000/register', {
  //     username: 'testuser',
  //     email: 'test@example.com',
  //     password: 'password123'
  //   }).subscribe(response => console.log(response));
  // }
}