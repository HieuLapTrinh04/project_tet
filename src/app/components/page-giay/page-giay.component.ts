import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import Aos from 'aos';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-page-giay',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './page-giay.component.html',
  styleUrl: './page-giay.component.css'
})
export class PageGiayComponent {
productIdToDelete: number = 0;
shoesProducts: any[] = [];

  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
     image: ''
  };
  constructor(private dialog: MatDialog, private productService: ProductService, private http: HttpClient, private router: Router, private cartService: CartService) {}
      ngOnInit() : void{
        Aos.init({
          duration: 1200,
          easing: 'ease-in-out',
          once: false, // Lặp lại hiệu ứng khi cuộn
          anchorPlacement: 'top-bottom', // Vị trí kích hoạt
        });
        this.getProducts();
        this.cartService.getCartItems().subscribe({
          next: (items) => {
            this.cartItems = items;
            console.log('Danh sách sản phẩm trong giỏ hàng:', this.cartItems);
          },
          error: (error) => {
            console.error('Lỗi khi lấy danh sách giỏ hàng:', error);
          },
          complete: () => {
            console.log('Hoàn tất lấy danh sách giỏ hàng.');
          }
        });
        
         // Lấy sản phẩm trang 1
 this.productService.getShoesProducts().subscribe({
  next: (data) => {
    this.shoesProducts = data;
  }, error:
  (error) => {
    console.error('Lỗi khi lấy sản phẩm thời trang:', error);
  }
      });
        }
  getProducts() {
    this.http.get('http://localhost:3000/products').subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });
  }
  openModal(): void {
    this.dialog.open(ModalContentComponent, {
      width: '800px',
      data: { message: 'Hello từ component cha!' } // Truyền data nếu cần
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
        // console.error('Lỗi khi xóa sản phẩm:', error);
        this.getProducts(); // Tải lại danh sách sản phẩm sau khi xóa
      },
    });
  }


  products = [
    {
      id: 1,
      name: 'Sản phẩm 1',
      price: 100000,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      price: 200000,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Sản phẩm 3',
      price: 300000,
      image: 'https://via.placeholder.com/150',
    },
  ];
  cartItems: any[] = [];

// Thêm sản phẩm vào giỏ hàng
addProductToCart(product: any) {
  const cartItem = {
    product_id: product.id, // Sử dụng ID từ product
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1, // Mặc định là 1
  };

  this.cartService.addToCart(cartItem).subscribe({
    next: (response) => {
      console.log('Thêm sản phẩm thành công:', response);
      this.ngOnInit(); // Refresh danh sách sản phẩm
    },
    error: (error) => {
      console.error('Lỗi khi thêm sản phẩm:', error);
    },
    complete: () => {
      console.log('Thêm sản phẩm hoàn tất.');
    },
  });
}

// Xóa sản phẩm khỏi giỏ hàng
removeProductFromCart(cartItemId: number) {
  this.cartService.removeFromCart(cartItemId).subscribe({
    next: (response) => {
      console.log('Xóa sản phẩm thành công:', response);
      this.ngOnInit(); // Refresh danh sách sản phẩm
    },
    error: (error) => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    },
    complete: () => {
      console.log('Xóa sản phẩm hoàn tất.');
    }
});
}

// Cập nhật số lượng sản phẩm
updateQuantity(cartItemId: number, event: Event): void {
  const inputElement = event.target as HTMLInputElement;
const quantity = parseInt(inputElement.value, 10); // Chuyển giá trị sang số nguyên
  this.cartService.updateCartItem(cartItemId, quantity).subscribe({
    next: (response) => {
      console.log('Cập nhật số lượng thành công:', response);
      this.ngOnInit(); // Refresh danh sách sản phẩm
    },
    error: (error) => {
      console.error('Lỗi khi cập nhật số lượng:', error);
    },
    complete: () => {
      console.log('Cập nhật số lượng hoàn tất.');
    }
});
}

}
