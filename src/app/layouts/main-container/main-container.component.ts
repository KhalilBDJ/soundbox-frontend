import { Component, OnInit } from '@angular/core';
import { BoxComponent } from '../../box/box.component';
import { Sound, SoundService } from '../../service/sound.service';
import { NgForOf } from '@angular/common';
import { AddSoundBoxComponent } from '../../add-sound-box/add-sound-box.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    BoxComponent,
    NgForOf,
    AddSoundBoxComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  sounds: Sound[] = []; // Liste des sons

  constructor(private soundService: SoundService) {}

  ngOnInit(): void {
    this.refreshSounds(); // Charger les sons au démarrage
  }

  refreshSounds(): void {
    this.soundService.getUserSounds().subscribe(
      (data) => {
        console.log('Données des sons après conversion:', data);
        this.sounds = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des sons :', error);
      }
    );
  }

  onSoundAdded(): void {
    console.log('Un son a été ajouté, rafraîchissement des données...');
    this.refreshSounds();
  }
}
