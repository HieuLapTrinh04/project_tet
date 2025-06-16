import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagFashionComponent } from './pag-fashion.component';

describe('PagFashionComponent', () => {
  let component: PagFashionComponent;
  let fixture: ComponentFixture<PagFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagFashionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
