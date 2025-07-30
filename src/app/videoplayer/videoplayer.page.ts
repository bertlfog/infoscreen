import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.page.html',
  styleUrls: ['./videoplayer.page.scss'],
  standalone: true,
  imports: [IonCard, CommonModule, FormsModule, IonCardHeader, IonCardContent]
})
export class VideoplayerPage implements OnInit {
  playlist: string[] = [
    // 'assets/video/1993.mp4',
    // 'assets/video/1997_Anfang.mp4',
    'assets/video/1997_Rest.mp4',
    'assets/video/2015_FF-Fest.mp4',
    'assets/video/2016_FF-Heuriger.mp4',
    'assets/video/2016_Replay_Komplett_mitLowerThird_FIN.mp4',
    'assets/video/2017_FF-Heuriger Grillenberg.mp4',
    'assets/video/2017_Replay.mp4',
    'assets/video/2018_FF-Heuriger.mp4',
    'assets/video/2019_FF-Heuriger.mp4', 
    'assets/video/2022_FF-Heuriger.mp4',
    'assets/video/2023_FF-Heuriger.mp4',

  ];
  currentIndex: number = 0;
  showbanner: boolean = true;
  rankings: string = "";


  constructor(private ds: DataService) { 
   this.ds.getParticipants('2025_Trinkathlon').subscribe((result) => {
      console.log(result);
      let text = "";
      let rank = 1;
      result.forEach( (r: { name: string; }) => {
        if (rank > 1) text += '   -   ';
        text += rank.toString() + '. ' + r.name;
        rank++;
      });
      this.rankings = text;
    });

  }
  get currentVideo(): string {
    return this.playlist[this.currentIndex];
  }



  playNextVideo(): void {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first video
    }
  }
  ngOnInit() {
  }

}

