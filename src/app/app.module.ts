import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage } from '../pages/chat/chat';
import { Ng2CableModule } from 'ng2-cable';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth-service';

import { ChatListPage } from '../pages/chat-list/chat-list';
//import { AccountPage } from '../pages/account/account';

import { RegisterPage } from '../pages/register/register'

import { UserModel } from '../models/user.model';
import { ChattouserService } from '../services/chattouser';

let storage = new Storage({});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChatPage,
    ChatListPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    Ng2CableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChatPage,
    ChatListPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    JwtHelper,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    AuthService,
    UserModel,
    ChattouserService
  ]
})
export class AppModule {}
