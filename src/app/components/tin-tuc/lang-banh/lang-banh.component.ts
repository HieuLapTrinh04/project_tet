import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lang-banh',
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './lang-banh.component.html',
  styleUrl: './lang-banh.component.css'
})
export class LangBanhComponent {
  newsItems = [
    {
      image: 'assets/images/contact1.webp',
      title: 'Phong tục đón tết nguyên đán của người Việt Nam',
      description:
        'Dù cùng sinh sống trên lãnh thổ Việt Nam nhưng do khác nhau về đặc điểm khí hậu, văn hóa và con người nên hai miền Bắc - Nam cũng có sự khác biệt nhất định về phong tục tập quán, nhất là vào dịp Tết Nguyên Đán.',
      seenProfile : '/pagePhongTuc'
    },
    {
      image: 'assets/images/contact3.webp',
      title: 'Sự khác biệt giữa tết miền Bắc và tết miền Nam',
      description:
        'Dù cùng sinh sống trên lãnh thổ Việt Nam nhưng do khác nhau về đặc điểm khí hậu, văn hóa và con người nên hai miền Bắc - Nam cũng có sự khác biệt nhất định về phong tục tập quán, nhất là vào dịp Tết Nguyên Đán.',
        seenProfile : '/pageKhacBiet'
    },
  ];
}
