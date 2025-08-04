import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('content') content!: IonContent;
  scrollElement!: HTMLElement;
  competition!:string;

  rankings: IRank[] = [];
  private ds: DataService = inject(DataService);
  route:ActivatedRoute = inject(ActivatedRoute);

  constructor() { 
    this.competition = this.route.snapshot.params['competition'];
    this.ds.getParticipants(this.competition).subscribe((data) => {
      console.log(data);
      this.rankings = data;
      if (this.rankings.length > 9) {
        this.autoscroll();
      }
    });
   
  }

  autoscroll() {

    
      setInterval(() => {
        this.content.scrollByPoint(0, 1000, 5000); // Scroll down by 1000 pixels every 5 second
        this.content.getScrollElement().then(el => {
          if (el.scrollTop >= el.scrollHeight - el.clientHeight) 
            this.content.scrollToTop(1000); // Reset to top when reaching the bottom
         
      });
          
        
          // this.content.scrollToTop(0); // Reset to top when reaching the bottom
        
      }, 3000); // Adjust speed as needed
    
  }

  ngOnInit() {
  }

}
