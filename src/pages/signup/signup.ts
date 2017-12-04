import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import {LoginPage} from "../login/login";
import  {db_json} from "../../assets/db_test";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  db_json: any;

  constructor(public nav: NavController, public authData: AuthProvider,
              public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.db_json = db_json;
    localStorage.setItem("page","sign");
    this.signupForm = formBuilder.group({
      first: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password_re: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  addFirebaseUser(){
    let database = firebase.database();
    database.ref('user/' +firebase.auth().currentUser.uid).set({
      username: this.signupForm.value.first,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    })
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
      if(this.signupForm.value.first == "" ||  this.signupForm.value.last == "" || this.signupForm.value.email || this.signupForm.value.password || this.signupForm.value.password_re){
        let alert = this.alertCtrl.create({
          message: "Please fill all inputs",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }

    } else {
      if (this.signupForm.value.password == this.signupForm.value.password_re){

        this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password,this.signupForm.value.first)
          .then(  () => {
            this.nav.setRoot(LoginPage);
            this.addFirebaseUser();
          }, (error) => {
            this.loading.dismiss().then( () => {

              let errorMessage: string = error.message;
              let alert = this.alertCtrl.create({
                message: errorMessage,
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();

            });
          });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      } else {
        alert("These passwords don't match' is displayed");
      }
    }
  }
}
