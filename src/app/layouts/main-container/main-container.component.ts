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
    // Récupérer les sons lors de l'initialisation du composant
    this.soundService.getUserSounds().subscribe(
      (data) => {
        this.sounds = data; // Stocker les sons dans la propriété `sounds`
      },
      (error) => {
        console.error('Error fetching user sounds:', error);
      }
    );
  }
}
