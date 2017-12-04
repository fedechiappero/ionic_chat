# Chat

This project was made as final project of the course Technology Seminary. A private chat room thought to be used by an enterprise for their internal communication. Backend Ruby on Rails APIRest, Frontend Ionic.

## Functionality

* Autentication with Devise.
* Registration is only with an email provided by the enterprise email server (@yourdomain.com by default).
* Private chat rooms, either personal or group.
* All the messages are encrypted in the server-side.
* Admin panel Rails Admin.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
ionic (Ionic CLI) : 3.19.0
cordova (Cordova CLI) : 7.1.0
Ionic Framework    : ionic-angular 3.4.2
Node : v9.2.0
npm  : 5.5.1 

```

### Installing

```

npm install

```    

## Authors

* **Viktor Shmigol** - *Initial work* - [repo](https://github.com/viktor-shmigol/ng2-cable-ionic3-example) extracted from [this post](https://blog.active-bridge.com/how-easily-integrate-rails-actioncable-into-your-angular2-ionic2-application)
* **Chiappero Federico** - *Improve and expand project*



at the start, if the user is not logged in, navCtrl.push (register / login) we will see
once is registered, navCtrl.pop(this (register)) and push login
once is logged in pop this (login) and go to root, chat list