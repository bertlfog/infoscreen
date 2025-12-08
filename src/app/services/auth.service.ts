import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IUser } from '../model/user';
import { Router } from '@angular/router';
import { Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  User, } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn:boolean = false;
  
  auth: Auth = inject(Auth);
  db: Firestore = inject(Firestore);
  router: Router = inject(Router);

  constructor() {

  }

  async emailSignin(user: string, pw: string) {
    signInWithEmailAndPassword(this.auth, user, pw).then((credential) => {
      
      this.isLoggedIn = true;
      
      console.log("Service Authenticated: " + this.isLoggedIn);
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error("Error during email sign-in:", error);    
    });

  }
  
  IsAuthenticated():boolean{
    return this.isLoggedIn;
  }


}

