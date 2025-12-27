import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input('onlyTop10') onlyTop10: string = "false";
  scrollElement!: HTMLElement;
  competition!:string;
  headerHeight: number = 50;
  actId: string = ""; 
  rankings: IRank[] = [];
  private ds: DataService = inject(DataService);
  route:ActivatedRoute = inject(ActivatedRoute);

  constructor(private _elementRef: ElementRef) { 
 
  }

  autoscroll() {
    this.content.getScrollElement().then(el => {
      this.scrollElement = el;
      this.headerHeight = this._elementRef.nativeElement.querySelector('ion-header').offsetHeight;
      console.log("Header height:", this.headerHeight);
      setInterval(() => {
        // Find all ion-item elements
        const items = this._elementRef.nativeElement.querySelectorAll('ion-item');

        if (items.length === 0) return;

        // Find the first item that is not fully visible
        let targetItem: Element | null = null;
        let found = false;  
        for (let item of items) {
          if (item.id === this.actId || this.actId === "") found = true;
          if (!found) continue; // Skip until we reach the last active ID
          const rect = item.getBoundingClientRect();
          const scrollElementRect = this.scrollElement.getBoundingClientRect();

          // Check if item is fully visible (considering header height)
          const isFullyVisible = rect.bottom <= scrollElementRect.bottom;
          console.log(`Item ${item.id} visibility:`, rect.bottom, scrollElementRect.bottom, isFullyVisible);
          if (!isFullyVisible) {
            console.log("Scrolling to item:", item.id);
            console.log("Item rect:", rect);
            console.log("Scroll element rect:", scrollElementRect);
            targetItem = item;
            break;
          }
        }

        if (targetItem) {
          // Scroll to the target item
          this.actId = targetItem.id;
          this.content.scrollToPoint(0, (targetItem as HTMLElement).offsetTop , 2000);

        } else {
          // If all items are visible, scroll back to top
          this.content.scrollToTop(2000);
          this.actId = "";
        }

      }, 10000); // Adjust interval as needed
    });
  }

  ngOnInit() {
    this.competition = this.route.snapshot.params['competition'];
    console.log("Competition from route:", this.competition);
    console.log("Competition from input:", this.comp);
    console.log("Only Top 10:", this.onlyTop10);
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
        if (this.onlyTop10 == "false" && this.rankings.length > 10) {
          this.autoscroll();
        }
      });
    }  
  }

}
