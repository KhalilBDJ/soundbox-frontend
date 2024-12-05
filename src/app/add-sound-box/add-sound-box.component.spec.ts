import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoundBoxComponent } from './add-sound-box.component';

describe('AddSoundBoxComponent', () => {
  let component: AddSoundBoxComponent;
  let fixture: ComponentFixture<AddSoundBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoundBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoundBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
