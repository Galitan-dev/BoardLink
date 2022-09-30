declare type Context = import('@nuxt/types').Context & {
  $socket: import('socket.io-client').Socket;
};
