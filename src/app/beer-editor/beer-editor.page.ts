import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonLabel, IonButton, IonIcon, IonListHeader, IonList, IonItem, IonImg } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { IRank } from '../model/rank';
import { IBeerDonation } from '../model/beer-donation';

@Component({
  selector: 'app-beer-editor',
  templateUrl: './beer-editor.page.html',
  styleUrls: ['./beer-editor.page.scss'],
  standalone: true,
  imports: [IonImg, IonItem, IonList, IonListHeader, IonIcon, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput]
})
export class BeerEditorPage implements OnInit {
  @ViewChild('inputName') inputName!: IonInput;

  ds: DataService = inject(DataService);

  route: ActivatedRoute = inject(ActivatedRoute);
  beerDonations: IBeerDonation[] = [];
  newName: string = "";
  newScore: number = 0;

  constructor() {

    this.ds.getBeerDonations().subscribe((data) => {
      console.log(data);
      this.beerDonations = data;
    })
  }
  addDonation() {
    if (this.newName != "") {
      const newDonation: IBeerDonation = { name: this.newName, time: new Date() };
      this.beerDonations.push(newDonation);
      // Here you would typically call a service to save the new ranking to the database
      this.ds.addBeerDonation(newDonation);
      this.newName = "";

    } else {
      console.error("Name and score must be provided");
    }
  }

  deleteDonation(id?: string) {
    this.ds.deleteBeerDonation(id);
  }

  eventHandler(keyCode: number) {
    if (keyCode === 13) { // Enter key  
      this.addDonation();
      this.inputName.setFocus(); // Set focus back to the input field
      
    }
  }
  ngOnInit() {
  }

}
