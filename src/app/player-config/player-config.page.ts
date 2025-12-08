import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { IPlayerConfig } from '../model/player-config';

@Component({
  selector: 'app-player-config',
  templateUrl: './player-config.page.html',
  styleUrls: ['./player-config.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerConfigPage implements OnInit {
 ds: DataService = inject(DataService);
 conf: IPlayerConfig | undefined;

  constructor() { 
    this.ds.getPlayerConfig().subscribe((config) => {
      console.log("Current player config:", config[0]);
      if (config[0]) {
        this.conf = config[0];
      }
    });
  } 


  ngOnInit() {
  }

}
