import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import{AngularFireAuth} from "angularfire2/auth";
import {ContactusPage} from "../contactus/contactus";
import {ReceiptsPage} from "../receipts/receipts";
import {Platform} from "ionic-angular";
import {AlertController} from "ionic-angular";
import {Navbar} from "ionic-angular";
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})

export class MyProfilePage {
  @ViewChild(Navbar) navBar: Navbar;
  nameUser: any;
  emailUser: any;
  username: any;
  public message  : string = 'https://www.receet.me/   Hey, I want to share ReceetMe with you. All my receipts are paperless and mobile. Are you ready to kiss paper receipt goodbye?';
  contactus = ContactusPage;
  receipt = ReceiptsPage;
  constructor(private navController: NavController,public navParams: NavParams,
              public authData: AngularFireAuth,private platform: Platform,
              private alertCtrl: AlertController, public nav: NavController,private sharingVar: SocialSharing) {

    this.emailUser = this.authData.auth.currentUser.email;
    this.nameUser = localStorage.getItem("name");

  }

    setBackButtonAction(){
      this.platform.registerBackButtonAction(() => {
        this.nav.setRoot(ReceiptsPage);
      });
    }

    ionViewDidLoad() {
    this.setBackButtonAction();
    console.log('ionViewDidLoad MyProfilePage');
  }

  otherShare()  {
    this.platform.ready()
      .then(() =>
      {
        this.sharingVar.share(this.message,"ReecetMe","www/assets/icon/logo_receet.png",null)
          .then((data) =>
          {
            console.log('Shared via SharePicker');
          })
          .catch((err) =>
          {
            console.log('Was not shared via SharePicker');
          });
      });
  }

}
