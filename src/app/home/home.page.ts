import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg, IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonList, IonImg, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem],
})
export class HomePage {
  constructor() {}
}
