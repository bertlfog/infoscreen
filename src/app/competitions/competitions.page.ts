import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonList, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ICompetition } from '../model/competition';
import { DataService } from '../services/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.page.html',
  styleUrls: ['./competitions.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonItem, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel]
})
export class CompetitionsPage implements OnInit {
  competitions: ICompetition[] = [];
  private ds: DataService = inject(DataService);
  
  constructor() { 
    this.ds.getCompetitions().subscribe((data)=>{
      console.log(data);
      this.competitions = data;
    })
  }

  ngOnInit() {
  }

}
