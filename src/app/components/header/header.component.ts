import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  role: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');

    this.isLogin = !!token; // có token => đã login
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.isLogin = false;
    this.router.navigate(['/login']);
  }
}
