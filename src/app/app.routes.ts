import { SectionQuatetComponent } from './components/section-quatet/section-quatet.component';
import { Routes } from '@angular/router';
import { SetGiayTetComponent } from './components/set-giay-tet/set-giay-tet.component';
import { SetQuaTetComponent } from './components/set-qua-tet/set-qua-tet.component';
import { PagFashionComponent } from './components/pag-fashion/pag-fashion.component';
import { PageGiayComponent } from './components/page-giay/page-giay.component';
import { PageQuaTetComponent } from './components/page-qua-tet/page-qua-tet.component';
import { TrangChuComponent } from './components/trang-chu/trang-chu.component';
import { TinTucComponent } from './components/tin-tuc/tin-tuc.component';
import { LienHeComponent } from './components/lien-he/lien-he.component';
import { PhongTucComponent } from './components/tin-tuc/phong-tuc/phong-tuc.component';
import { LangBanhComponent } from './components/tin-tuc/lang-banh/lang-banh.component';
import { KhacBietComponent } from './components/tin-tuc/khac-biet/khac-biet.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/products/admin-products.component';
import { AdminUsersComponent } from './admin/users/admin-users.component';
import { AdminOrdersComponent } from './admin/orders/admin-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: TrangChuComponent },
  { path: 'QuanAo', component: SectionQuatetComponent },
  { path: 'Giay', component: SetGiayTetComponent },
  { path: 'SetQua', component: SetQuaTetComponent },
  { path: 'pageFashion', component: PagFashionComponent },
  { path: 'pageGiay', component: PageGiayComponent },
  { path: 'pageQuaTet', component: PageQuaTetComponent },
  { path: 'pageTinTuc', component: TinTucComponent },
  { path: 'pageLienHe', component: LienHeComponent },
  { path: 'pagePhongTuc', component: PhongTucComponent },
  { path: 'pageLangBanh', component: LangBanhComponent },
  { path: 'pageKhacBiet', component: KhacBietComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
{
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'orders', component: AdminOrdersComponent }
    ]
  }
];
