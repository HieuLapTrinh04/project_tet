import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetQuaTetComponent } from './set-qua-tet.component';

describe('SetQuaTetComponent', () => {
  let component: SetQuaTetComponent;
  let fixture: ComponentFixture<SetQuaTetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetQuaTetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetQuaTetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
