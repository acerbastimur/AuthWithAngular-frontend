import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  email: string;

  constructor(private auth: AuthService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  resetPassword() {
    this.auth.resetPassword(this.email).then(result => {
      this.toaster.success("Message Sent!")

      console.log(result);
    }).catch(reason => {
      this.toaster.error(reason.message)

    })
  }
}
