import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGiayTetComponent } from './set-giay-tet.component';

describe('SetGiayTetComponent', () => {
  let component: SetGiayTetComponent;
  let fixture: ComponentFixture<SetGiayTetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetGiayTetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetGiayTetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
