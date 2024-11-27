import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalButtonsLayoutComponent } from './horizontal-buttons-layout.component';

describe('HorizontalButtonsLayoutComponent', () => {
  let component: HorizontalButtonsLayoutComponent;
  let fixture: ComponentFixture<HorizontalButtonsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalButtonsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalButtonsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
