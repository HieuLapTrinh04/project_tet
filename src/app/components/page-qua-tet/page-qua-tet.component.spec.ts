import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageQuaTetComponent } from './page-qua-tet.component';

describe('PageQuaTetComponent', () => {
  let component: PageQuaTetComponent;
  let fixture: ComponentFixture<PageQuaTetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageQuaTetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageQuaTetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
