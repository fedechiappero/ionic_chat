import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as AppConfig from '../app/config'

@Injectable()
export class MessageService {

  private cfg: any;

  constructor(private http: Http) {
    this.cfg = AppConfig.cfg;
  }

  query(chatroom:any) {
    return this.http.get(`${this.cfg.apiUrl}/messages?chatroom=${chatroom}`).map(res => {
      return res.json();
    });
  }

  create(message:any) {
    return this.http.post(`${this.cfg.apiUrl}/messages`, message).map(res => {
      return res.json();
    });
  }
}
