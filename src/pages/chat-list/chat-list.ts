import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ChattouserService } from '../../services/chattouser';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {

  constructor( 
    public navCtrl: NavController,
    public chattouser: ChattouserService) {
    
    }

  /*
  let modal = this.modalCtrl.create(ChatPage);
    modal.present();
  
    this.navCtrl.push(SecondPage, {
    param1: 'John', param2: 'Johnson'
    });

    on the other view:
    this.parameter1 = navParams.get('param1'); 
    this.parameter2 = navParams.get('param2');
  
  
    */

  ionViewDidEnter() {
    if(this.chattouser.getId() === null && this.chattouser.getEmail() === null){
      console.log("entro para ver todos los chats, no popeo nada");
    }else{
      console.log("entro despues de buscar a alguien para un mp nuevo");
      console.log("id: "+this.chattouser.getId() + " | " + "email: " + this.chattouser.getEmail()) 
      this.navCtrl.push(ChatPage); 
    }
  }

}