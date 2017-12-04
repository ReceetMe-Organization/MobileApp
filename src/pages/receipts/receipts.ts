import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import {ContactusPage} from "../contactus/contactus";
import {Facebook} from "@ionic-native/facebook";
import {db_json} from "../../assets/db_test";
import {platform} from "os";

@IonicPage()
@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
})

export class ReceiptsPage {
  contactus = ContactusPage;
  db_json: any;

  public message  : string = 'https://www.receet.me/   Hey, I want to share ReceetMe with you. All my receipts are paperless and mobile. Are you ready to kiss paper receipt goodbye?';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sharingVar: SocialSharing,public platform : Platform,
              private facebook: Facebook, public nav: NavController) {
    this.db_json = db_json;
    localStorage.setItem("page","receipts" );

  }
  setBackButtonAction() {
    this.platform.registerBackButtonAction(() => {>
      this.platform.exitApp();
    });
  }

  facebookLog(){
    this.facebook.logout();
  }

  otherShare() {
    var options = {
      message: this.message, // not supported on some apps (Facebook, Instagram)
      subject: 'ReecetMe', // fi. for email
      files: ['www/assets/icon/logo_receet.png'], // an array of filenames either locally or remotely
      url: null
    };
    this.platform.ready()
      .then(() =>
      {
        this.sharingVar.shareWithOptions(options)
          .then((data) =>
          {
            console.log('Shared via SharePicker',data);
            console.log('option',options);
          })
          .catch((err) =>
          {
            console.log('Was not shared via SharePicker',err);
            console.log('option',options);
          });
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptsPage');
    this.setBackButtonAction();
  }

}
