import { Environment } from '.';

const clientPort = process.env.PORT || 3000;

export default {
  clientPort,
  serverPort: 4000,
  nuxtConfig: () => ({
    proxy: ['http://localhost:4000/socket.io', 'http://localhost:4000/api'],
    axios: {
      baseURL: 'http://localhost:' + clientPort + '/api'
    },
    serverMiddleware: {},
    server: {
      host: 'localhost',
      port: clientPort
    }
  })
} as Environment;
