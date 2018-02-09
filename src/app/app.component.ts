import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Ng2Cable } from 'ng2-cable';
import { TabsPage } from '../pages/tabs/tabs';
import * as AppConfig from '../app/config'



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  private cfg: any;

  constructor(platform: Platform,
              private ng2cable: Ng2Cable,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.cfg = AppConfig.cfg;

    //this.ng2cable.subscribe(this.cfg.cable, 'ChatChannel');
  }
}
