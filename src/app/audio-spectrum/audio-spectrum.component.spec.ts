import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioSpectrumComponent } from './audio-spectrum.component';

describe('AudioSpectrumComponent', () => {
  let component: AudioSpectrumComponent;
  let fixture: ComponentFixture<AudioSpectrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioSpectrumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioSpectrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
