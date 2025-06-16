import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',                                  
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  newsItems = [
    {
      image: 'assets/images/contact1.webp',
      title: 'Phong tục đón tết nguyên đán của người Việt Nam',
      description:
        'Dù cùng sinh sống trên lãnh thổ Việt Nam nhưng do khác nhau về đặc điểm khí hậu, văn hóa và con người nên hai miền Bắc - Nam cũng có sự khác biệt nhất định về phong tục tập quán, nhất là vào dịp Tết Nguyên Đán.',
    },
    {
      image: 'assets/images/contact2.webp',
      title: 'Thăm 5 làng gói bánh chưng nổi tiếng miền Bắc',
      description:
        'Những ngày giáp tết này, không khí tại các làng nghề càng trở nên hối hả nhưng có lẽ làng nghề được quan tâm nhiều nhất thời điểm này là các làng nghề gói bánh chưng truyền thống – món ăn không thể thiếu trong phong tục đón Tết Nguyên đán cổ truyền của người dân Việt Nam.',
    },
    {
      image: 'assets/images/contact3.webp',
      title: 'Sự khác biệt giữa tết miền Bắc và tết miền Nam',
      description:
        'Dù cùng sinh sống trên lãnh thổ Việt Nam nhưng do khác nhau về đặc điểm khí hậu, văn hóa và con người nên hai miền Bắc - Nam cũng có sự khác biệt nhất định về phong tục tập quán, nhất là vào dịp Tết Nguyên Đán.',
    },
  ];

  user = {
    name: '',
    phone: '',
  };

  onSubmit() {
    console.log('Form submitted:', this.user);
    alert('Thông tin đã được gửi!');
  }
}
