import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { SharedServiceService } from './services/shared-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oguzhanOrhan';
  constructor(private sharedService:SharedServiceService) {
  
  }
}
