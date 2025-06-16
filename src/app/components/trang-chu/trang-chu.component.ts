import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Aos from 'aos';
import { FooterComponent } from '../footer/footer.component';
import { HeroComponent } from '../hero/hero.component';
import { SectionQuatetComponent } from '../section-quatet/section-quatet.component';
import { SetQuaTetComponent } from '../set-qua-tet/set-qua-tet.component';
import { SetGiayTetComponent } from '../set-giay-tet/set-giay-tet.component';
import { ContactComponent } from '../contact/contact.component';
import { PagFashionComponent } from '../pag-fashion/pag-fashion.component';
import { PageGiayComponent } from '../page-giay/page-giay.component';
import { PageQuaTetComponent } from '../page-qua-tet/page-qua-tet.component';
import { HeaderComponent } from '../header/header.component';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-trang-chu',
  imports: [FooterComponent, HeroComponent, SectionQuatetComponent, SetQuaTetComponent, SetGiayTetComponent, ContactComponent, HeaderComponent],
  templateUrl: './trang-chu.component.html',
  styleUrl: './trang-chu.component.css'
})
export class TrangChuComponent {
    ngOnInit() {
      Aos.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: false, // Lặp lại hiệu ứng khi cuộn
        anchorPlacement: 'top-bottom', // Vị trí kích hoạt
      });
      
    }
}
