import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {CredentialsModel} from '../../models/credentials.model';
import {Http} from '@angular/http';
import *  as AppConfig from '../../app/config';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loggedUser: string;
  private cfg: any;
  private loginData: FormGroup;
  

  constructor(
    private storage: Storage,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private credentialsData: CredentialsModel,
    private http: Http,) {

      this.loginData = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
      });

      this.cfg = AppConfig.cfg;
      this.storage.get('id_user').then(user => {
        this.loggedUser = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(credentials: CredentialsModel) {
    this.credentialsData = this.loginData.value;
    //after path: JSON.stringify(credentialsData)
    return this.http.post(this.cfg.apiUrl + this.cfg.user.login, this.credentialsData)
      .toPromise()
      .then(data => {
        let rs = data.json();
        this.saveData(rs);
      })
      .catch(e => console.log('login error', e));
  }

  saveData(rs: any) {
    this.storage.set("id_user", rs.data.id);
    console.log("id logged user: " + rs.data.id);
    console.log("id logged user: " + rs.data.email);
  }

}
