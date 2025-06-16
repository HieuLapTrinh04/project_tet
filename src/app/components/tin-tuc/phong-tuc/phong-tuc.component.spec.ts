import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongTucComponent } from './phong-tuc.component';

describe('PhongTucComponent', () => {
  let component: PhongTucComponent;
  let fixture: ComponentFixture<PhongTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhongTucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhongTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
