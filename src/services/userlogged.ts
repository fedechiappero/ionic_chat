import { Injectable } from '@angular/core';

import {Storage} from '@ionic/storage';

@Injectable()
export class UserloggedService {

    email: string;
    private id: string;
    private logged: boolean;

    constructor(private storage: Storage) {
        this.id = null;
        this.email = null;
    }

    getSomeone(){
        this.storage.get('id_user').then(user => {
            let userLogged = user;
            if(userLogged == undefined || userLogged == null){
                this.logged = false;
            }else{
                this.logged = true;
            }
        }).catch(error => {
            console.log(error);
        });
        console.log(this.logged);
        return this.logged;
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
        // this.storage.get('id_user').then(user => {//finally, this is a Promise()
        //     this.loggedUser = user;
        //     if(this.loggedUser == undefined || this.loggedUser == null){
        //       console.log('you`re not logged :(');
        //       console.log("id :"+this.loggedUser);
        //       this.logged = false;      
        //     }else{
        //       console.log(this.storage.get('email_user'));
        //       console.log("id :"+this.loggedUser);
        //       this.logged = true;
        //     }
        //   }).catch(error => {
        //     console.log(error);
        //   });
        return this.storage.get('id_user').then(user =>{
            this.id = user;
            return this.id;
        }).catch(error =>{
            console.log(error);
        });
        
    }
}
