import {Component, OnInit} from '@angular/core';
import {BoxComponent} from '../../box/box.component';
import {Sound, SoundService} from '../../service/sound.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    BoxComponent,
    NgForOf
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent implements OnInit {
  sounds: Sound[] = []; // Liste des sons

  constructor(private soundService: SoundService) {}

  ngOnInit(): void {
    this.soundService.getUserSounds().subscribe(
      (data) => {
        console.log('Données des sons après conversion:', data); //
        this.sounds = data;
      },
      (error) => {
        console.error('Error fetching user sounds:', error);
      }
    );
  }
}
