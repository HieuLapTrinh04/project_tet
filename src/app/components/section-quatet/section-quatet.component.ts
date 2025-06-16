import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-quatet',
  imports: [CommonModule, RouterLink],
  templateUrl: './section-quatet.component.html',
  styleUrls: ['./section-quatet.component.scss'],
})
export class SectionQuatetComponent {
  products = [
    {
      title: 'Set áo dài cách tân nữ Hạ Mai',
      price: '699,000 VNĐ',
      image: 'assets/images/aodai8.webp',
    },
    {
      title: 'Set áo dài cách tân nữ Phương Đào',
      price: '799,000 VNĐ',
      image: 'assets/images/aodai9.webp',
    },
    {
      title: 'Áo dài cách tân bé gái Mộng Điệp',
      price: '449,000 VNĐ',
      image: 'assets/images/aodai11.webp',
    },
    {
      title: 'Áo dài cách tân bé gái Lạc Việt',
      price: '449,000 VNĐ',
      image: 'assets/images/aodai12.webp',
    },
    {
      title: 'Áo dài cách tân bé trai Đăng Khôi',
      price: '349,000 VNĐ',
      image: 'assets/images/aodai13.webp',
    },
    {
      title: 'Áo dài cách tân bé trai Khang Nguyên',
      price: '349,000 VNĐ',
      image: 'assets/images/aodai19.webp',
    },
  ];
}
