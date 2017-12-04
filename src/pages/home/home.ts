import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ContactusPage} from "../contactus/contactus";
import {SignupPage} from "../signup/signup";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {ReceiptsPage} from "../receipts/receipts";
import {db_json} from "../../assets/db_test";
import {Http} from "@angular/http";
import{AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  login = LoginPage;
  userProfile: any = null;
  signup = SignupPage;
  contactus = ContactusPage;
  db_json: any;


  constructor(public navCtrl: NavController,private facebook: Facebook, public http: Http,public authData: AngularFireAuth) {
    this.db_json = db_json;
    localStorage.setItem("page","home");
  }

  facebookLogin(): void {
    this.facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
      console.log(facebookCredential);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          this.navCtrl.setRoot(ReceiptsPage);
          localStorage.setItem("name", this.authData.auth.currentUser.displayName);
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => {
      console.log(error)
    });
  }
}
