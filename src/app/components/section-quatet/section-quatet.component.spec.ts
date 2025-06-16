import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionQuatetComponent } from './section-quatet.component';

describe('SectionQuatetComponent', () => {
  let component: SectionQuatetComponent;
  let fixture: ComponentFixture<SectionQuatetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionQuatetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionQuatetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
