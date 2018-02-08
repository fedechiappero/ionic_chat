import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import *  as AppConfig from '../../app/config';
import {Storage} from '@ionic/storage';

import { LoginPage } from '../login/login';

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  private loggedUser: string;  
  private cfg: any;
  private logged : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,) {

      this.cfg = AppConfig.cfg;
  }

  ionViewDidEnter() {

    this.storage.get('id_user').then(user => {//finally, this is a Promise()
      this.loggedUser = user;
      if(this.loggedUser == undefined || this.loggedUser == null){
        console.log('you`re not logged');
        console.log("id :"+this.loggedUser);
        this.logged = false;
      }else{
        console.log(this.storage.get('email_user'));
        console.log("id :"+this.loggedUser);
        this.logged = true;
      }
    }).catch(error => {
      console.log(error);
    }); 
  }

  logout(){
    this.storage.set('id_user', null);
    this.storage.set('email_user', null);
    this.logged = false;
    location.reload();
  }

  login(){
    this.navCtrl.push(LoginPage); 
  }
}
