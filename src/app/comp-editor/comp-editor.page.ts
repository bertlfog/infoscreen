import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonImg, IonTitle, IonButton, IonIcon, IonItem, IonLabel, IonToolbar, IonContent, IonList, IonListHeader, IonInput } from "@ionic/angular/standalone";
import { IRank } from '../model/rank';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comp-editor',
  templateUrl: './comp-editor.page.html',
  styleUrls: ['./comp-editor.page.scss'],
  imports: [IonInput, IonListHeader, IonToolbar, IonHeader, IonImg, IonTitle, IonContent, IonTitle, IonButton, IonItem, IonLabel, IonIcon, IonList, FormsModule],
  standalone: true  
})
export class CompEditorPage  implements OnInit {
  @ViewChild('inputName') inputName!: IonInput;

  ds: DataService = inject(DataService);
  competition! : string;
  route: ActivatedRoute = inject(ActivatedRoute);
  rankings: IRank[] = [];
  newName: string = "";
  newScore: number = 0;

  constructor() {
    this.competition = this.route.snapshot.params['competition'];
    this.ds.getParticipants(this.competition).subscribe((data) => {
      console.log(data);
      this.rankings = data;
    })
  }
  addRanking() {
    if (this.newName != "" && this.newScore > 0) {
      const newRank: IRank = { name: this.newName, score: this.newScore };
      this.rankings.push(newRank);
      // Here you would typically call a service to save the new ranking to the database
      this.ds.addRanking(this.competition, newRank);
      this.newName = "";
      this.newScore = 0;
    } else {
      console.error("Name and score must be provided");
    }
  }

  deleteRanking(id?: string) {
    this.ds.deleteRanking(this.competition, id);
  }

  eventHandler(keyCode: number) {
    if (keyCode === 13) { // Enter key  
      this.addRanking();
      this.inputName.setFocus(); // Set focus back to the input field
      
    }
  }

  ngOnInit() {}

}
 

