import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

Swiper.use([Pagination, Autoplay, EffectFade]);

@Component({
  selector: 'app-hero',
  imports: [FormsModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  slides = [
    {
      image: 'https://giftsonlineshop.weba.vn/shop/images/giftsonlineshop/slider/bannerso1.jpg',
      title: 'Xuân Đến Rộn Ràng',
      description: 'Khám phá những món quà đặc biệt cho người thân yêu.'
    },
    {
      image: 'https://giftsonlineshop.weba.vn/shop/images/giftsonlineshop/slider/bannerso3.jpg',
      title: 'Khuyến Mãi Hấp Dẫn',
      description: 'Đừng bỏ lỡ ưu đãi lớn dịp năm mới.'
    },
    {
      image: 'https://giftsonlineshop.weba.vn/shop/images/giftsonlineshop/slider/banner2.jpg',
      title: 'Phong Cách Tết',
      description: 'Những sản phẩm mang phong cách hiện đại và truyền thống.'
    }
  ];
  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      loop: true
    });
  }
}
