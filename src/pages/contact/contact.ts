import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as AppConfig from '../../app/config';

import { ChattouserService } from '../../services/chattouser';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private cfg: any;
  public users: any[] = [];
  
  constructor(
    private http: Http,
    public navCtrl: NavController,
    public chattouser: ChattouserService) {
    
      this.cfg = AppConfig.cfg;
    }

  ionViewDidLoad() {
    this.loadUsers();
  }

  loadUsers() {
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
    console.log("me clickearon " + id);
    this.chattouser.setId(id);
    this.chattouser.setEmail(email);
    this.navCtrl.parent.select(0);//redirect to chat list page, then popup the respective chat
  }

}
