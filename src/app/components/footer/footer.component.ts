import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  companyInfo = {
    name: 'CÔNG TY TNHH SẢN XUẤT VÀ THƯƠNG MẠI QUÀ XUÂN',
    address:
      '720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh',
    hotline: '0902223209',
    email: 'quaxuannammoi@gmail.com.vn',
    paymentIcons: [
      'assets/images/visa.svg',
      'assets/images/mastercard.svg',
      'assets/images/amex.svg',
      'assets/images/discover.svg',
    ],
  };
  menuWeb = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Giỏ hàng', link: '/cart' },
    { name: 'Thanh toán', link: '/checkout' },
    { name: 'Liên hệ', link: '/contact' },
  ];

  customerSupport = [
    { name: 'Hỗ trợ khách hàng', link: '/support' },
    { name: 'Điều khoản & dịch vụ', link: '/terms' },
    { name: 'Hướng dẫn thanh toán', link: null }, // disabled link
  ];
}
