import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { MessageService } from '../../services';
import { Broadcaster } from 'ng2-cable';
import { ChattouserService } from '../../services/chattouser';

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

  public email: string;

  constructor(
    private messageService: MessageService,
    private broadcaster: Broadcaster,
    public navCtrl: NavController,
    public chattouser: ChattouserService) {

      this.email = this.chattouser.getEmail();
    }

  

  // ionViewDidLoad() {
  //   this.checkUser();
  //   this.loadMessages();
  //   this.content.scrollToBottom();

  //   this.broadcaster.on<string>('CreateMessage').subscribe(
  //     message => {
  //       this.messages.push(message);
  //       this.content.scrollToBottom();
  //       console.log(message);
  //     }
  //   );
  // }

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
    this.chattouser.constructor(); 
  }
}


// jQuery(document).on 'turbolinks:load', ->
// messages = $('#messages')
// if $('#messages').length > 0
//   messages_to_bottom = -> messages.scrollTop(messages.prop("scrollHeight"))

//   messages_to_bottom()

//   App.global_chat = App.cable.subscriptions.create {
//       channel: "ChatRoomsChannel"
//       chat_room_id: messages.data('chat-room-id')
//     },
//     connected: ->
//       # Called when the subscription is ready for use on the server

//     disconnected: ->
//       # Called when the subscription has been terminated by the server

//     received: (data) ->
//       messages.append data['message']
//       messages_to_bottom()

//     send_message: (message, chat_room_id) ->
//       @perform 'send_message', message: message, chat_room_id: chat_room_id


//   $('#new_message').submit (e) ->
//     $this = $(this)
//     textarea = $this.find('#message_body')
//     if $.trim(textarea.val()).length > 1
//       App.global_chat.send_message textarea.val(), messages.data('chat-room-id')
//       textarea.val('')
//     e.preventDefault()
//     return false