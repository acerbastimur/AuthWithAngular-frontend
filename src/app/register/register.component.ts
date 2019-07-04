import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public confirmPassword = '';
  public user: IUser = {
    email: "",
    name: "",
    password: "",
    surname: "",
    isVerified: false,
    uid: ''
  };
  constructor(private auth: AuthService, private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit() {

  }

  save() {
    if (this.user.password == this.confirmPassword) {
      this.auth.register(this.user).then(e => {
        this.toaster.success("user is created!");
        this.router.navigate(["/", "profile"]);
      }).catch(err => {
        this.toaster.error(err.message);

       })
    } else {
      this.toaster.error("please check areas!");

    }
  }

}
