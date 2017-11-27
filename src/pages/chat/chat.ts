import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { MessageService } from '../../services';
import { Broadcaster } from 'ng2-cable';

@Component({
  selector: 'page-messages',
  templateUrl: 'chat.html',
  providers: [MessageService]
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  public messages: any[] = [];
  public page: number = 1;
  public currentSender: any;
  public message: any = {};

  constructor(private messageService: MessageService,
              private broadcaster: Broadcaster,
              public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.checkUser();
    this.loadMessages();
    this.content.scrollToBottom();

    this.broadcaster.on<string>('CreateMessage').subscribe(
      message => {
        this.messages.push(message);
        this.content.scrollToBottom();
        console.log(message);
      }
    );
  }

  loadMessages() {
    this.messageService.query(this.page).subscribe(
      (messages) => {
        this.messages = messages.reverse().concat(this.messages);
      }
    );
  }


  createMessage() {
    this.message['sender'] = this.currentSender;
    this.messageService.create({message: this.message}).subscribe(
      ()=> {
        this.message = {};
      }
    );
  }

  checkUser() {
    if (this.getCurrentSender()) {
      this.currentSender = this.getCurrentSender();
    } else {
      this.currentSender = prompt('Please enter your nickname', 'Active user');
      if (this.currentSender) {
        localStorage.setItem('currentSender', this.currentSender);
      }
    }
  }

  getCurrentSender() {
    return localStorage.getItem('currentSender');
  }
}
