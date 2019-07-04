import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  public loginTimer = 0;
  constructor() {
    setInterval(() => {
      this.loginTimer++;
    }, 1000)
  }
}
