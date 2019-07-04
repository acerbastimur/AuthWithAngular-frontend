import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  private verificationCode: string;
  uid: string;
  constructor(private auth: AuthService, private router: Router,
    private toaster: ToastrService
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.uid = user.uid;
        setTimeout(() => {
          auth.getVerificationCode(this.uid).then(code => {
            this.verificationCode = code;
          })
        }, 2000);


      }
    })
  }

  ngOnInit() {
  }

  verify(value) {
    console.log(value);
    if (value == this.verificationCode) {
      console.log("HELALLL")
      this.auth.setUserAsVerified(this.uid).then(() => {
        this.toaster.success("Valid code!");

        this.router.navigate(["/", "profile"]);
      })
    } else {
      console.log("sorry");
      this.toaster.warning("Please provide a valid code");

    }
  }
}
