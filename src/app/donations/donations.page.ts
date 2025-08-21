import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButtons, IonImg, IonItem, IonList } from '@ionic/angular/standalone';
import { IBeerDonation } from '../model/beer-donation';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.page.html',
  styleUrls: ['./donations.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonImg, IonButtons, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DonationsPage implements OnInit {
  @ViewChild('content') content!: IonContent;
  scrollElement!: HTMLElement;
  competition!:string;

  donations: IBeerDonation[] = [];
  private ds: DataService = inject(DataService);
  route:ActivatedRoute = inject(ActivatedRoute);

  constructor() { 

    this.ds.getBeerDonations().subscribe((data) => {
      console.log(data);
      this.donations = data;
      if (this.donations.length > 9) {
        this.autoscroll();
      }
    });
   
  }
    
  autoscroll() {
        this.content.getScrollElement().then(el => {
          this.scrollElement = el;
          });
      setInterval(() => {
         // Scroll down by 1000 pixels every 5 second

          if (this.scrollElement.scrollTop >= this.scrollElement.scrollHeight - this.scrollElement.clientHeight) {
            this.content.scrollToTop(2000); // Reset to top when reaching the bottom
          } else {
            this.content.scrollByPoint(0, 500, 2000);
          }

          // this.content.scrollToTop(0); // Reset to top when reaching the bottom
        
      }, 10000); // Adjust speed as needed
    
  }
  ngOnInit() {
  }

}
