import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-set-qua-tet',
  imports: [CommonModule],
  templateUrl: './set-qua-tet.component.html',
  styleUrl: './set-qua-tet.component.css'
})
export class SetQuaTetComponent {
  products = [
    {
      image: 'assets/images/setqua1.jpg',
      name: 'Set Quà Tết 2024 - Long Phụng Bộ Kim 8',
      oldPrice: 950000,
      newPrice: 690000
    },
    {
      image: 'assets/images/setqua2.png',
      name: 'Set Quà Tết 2024 - Long Phụng Bộ Kim 7',
      oldPrice: 950000,
      newPrice: 690000
    },
    {
      image: 'assets/images/setqua3.png',
      name: 'Set Quà Tết 2024 - Long Phụng Bộ Kim 6',
      oldPrice: 950000,
      newPrice: 690000
    },
    {
      image: 'assets/images/setqua4.png',
      name: 'Set Quà Tết 2024 - Long Phụng Bộ Kim 5',
      oldPrice: 950000,
      newPrice: 690000
    },
    {
      image: 'assets/images/setqua5.png',
      name: 'Set Quà Tết 2024 - Long Phụng Bộ Kim 4',
      oldPrice: 950000,
      newPrice: 690000
    },
    {
      image: 'assets/images/setqua6.jpg',
      name: 'Set Quà Tết 2024 - Long Phụng Bộ Kim 3',
      oldPrice: 950000,
      newPrice: 690000
    },
  ];
}
