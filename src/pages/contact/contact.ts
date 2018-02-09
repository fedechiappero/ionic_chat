import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as AppConfig from '../../app/config';

import { ChattouserService } from '../../services/chattouser';

import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private cfg: any;
  public users: any[] = [];
  private logged : boolean = false;
  
  constructor(
    private http: Http,
    public navCtrl: NavController,
    public chattouser: ChattouserService,
    private storage: Storage,) {
    
      this.cfg = AppConfig.cfg;
    }

  ionViewWillEnter() {
    this.storage.get('id_user').then(user => {//finally, this is a Promise()
      this.logged = user;
      if(this.logged == undefined || this.logged == null){//go to login
        console.log('you can see contacts without login');
        this.navCtrl.parent.select(3);
      }else{//normal flow
        this.loadUsers();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  loadUsers() {
    this.users = [];
    this.query().subscribe(
      (users) => {
        this.users = users.concat(this.users);
      }
    );
  }

  query() {
    return this.http.get(`${this.cfg.apiUrl}/${this.cfg.user.list}`).map(res => {
      return res.json();
    });
  }

  chatToUser(id, email){
    console.log("me clickearon " + id);//delete this line when project is completed
    this.chattouser.setId(id);
    this.chattouser.setEmail(email);
    this.navCtrl.parent.select(0);//redirect to chat list page, then popup the respective chat
  }
}
