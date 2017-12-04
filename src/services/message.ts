import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
  public apiUrl = 'http://192.168.11.44:8080/api/v1';

  constructor(private http: Http) {
  }

  query(page:any) {
    return this.http.get(`${this.apiUrl}/messages?page=${page}`).map(res => {
      return res.json();
    });
  }

  create(message:any) {
    return this.http.post(`${this.apiUrl}/messages`, message).map(res => {
      return res.json();
    });
  }
}
