import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { IUser } from '../interfaces/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as HttpCodes from 'http-status-codes';
import BASE_URL from '../env/backendUrl';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  register(userRegisterInfo: IUser): Promise<any> {

    return new Promise((resolve, reject) => {

      auth().createUserWithEmailAndPassword(userRegisterInfo.email, userRegisterInfo.password).then(registeredUser => {
        let uid = registeredUser.user.uid;
        userRegisterInfo.uid = uid;
        console.log("Authed", userRegisterInfo);

        this.addUserToDatabase_PostRequest(userRegisterInfo).then(status => {
          if (status === HttpCodes.CREATED) {
            console.log("CREATED!");
            resolve();
          } else if (status === HttpCodes.FORBIDDEN) {
            console.log("ERROR ON REGISTERING");
            reject();
          }
        })
      }).catch(err => {
        console.log("there is an error on login");
        reject(err)
      })
    })
  }

  addUserToDatabase_PostRequest(user: IUser): Promise<number> {
    return new Promise((resolve, reject) => {
      let body = new URLSearchParams();
      body.set('name', user.name);
      body.set('surname', user.surname);
      body.set('email', user.email);
      body.set('isVerified', user.isVerified.toString());
      body.set('uid', user.uid);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      console.log("adduser to db function is running")
      this.http.post(BASE_URL + "SaveUserInfoToDatabase", body.toString(), options).subscribe((res: any) => {
        console.log(res);
        resolve(res.status)
      },
        err => {
          console.log(err);
          resolve(err.status)

        })
    })
  }


  setLoginTime(uid: string, time: number): Promise<number> {
    return new Promise((resolve, reject) => {
      let body = new URLSearchParams();
      body.set('uid', uid);
      body.set('time', time.toString());

      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      console.log("adduser to db function is running")
      this.http.post(BASE_URL + "SaveUserLoginTime", body.toString(), options).subscribe((res: any) => {
        console.log(res);
        resolve(res.status)
      },
        err => {
          console.log(err);
          resolve(err.status)

        })
    })
  }



  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      })
        .catch(reason => {
          reject(reason);
        })
    })
  }

  setUserOnline(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "SetUserAsOnlineUid=" + uid).subscribe((res: any) => {
        console.log("offline");
        resolve();
      }, err => {
        resolve();
      })
    })
  }

  getVerificationCode(uid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "GetUserVerificationCodeUid=" + uid).subscribe((res: any) => {
        console.log(res)
        resolve(res.code);
      }, err => {
        console.log(err)
        resolve(err.code);
      })
    })
  }
  
  setUserAsVerified(uid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "SetUserVerificationStateTrue=" + uid).subscribe((res: any) => {
        console.log(res)
        resolve(res);
      }, err => {
        console.log(err)
        resolve(err);
      })
    })
  }

  resetPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(result => {
        resolve(result);
      }).catch(reason => {
        reject(reason);
      })
    })
  }



}
