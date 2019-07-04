import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private sharedService: SharedServiceService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.sharedService.loginTimer)
    this.auth.login(this.email, this.password).then(user => {
      this.router.navigate(["/", "profile"]).then(() => {
        const loginTime = this.sharedService.loginTimer;
        this.auth.setLoginTime(user.user.uid, loginTime);
        this.toaster.success("Succesfully logined!")

      })
    }).catch(err => {
      console.log("there is an error on login, reason = ", err);
      this.toaster.error(err.message)

    })
  }
}
