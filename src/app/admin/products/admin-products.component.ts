import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent {
  products: any[] = [];

  editing = false;
  editId: number | null = null;

  form: any = {
    name: '',
    price: '',
    stock: '',
    image: '',
    description: ''
  };

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  get headers() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  loadProducts() {
    this.http
      .get<any[]>('http://localhost:3000/products')
      .subscribe(data => this.products = data);
  }

  submit() {
    if (this.editing) {
      // UPDATE
      this.http
        .put(
          `http://localhost:3000/products/${this.editId}`,
          this.form,
          this.headers
        )
        .subscribe(() => {
          this.loadProducts();
          this.reset();
        });
    } else {
      // CREATE
      this.http
        .post(
          'http://localhost:3000/products',
          this.form,
          this.headers
        )
        .subscribe(() => {
          this.loadProducts();
          this.reset();
        });
    }
  }

  edit(p: any) {
    this.editing = true;
    this.editId = p.id;
    this.form = { ...p };
  }

  deleteProduct(id: number) {
    if (!confirm('Xóa sản phẩm này?')) return;

    this.http
      .delete(`http://localhost:3000/products/${id}`, this.headers)
      .subscribe(() => this.loadProducts());
  }

  reset() {
    this.editing = false;
    this.editId = null;
    this.form = {
      name: '',
      price: '',
      stock: '',
      image: '',
      description: ''
    };
  }
}
