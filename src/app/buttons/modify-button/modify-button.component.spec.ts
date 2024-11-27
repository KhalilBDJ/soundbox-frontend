import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyButtonComponent } from './modify-button.component';

describe('ModifyButtonComponent', () => {
  let component: ModifyButtonComponent;
  let fixture: ComponentFixture<ModifyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
