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
  @Input('comp') comp!: string;
  scrollElement!: HTMLElement;
  competition!:string;

  rankings: IRank[] = [];
  private ds: DataService = inject(DataService);
  route:ActivatedRoute = inject(ActivatedRoute);

  constructor() { 


  }

  autoscroll() {

      setInterval(() => {
         // Scroll down by 1000 pixels every 5 second
        this.content.getScrollElement().then(el => {
          this.scrollElement = el;
        });
        if (this.scrollElement.scrollTop >= this.scrollElement.scrollHeight - this.scrollElement.clientHeight) {
          this.content.scrollToTop(2000); // Reset to top when reaching the bottom
        } else {
          this.content.scrollByPoint(0, 785, 2000);
        }

    
        
      }, 10000); // Adjust speed as needed
    
  }

  ngOnInit() {
        this.competition = this.route.snapshot.params['competition'];
    console.log("Competition from route:", this.competition);
    console.log("Competition from input:", this.comp);
    if (this.competition) {
      this.ds.getParticipants(this.competition).subscribe((data) => {
        console.log(data);
        this.rankings = data;
        if (this.rankings.length > 10) {
          this.autoscroll();
        }
      }); 
    } else if (this.comp) {
      this.ds.getParticipants(this.comp).subscribe((data) => {
        console.log(data);
        this.rankings = data;
        if (this.rankings.length > 10) {
          this.autoscroll();
        }
      });
    }  
  }

}
