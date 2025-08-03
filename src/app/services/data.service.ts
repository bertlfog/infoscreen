import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, getDocs, orderBy, deleteDoc, query, doc } from '@angular/fire/firestore';
import { first, map, Observable } from 'rxjs';
import { IRank } from '../model/rank';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  private db: Firestore = inject(Firestore);

  constructor() {

   }
   getParticipants(competition: string): Observable<any> {
    
    return collectionData(query(collection(this.db, competition + '_participants'), orderBy("score", "desc")), { idField: 'id' });;
            
   }
   async getSnapshot(competition: string) {
    const rankings: IRank[] = [];
    const snapshot = await getDocs(query(collection(this.db, competition + '_participants')));
    let i = 0;
    snapshot.forEach((doc) => {
      rankings[i] = { name: doc.data()['name'], score: doc.data()['score'] };
      i++;
    });
    return rankings;
   }
   addRanking(competition: string, newRank: IRank) {
    const collRef = collection(this.db, competition + '_participants');  
    addDoc(collRef, newRank).then((ref) => {
      console.log("Ranking added successfully: ", ref);
    });

   }
   deleteRanking(competition: string, id?: string) {
    const collRef = collection(this.db, competition + '_participants'); 
    deleteDoc(doc(collRef, id)).then(() => {
      console.log("Ranking deleted successfully");
    });
  }
   getCompetitions(): Observable<any> {
    return collectionData(query(collection(this.db, 'competitions'), orderBy('name', 'desc')));
   }

  getBeerDonations(): Observable<any> {
    
    return collectionData(query(collection(this.db, 'beer_donations'), orderBy('time', 'asc')), { idField: 'id' });;
            
   }
   addBeerDonation(donation: { name: string }) {
    const collRef = collection(this.db, 'beer_donations');  
    addDoc(collRef, donation).then((ref) => {
      console.log("Beer donation added successfully: ", ref);
    });
   }
   deleteBeerDonation(id?: string) {
    const collRef = collection(this.db, 'beer_donations'); 
    deleteDoc(doc(collRef, id)).then(() => {
      console.log("Beer donation deleted successfully");
    }); 
  }
}
