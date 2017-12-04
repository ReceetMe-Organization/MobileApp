import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook'
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {SignupPage} from "../pages/signup/signup";
import {ReceiptsPage} from "../pages/receipts/receipts";
import { SocialSharing } from '@ionic-native/social-sharing';
import {MyProfilePage} from "../pages/my-profile/my-profile";
import {ContactusPage} from "../pages/contactus/contactus";

import { EmailComposer } from '@ionic-native/email-composer';
import { HttpModule } from '@angular/http';

// Importing AF2 Module


import {AngularFireModule} from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeTsProvider } from '../providers/home-ts/home-ts';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyDbtbdYGDbBV1FAcoCer2D46n5Rl8UX3T4",
  authDomain: "receetlogin.firebaseapp.com",
  databaseURL: "https://receetlogin.firebaseio.com",
  projectId: "receetlogin",
  storageBucket: "",
  messagingSenderId: "661969279119"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ReceiptsPage,
    ContactusPage,
    MyProfilePage

  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar,
    SocialSharing,
    AuthProvider,
    HttpModule,
    EmailComposer,
    Facebook,
    HomeTsProvider
  ]
})
export class AppModule {}
