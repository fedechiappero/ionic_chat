import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';



@Component({
  selector: 'chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {


  
  constructor( public navCtrl: NavController) {
    
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

}