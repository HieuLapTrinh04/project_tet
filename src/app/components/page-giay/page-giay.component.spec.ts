import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGiayComponent } from './page-giay.component';

describe('PageGiayComponent', () => {
  let component: PageGiayComponent;
  let fixture: ComponentFixture<PageGiayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGiayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGiayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
