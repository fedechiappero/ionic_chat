import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { MessageService } from '../../services';
import { ChattouserService } from '../../services/chattouser';
import { UserloggedService } from '../../services/userlogged';
import * as AppConfig from '../../app/config'
import { Ng2Cable, Broadcaster } from 'ng2-cable';

@Component({
  selector: 'page-messages',
  templateUrl: 'chat.html',
  providers: [MessageService]
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  public messages: any[] = [];
  public page: number = 1;
  public message: any = {};
  private cfg: any;

  public email: string;
  private id;
  private chatroom;

  constructor(
    private messageService: MessageService,
    private broadcaster: Broadcaster,
    public navCtrl: NavController,
    public chattouser: ChattouserService,
    private userlogged: UserloggedService,
    private ng2cable: Ng2Cable) {

      this.email = this.chattouser.getEmail();

      this.cfg = AppConfig.cfg;
    }

  ionViewDidLoad(){
    this.loadMessages();
    this.content.scrollToBottom();
    this.ng2cable.subscribe(this.cfg.cable, 'ChatChannel', {chatroom_id : this.chattouser.getChatroom()});

    this.broadcaster.on<String>('ReceiveMessage').subscribe(
      message => {
        console.log("executing broadcaster");
        this.messages.push(message);
        this.content.scrollToBottom();
        console.log(message);
      }
    );
  }

  loadMessages() {
    this.chatroom = this.chattouser.getChatroom();
    this.messageService.query(this.chatroom).subscribe(
      (messages) => {
        this.messages = messages.concat(this.messages); //reverse().
      }
    );
  }


  createMessage() {
    this.userlogged.getId().then(user => {
      this.id = user;
      this.message['sender_id'] = this.id;
      this.message['chatroom_id'] = this.chattouser.getChatroom();//this must be a variable
      this.messageService.create({message: this.message}).subscribe(
        ()=> {
          this.message = {};
        }
      );
    }).catch(error =>{
      console.log(error);
    });
  }

  // checkUser() {
  //   if (this.getCurrentSender()) {
  //     this.currentSender = this.getCurrentSender();
  //   } else {
  //     this.currentSender = prompt('Please enter your nickname', 'Active user');
  //     if (this.currentSender) {
  //       localStorage.setItem('currentSender', this.currentSender);
  //     }
  //   }
  // }

  // getCurrentSender() {
  //   return localStorage.getItem('currentSender');
  // }

  ionViewWillLeave() {
    this.ng2cable.unsubscribe();
    this.chattouser.constructor(); 
  }
}