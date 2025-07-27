import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Rank } from '../model/rank';


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
  ranking: Rank[] = [];

  constructor(private ds: DataService) { 


  }
  get currentVideo(): string {
    return this.playlist[this.currentIndex];
  }

  get rankings() : string {
    // let text = "";
    // let rank = 1;
    // this.ranking.forEach( r => {
    //   if (rank > 1) text += '- ';
    //   text += rank.toString() + '. ' + r.name;
    //   rank++;
    // });
    // return text;
    return this.ds.getRanking("2025_Trinkathlon");
    //return "1. Kipp(s) weg - 2. Die Coolen - 3. Die Unglaublichen - 4. Zigeuner - 5. noch wer - 6. noch viel mehr - 7. Vuigas - 8. Wahnsinn, 1. Kipp(s) weg - 2. Die Coolen - 3. Die Unglaublichen - 4. Zigeuner - 5. noch wer - 6. noch viel mehr - 7. Vuigas - 8. Wahnsinn";
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

