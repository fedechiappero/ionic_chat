import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../providers/auth-service';

import { ChatListPage } from '../chat-list/chat-list';
import { Http } from '@angular/http';
import * as AppConfig from '../../app/config';
import { UserModel } from '../../models/user.model';

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
    public authService: AuthService) {

      this.cfg = AppConfig.cfg;
      this.regData = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    
    // this.authService.register(this.regData.value)
    //   .then(() => this.navCtrl.setRoot(ChatListPage))
    //   .catch(e => console.log("reg error", e));

      this.userData = this.regData.value;
      return this.http.post(this.cfg.apiUrl + this.cfg.user.register, this.userData)
      .toPromise()
      .then(data => {
        let rs = data.json();
        if(rs.status == "success"){
          this.navCtrl.setRoot(ChatListPage)
        }
      })
      .catch(function(err){
        //this.regData.error = err;
        console.error(err.status, err.statusText);
      });
  }

}
