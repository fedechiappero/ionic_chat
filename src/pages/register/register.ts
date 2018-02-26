import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../providers/auth-service';

import { ChatListPage } from '../chat-list/chat-list';
import { Http } from '@angular/http';
import * as AppConfig from '../../app/config';
import { UserModel } from '../../models/user.model';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private regData: FormGroup;
  private cfg: any;

  constructor(

    private http: Http,
    private userData: UserModel,

    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private alertCtrl: AlertController) {

      this.cfg = AppConfig.cfg;
      this.regData = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
      });
  }

  register() {

    this.userData = this.regData.value;
    return this.http.post(this.cfg.apiUrl + this.cfg.user.register, this.userData)
    .toPromise()
    .then(data => {
      let rs = data.json();
      if(rs.status == "success"){
        this.presentAlert(rs.status, "You been registered successfully, now you can Login");
        this.navCtrl.setRoot(ChatListPage)
      }
    })
    .catch((err) => 
      this.presentAlert(err.status, err.statusText) 
    );
  }

  presentAlert(status, text) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: text,
      buttons: ['Close']
    });
    alert.present();
  }

}
