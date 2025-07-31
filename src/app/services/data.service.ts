import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, orderBy, query } from '@angular/fire/firestore';
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
    
    return collectionData(query(collection(this.db, competition + '_participants'), orderBy("score", "desc")));
            
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

   getRanking(competition: string) {
    return "1. Kipp(s) weg - 2. Die Coolen - 3. Die Unglaublichen - 4. Zigeuner - 5. noch wer - 6. noch viel mehr - 7. Vuigas - 8. Wahnsinn, 1. Kipp(s) weg - 2. Die Coolen - 3. Die Unglaublichen - 4. Zigeuner - 5. noch wer - 6. noch viel mehr - 7. Vuigas - 8. Wahnsinn";
   }

   getCompetitions(): Observable<any> {
    return collectionData(query(collection(this.db, 'competitions'), orderBy('name', 'desc')));
   }
}
