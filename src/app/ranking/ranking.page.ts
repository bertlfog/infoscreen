import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonImg, IonListHeader, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { IRank } from '../model/rank';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonButtons, IonImg, IonListHeader, IonLabel]
})
export class RankingPage implements OnInit {
  competition!:string;

  rankings: IRank[] = [];
  private ds: DataService = inject(DataService);
  route:ActivatedRoute = inject(ActivatedRoute);

  constructor() { 
    this.competition = this.route.snapshot.params['competition'];
    this.ds.getParticipants(this.competition).subscribe((data) => {
      console.log(data);
      this.rankings = data;
    });

 
  }

  ngOnInit() {
  }

}
