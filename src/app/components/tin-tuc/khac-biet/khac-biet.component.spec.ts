import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhacBietComponent } from './khac-biet.component';

describe('KhacBietComponent', () => {
  let component: KhacBietComponent;
  let fixture: ComponentFixture<KhacBietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhacBietComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhacBietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
