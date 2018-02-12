export let cfg = {
  //ip: 'http://192.168.1.106:8080', this need to be optimized with a variable for the ip
  apiUrl: 'http://192.168.0.9:8080/api/v1',
  cable: 'http://192.168.0.9:8080/cable',
  tokenName: 'access-token',
  user: {
    register: '/auth',
    login: '/auth/sign_in',
    refresh:'/refresh',
    list: '/users',
  },
  chats:{
    list: '/chatrooms?userLogged=',
    content: '/some/address?chatroom=',//to load all the messages
  }, 
};