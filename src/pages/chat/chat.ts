import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { MessageService } from '../../services';
import { Broadcaster } from 'ng2-cable';
import { ChattouserService } from '../../services/chattouser';
import { UserloggedService } from '../../services/userlogged';

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

  public email: string;
  private id;
  private chatroom;

  constructor(
    private messageService: MessageService,
    private broadcaster: Broadcaster,
    public navCtrl: NavController,
    public chattouser: ChattouserService,
    private userlogged: UserloggedService) {

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

  ionViewWillLoad(){
    this.loadMessages();
  }

  loadMessages() {
    this.chatroom = this.chattouser.getChatroom();
    this.messageService.query(this.chatroom).subscribe(
      (messages) => {
        this.messages = messages.reverse().concat(this.messages);
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