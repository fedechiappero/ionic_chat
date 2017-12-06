import { Injectable } from '@angular/core';

/*
  Generated class for the ChattouserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChattouserService {

    email: string;
    id: string;
 
    constructor() {
        this.id = null;
        this.email = null;
    }
  
    setEmail(email) {
        this.email = email;     
    }

    setId(id) {
      this.id = id;     
    }
  
    getEmail() {
        return this.email;
    }

    getId() {
      return this.id;
  }
}