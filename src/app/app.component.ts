import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor() {}
}
