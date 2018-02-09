import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import * as AppConfig from '../../app/config';

import { ChattouserService } from '../../services/chattouser';
import { UserloggedService } from '../../services/userlogged';

import { ChatPage } from '../chat/chat';

import {Storage} from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {

  private cfg: any;
  public chats: any[] = [];
  private logged : boolean = false;
  private id;

  constructor( 
    private http: Http,
    public navCtrl: NavController,
    public chattouser: ChattouserService,
    private storage: Storage,
    private userlogged: UserloggedService) {
    
      this.cfg = AppConfig.cfg;
    }

  ionViewDidEnter() {
    this.storage.get('id_user').then(user => {
      this.logged = user;
      if(this.logged == undefined || this.logged == null){//go to login
        console.log('you cant see chats without login');
        this.navCtrl.parent.select(3);
      }else{//normal flow
        this.loadChats();
        
        if(this.chattouser.getId() === null && this.chattouser.getEmail() === null){
          console.log("entro para ver todos los chats, no popeo nada");//delete this line when project is completed
        }else{
          console.log("entro despues de buscar a alguien para un mp nuevo");//delete this line when project is completed
          console.log("id: "+this.chattouser.getId() + " | " + "email: " + this.chattouser.getEmail()) //delete this line when project is completed
          this.navCtrl.push(ChatPage); 
        }
      }
    }).catch(error => {
      console.log(error);
    });
  }

  loadChats() {
    this.chats = [];
    this.query().subscribe(
      (chats) => {
        this.chats = chats.concat(this.chats);
      });
  }

  query() {
    //'2' needs to be the logged user
    return this.http.get(`${this.cfg.apiUrl}/${this.cfg.chats.list}` + '2').map(res => {
      return res.json();
    });
  }

  chatToUser(id, email){
    console.log("me clickearon " + id);//delete this line when project is completed
    this.chattouser.setId(id);
    this.chattouser.setEmail(email);
    this.navCtrl.push(ChatPage);
  }

  doRefresh(refresher){
    this.loadChats();
 
    if(refresher != 0)
      refresher.complete();
  }; 
}


// loadChats() {
//   this.chats = [];
//   this.query().subscribe(
//     (chats) => {
//       this.chats = chats.concat(this.chats);
//     });
// }

// query() {
//   //'2' needs to be the logged user
//   return this.http.get(`${this.cfg.apiUrl}/${this.cfg.chats.list}` + '2').map(res => {
//     return res.json();
//   });
// }