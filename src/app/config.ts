export let cfg = {
    apiUrl: 'http://192.168.1.104:8080/api/v1',
    tokenName: 'access-token',
    user: {
      register: '/auth',
      login: '/auth/sing_in',
      refresh:'/refresh',
      list: '/users',
    },
    chats:{
      list: '/chatrooms?userLogged='
    }, 
  };