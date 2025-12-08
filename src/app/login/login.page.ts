import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { authServiceProvider } from '../services/service-factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  router = inject(Router);
  as: AuthService = inject(AuthService);
  
  constructor() { 

  }

  async login() {
    
    await this.as.emailSignin(this.username, this.password);
    console.log("Login successful", this.as);
    
  }
  ngOnInit() {
  }

}
