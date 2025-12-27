import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RankingPage } from "../ranking/ranking.page";
import { VideoplayerPage } from "../videoplayer/videoplayer.page";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RankingPage, VideoplayerPage]
})
export class PlayerPage implements OnInit {
  @ViewChild('rank') rankComponent!: RankingPage;
  competition: string = "beer_donations"; // Default competition, can be changed based on routing or user input
  page: string = ""; // Default page to show, can be changed based on user interaction
  onlyTop10: boolean = false;
  ds: DataService = inject(DataService);
  rankingDisplay: string = 'none';
  videoplayerDisplay: string = 'block';
  
  constructor() { 

  }

  ngOnInit() {
      this.ds.getPlayerConfig().subscribe((config) => {
      console.log("Player config:", config[0]);
      if (config[0]) {
        this.competition = config[0].competition;
        this.page = config[0].page || "video"; // Default to video if not specified
        this.onlyTop10 = config[0].onlyTop10 || "false";
      }
      console.log("Current page:", this.page);
      console.log("Current competition:", this.competition);
      console.log("Only Top 10:", this.onlyTop10);

      if (this.page === "video") {
        this.rankingDisplay = 'none';
        this.videoplayerDisplay = 'block';
        
      }
      if (this.page === "ranking") {
        this.videoplayerDisplay = 'none';
        this.rankingDisplay = 'block';
        
      }
      if (this.rankComponent) {
        this.rankComponent.ngOnInit();
      }
    });
  }

}
