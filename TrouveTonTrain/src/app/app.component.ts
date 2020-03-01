import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrouveTonTrain';
  constructor() {
    const config = {
      apiKey: 'AIzaSyCChin8PVF5NNehyWENXP14l5ncpuQPrRo',
      authDomain: 'trouvetontrain-267507.firebaseapp.com',
      databaseURL: 'https://trouvetontrain-267507.firebaseio.com',
      projectId: 'trouvetontrain-267507',
      storageBucket: 'trouvetontrain-267507.appspot.com',
      messagingSenderId: '241900826802',
      appId: '1:241900826802:web:c51a455cb0f432200519ab'
    };
    firebase.initializeApp(config);
  }
}
