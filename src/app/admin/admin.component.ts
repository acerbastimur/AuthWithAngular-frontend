import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  avarageLoginTime: number = 0;
  onlineUsers: number = 0;
  verifiedUsersInADay: number = 0;
  notVerifiedUsersInADay: number = 0;
  newUsersCount: number = 0;
  constructor(private admin: AdminService) {
    setInterval(() => {
      admin.getAllUsers().then(users => {
        this.getAverageLoginTime();
        this.getOnlineUserCount();
        this.usersVerifiedInADay(users);
        this.newUsers(users);
      });
    }, 3000);
  }

  getAverageLoginTime() {
    this.admin.getLoginTimes().then(loginTimes => {
      this.avarageLoginTime = parseInt(this.calculateAvarageLoginTime(loginTimes).toFixed(0));
    })
  }

  usersVerifiedInADay(users: any) {

    const _users = Object.values(users);
    let verifiedUserCount = 0;
    let notVerifiedUserCount = 0;
    _users.map((user: any, index: number) => {
      if ((Date.now() - user.signUpDate < 86400000) && user.isVerified == true) { // 1 day and not verified yet
        console.log(users[Object.keys(users)[index]]);
        verifiedUserCount++;
      }
      if ((Date.now() - user.signUpDate > 86400000) && user.isVerified == false) {
        console.log(users[Object.keys(users)[index]]);
        notVerifiedUserCount++;
      }
    })
    this.verifiedUsersInADay = verifiedUserCount;
    this.notVerifiedUsersInADay = notVerifiedUserCount;

  }

  newUsers(users: any) {

    const _users = Object.values(users);
    let newUsers = 0;
    _users.map((user: any, index: number) => {
      if ((Date.now() - user.signUpDate < 86400000)) {
        newUsers++;
      }
    })
    this.newUsersCount = newUsers;

  }

  getOnlineUserCount() {
    this.admin.getOnlineUsers().then(users => {
      let userCount = 0;
      const now = Date.now();
      users.map((userLastSeen: number) => {
        if (now - userLastSeen < 6000) {
          userCount++
        }
      });
      this.onlineUsers = userCount;
    })
  }

  calculateAvarageLoginTime(logins: Array<any>): number {
    if (logins.length > 0) {
      const loginCount = logins.length;
      const _logins = logins.map(Number); // to convert all to numbers
      return _logins.reduce((sum, x) => sum + x) / loginCount;
    }
    return 0;
  }

  ngOnInit() {
  }

}
