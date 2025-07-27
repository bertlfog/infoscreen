import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonListHeader, IonLabel, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonImg, IonListHeader, IonLabel]
})
export class RankingPage implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
  }

}
