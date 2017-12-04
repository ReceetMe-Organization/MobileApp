import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';
import { EmailValidator } from '../../validators/email';
import  {ReceiptsPage} from "../receipts/receipts";

import {db_json} from "../../assets/db_test";

import {Http, Request, RequestMethod, Headers} from "@angular/http";
/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  public loginForm:FormGroup;
  receipts = ReceiptsPage;


  json_contact: any;
  http: Http;
  mailgunApiKey: string;
  mailgunUrl: string;


  constructor( public alertCtrl: AlertController,public navCtrl: NavController,
               public navParams: NavParams,private emailComposer: EmailComposer,
               public formBuilder: FormBuilder, http: Http) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid, Validators.maxLength(254)])],
      message: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    localStorage.setItem("page","contact");
    this.load();

    this.json_contact = db_json;

    console.log(this.json_contact);
    this.http = http;
    this.mailgunUrl = "sandbox991e003cf6904980b89a81f5d6c77b14.mailgun.org";
    this.mailgunApiKey = window.btoa("api:key-7798299e559c4678d04cedd895fdb07b");
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ContactusPage');
  }


  load() {
    let url = "https://hourses-sashaviniar.c9users.io/test.json";
    if (this.json_contact) {
      // already loaded data
      return Promise.resolve(this.json_contact);
    }
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.json_contact = data;
          resolve(this.json_contact);
        });
    });
  }

  send(recipient: string, subject: string, message: string) {
    recipient = "info@receet.me";
    let alert = this.alertCtrl.create({
      message: "Your message was successfully sent to ReceetMe",
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();

    let requestHeaders = new Headers();

    requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
    requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    this.http.request(new Request({
      method: RequestMethod.Post,
      url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
      body: "from=test@example.com&to=" + recipient + "&subject=" + subject + "&text=" + message,
      headers: requestHeaders
    }))
      .subscribe(success => {
        console.log("SUCCESS -> " + JSON.stringify(success));
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });


  }


}
