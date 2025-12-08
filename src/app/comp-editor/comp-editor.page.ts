import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonImg, IonTitle, IonButton, IonIcon, IonItem, IonLabel, IonToolbar, IonContent, IonList, IonListHeader, IonInput, ModalController } from "@ionic/angular/standalone";
import { IRank } from '../model/rank';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { RankEditorComponent } from '../rank-editor/rank-editor.component';

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
  editName: string = "";
  editScore: number = 0;
  editId?: string = "";
  modalCtrl: ModalController = inject(ModalController);

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
  async initEdit(r: IRank) {
    console.log("Editing rank:", r);
    this.editName = r.name;
    this.editScore = r.score;
    this.editId = r.id;
    const modal = await this.modalCtrl.create({
      component: RankEditorComponent,
      componentProps: { rank: r } // Pass any necessary data to the modal
    });
    
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      if (data) {
        const updatedRank: IRank = { name: data.name, score: data.score, id: data.id };
        this.ds.deleteRanking(this.competition, data.id);
        this.ds.addRanking(this.competition, updatedRank);
      }
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
 

