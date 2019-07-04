import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BASE_URL from '../env/backendUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getLoginTimes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "GetLoginTimes").subscribe((res: Array<any>) => {
        resolve(res)
      })
    })
  }

  getOnlineUsers(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "GetOnlineUsers").subscribe((res: Array<any>) => {
        resolve(res)
      })
    })
  }


  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "GetAllUsers").subscribe(res => {
        resolve(res)
      })
    })
  }


}
