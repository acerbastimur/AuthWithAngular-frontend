import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from "@angular/router";
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserGuard } from './user.guard';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VerificationComponent } from './verification/verification.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const firebaseConfig = {
  apiKey: "AIzaSyAXIJ0xaF0IpudBXtRNmPvPzWm60B4aqWI",
  authDomain: "homework-e065e.firebaseapp.com",
  databaseURL: "https://homework-e065e.firebaseio.com",
  projectId: "homework-e065e",
  storageBucket: "",
  messagingSenderId: "498403355885",
  appId: "1:498403355885:web:c005deb1617a0795"
};
firebase.initializeApp(firebaseConfig)


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPassword', component: ForgetPassComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [UserGuard] },
  { path: 'verification', component: VerificationComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: LoginComponent }


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPassComponent,
    UserProfileComponent,
    VerificationComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      preventDuplicates: false,
      positionClass: "toast-top-right"
    })

  ],
  providers: [AngularFireDatabase,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
