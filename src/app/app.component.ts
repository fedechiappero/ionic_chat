import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Ng2Cable } from 'ng2-cable';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform,
              private ng2cable: Ng2Cable,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.ng2cable.subscribe('http://192.168.11.44:8080/cable', 'ChatChannel');
  }
}
