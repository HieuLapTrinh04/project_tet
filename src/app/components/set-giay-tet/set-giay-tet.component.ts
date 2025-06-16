import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-set-giay-tet',
  imports: [CommonModule],
  templateUrl: './set-giay-tet.component.html',
  styleUrl: './set-giay-tet.component.css'
})
export class SetGiayTetComponent {
  products = [
    {
      image: 'assets/images/giay1.webp',
      name: 'Giày sneakers unisex cổ thấp MLB Chunky Liner',
      oldPrice: 3590000,
      newPrice: 2150000
    },
    {
      image: 'assets/images/giay2.webp',
      name: 'Giày sneakers unisex cổ cao Puma Rebound JOY',
      oldPrice: 2199000,
      newPrice: 929000
    },
    {
      image: 'assets/images/giay3.webp',
      name: 'Giày lười nữ đế thấp mũi tròn Pedro Icon Leather Loafers',
      oldPrice: 2199000,
      newPrice: 1599000
    },
    {
      image: 'assets/images/giay4.webp',
      name: 'Giày sneakers unisex cổ cao Converse Chuck Taylor All Star Classic',
      oldPrice: 1750000,
      newPrice: 1550000
    },
    {
      image: 'assets/images/giay5.webp',
      name: 'Giày boots nữ đế cao Pedro Poppy',
      oldPrice: 2790000,
      newPrice: 1395000
    },
    {
      image: 'assets/images/giay6.webp',
      name: 'Giày mules unisex đế bệt thời trang MLB Playball Origin',
      oldPrice: 1690000,
      newPrice: 500000
    },
  ]
}
