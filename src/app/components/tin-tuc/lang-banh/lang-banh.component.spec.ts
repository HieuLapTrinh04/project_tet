import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangBanhComponent } from './lang-banh.component';

describe('LangBanhComponent', () => {
  let component: LangBanhComponent;
  let fixture: ComponentFixture<LangBanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangBanhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangBanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
