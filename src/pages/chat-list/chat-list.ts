import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import * as AppConfig from '../../app/config';

import { ChattouserService } from '../../services/chattouser';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {

  private cfg: any;
  public chats: any[] = [];

  constructor( 
    private http: Http,
    public navCtrl: NavController,
    public chattouser: ChattouserService) {
    
      this.cfg = AppConfig.cfg;
    }

  ionViewDidLoad() {//this must be a DidEnter and should refress all the chats
    
    this.loadChats();

    if(this.chattouser.getId() === null && this.chattouser.getEmail() === null){
      console.log("entro para ver todos los chats, no popeo nada");//delete this line when project is completed
    }else{
      console.log("entro despues de buscar a alguien para un mp nuevo");//delete this line when project is completed
      console.log("id: "+this.chattouser.getId() + " | " + "email: " + this.chattouser.getEmail()) //delete this line when project is completed
      this.navCtrl.push(ChatPage); 
    }
  }

  loadChats() {
    this.chats = [];
    this.query().subscribe(
      (chats) => {
        this.chats = chats.concat(this.chats);
      }
    );
  }

  query() {
    //'3' needs to be the logged user
    return this.http.get(`${this.cfg.apiUrl}/${this.cfg.chats.list}` + '3').map(res => {
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