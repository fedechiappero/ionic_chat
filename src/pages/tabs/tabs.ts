import { Component } from '@angular/core';

import { ChatListPage } from '../chat-list/chat-list';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { AccountPage } from '../account/account'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChatListPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = AccountPage;

  constructor() {

  }
}
