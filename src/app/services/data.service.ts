import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {

   }

   getRanking(competition: string) {
    return "1. Kipp(s) weg - 2. Die Coolen - 3. Die Unglaublichen - 4. Zigeuner - 5. noch wer - 6. noch viel mehr - 7. Vuigas - 8. Wahnsinn, 1. Kipp(s) weg - 2. Die Coolen - 3. Die Unglaublichen - 4. Zigeuner - 5. noch wer - 6. noch viel mehr - 7. Vuigas - 8. Wahnsinn";
   }
}
