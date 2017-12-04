import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import {ReceiptsPage} from "../pages/receipts/receipts";
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import {MyProfilePage} from "../pages/my-profile/my-profile";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  home = HomePage;

  constructor(platform: Platform, afAuth: AngularFireAuth, private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
    this.rootPage = HomePage;
    if(localStorage.getItem("page") == "login"){
      this.rootPage = HomePage;
    }
    if(localStorage.getItem("page") == "receipts"){
      this.rootPage = ReceiptsPage;
    }
    if(localStorage.getItem("page") == "home"){
      this.rootPage = HomePage;
    }
    if(localStorage.getItem("page") == "contact"){
      this.rootPage = ReceiptsPage;
    }
    if(localStorage.getItem("page") == "reset"){
      this.rootPage = HomePage;
    }
    if(localStorage.getItem("page") == "sign"){
      this.rootPage = HomePage;
    }
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  navigateProfile(){
    this.nav.setRoot(MyProfilePage);
  }

  navigateToList(){
    this.rootPage = HomePage;
    this.nav.setRoot(HomePage);
  }

  navigateAll(){
    this.rootPage = ReceiptsPage;
    this.nav.setRoot(ReceiptsPage);
  }

}
