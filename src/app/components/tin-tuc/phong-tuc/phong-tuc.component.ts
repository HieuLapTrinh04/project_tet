import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phong-tuc',
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './phong-tuc.component.html',
  styleUrl: './phong-tuc.component.css'
})
export class PhongTucComponent {
  newsItems = [
    {
      image: 'assets/images/contact2.webp',
      title: 'Thăm 5 làng gói bánh chưng nổi tiếng miền Bắc',
      description:
        'Những ngày giáp tết này, không khí tại các làng nghề càng trở nên hối hả nhưng có lẽ làng nghề được quan tâm nhiều nhất thời điểm này là các làng nghề gói bánh chưng truyền thống – món ăn không thể thiếu trong phong tục đón Tết Nguyên đán cổ truyền của người dân Việt Nam.',
      seenProfile : '/pageLangBanh'

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
