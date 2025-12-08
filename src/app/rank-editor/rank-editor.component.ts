import { Component, Input, OnInit } from '@angular/core';
import { IonButtons, IonTitle, IonInput, IonHeader, IonItem, IonContent, IonToolbar, ModalController, IonButton } from "@ionic/angular/standalone";
import { IRank } from '../model/rank';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rank-editor',
  templateUrl: './rank-editor.component.html',
  styleUrls: ['./rank-editor.component.scss'],
  imports: [IonButton, IonItem, IonHeader, IonButtons, IonTitle, IonInput, IonContent, IonToolbar, FormsModule],
  standalone: true
})
export class RankEditorComponent  {
  @Input() rank!: IRank;


  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.rank.name.trim() === '' || this.rank.score <= 0) {
      console.error('Name and score must be provided');
      return;
    }
    return this.modalCtrl.dismiss(this.rank, 'confirm');
  }

}
