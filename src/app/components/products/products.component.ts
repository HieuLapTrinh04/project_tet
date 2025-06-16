import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Aos from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  totalPrice: number = 0; // Tổng giá trị giỏ hàng
  checkoutMessage: string = ''; // Thông báo khi thanh toán
  title = 'Project-Tet';
  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
  };
  productIdToDelete: number = 0;
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    Aos.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false, // Lặp lại hiệu ứng khi cuộn
      anchorPlacement: 'top-bottom', // Vị trí kích hoạt
    });
    this.getProducts();
    this.getCartItems();
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        console.log('Danh sách sản phẩm trong giỏ hàng:', this.cartItems);
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách giỏ hàng:', error);
      }
    );
  }

  getProducts() {
    this.http.get('http://localhost:3000/products').subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });
  }

  postProduct() {
    const apiUrl = 'http://localhost:3000/products'; // URL API POST
    this.http
      .post(apiUrl, this.newProduct, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Sản phẩm đã được tạo:', response);
          this.getProducts(); // Tải lại danh sách sản phẩm sau khi tạo thành công
        },
        error: (error) => {
          console.error('Lỗi khi tạo sản phẩm:', error);
        },
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

  // Thêm sản phẩm vào giỏ hàng
  addProductToCart() {
    const product = {
      product_id: 1,
      name: 'Áo Thun',
      price: 150000,
      image: 'https://example.com/ao-thun.jpg',
      quantity: 1,
    };

    this.cartService.addToCart(product).subscribe(
      (response) => {
        console.log('Thêm sản phẩm thành công:', response);
        this.ngOnInit(); // Refresh danh sách sản phẩm
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm:', error);
      }
    );
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeProductFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId).subscribe({
      next:
      (response) => {
        console.log('Xóa sản phẩm thành công:', response);
        this.ngOnInit(); // Refresh danh sách sản phẩm
      }, error:
      (error) => {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
   } );
  }

 // Cập nhật số lượng sản phẩm
 updateQuantity(cartItemId: number, event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const quantity = parseInt(inputElement.value, 10);

  if (quantity <= 0) {
    alert('Số lượng phải lớn hơn 0!');
    return;
  }

  this.cartService.updateCartItem(cartItemId, quantity).subscribe({
    next: () => {
      const item = this.cartItems.find((item) => item.id === cartItemId);
      if (item) {
        item.quantity = quantity;
      }
      this.calculateTotalPrice();
    },
    error: (err) => console.error('Lỗi khi cập nhật số lượng:', err),
  });
}

  // Lấy danh sách sản phẩm trong giỏ hàng
  getCartItems(): void {
    this.http.get<any[]>('http://localhost:3000/cart').subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculateTotalPrice(); // Cập nhật tổng tiền
      },
      error: (error) => {
        console.error('Lỗi khi lấy giỏ hàng:', error);
      },
    });
  }

  // Tính tổng giá trị giỏ hàng
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }


  cartItems: any[] = [];

  // Thanh toán
  checkout(): void {
    const cartId = this.cartItems[0].id; 
    const orderData = { cartId: cartId, totalPrice: this.totalPrice };

    console.log('Dữ liệu gửi đến API:', orderData);

    this.http.post('http://localhost:3000/checkout', orderData).subscribe({
        next: (response: any) => {
            console.log('Phản hồi từ API:', response);
            this.checkoutMessage = 'Thanh toán thành công!';
            this.cartItems = []  ;
            this.totalPrice = 0;
        },
        error: (err) => {
            console.error('Lỗi khi thanh toán:', err);
            console.log('Chi tiết lỗi:', err.error);
            this.checkoutMessage = 'Thanh toán thất bại. Vui lòng thử lại!';
        },
    });
}

}
