import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lien-he',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './lien-he.component.html',
  styleUrl: './lien-he.component.css'
})
export class LienHeComponent {

  user = {
    name: '',
    phone: '',
  };

  onSubmit() {
    console.log('Form submitted:', this.user);
    alert('Thông tin đã được gửi!');
  }
}
