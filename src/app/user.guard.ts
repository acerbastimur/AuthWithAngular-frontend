import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import BASE_URL from './env/backendUrl';
import * as firebase from 'firebase/app';
import * as HttpCodes from 'http-status-codes';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {


      this.getStatus().then(() => {
        console.log("TRUE");
        setInterval(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.auth.setUserOnline(user.uid);
              console.log("Online!");
            }
          })
        }, 3000);
        resolve(true);
      }).catch(() => {
        console.log("FALSE");
        this.router.navigate(["/", "verification"]);
        resolve(false);
      })
    });

  }


  getStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          const uid = user.uid;
          console.log(uid);
          this.http.get(BASE_URL + "CheckIfUserVerifiedUid=" + uid).subscribe((res: any) => {
            console.log(res);
            if (res.status === HttpCodes.OK) {
              resolve();

            } else if (res.status === HttpCodes.UNAUTHORIZED) {
              reject();
            }
          },
            (err: any) => {
              console.log(err);
              if (err.status === HttpCodes.OK) {
                resolve();

              } else if (err.status === HttpCodes.UNAUTHORIZED) {
                reject();
              }
            })
        }
      });
    })
  }




}
