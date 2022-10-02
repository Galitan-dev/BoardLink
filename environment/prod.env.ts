import { Environment } from '.';

const clientPort = process.env.PORT || 3000;
const isBuilding = process.env.BUILDING;

export default {
  clientPort: 3000,
  websocketPort: isBuilding ? undefined : 4000,
  nuxtConfig: async (backend) => ({
    proxy: ['http://localhost:4000/socket.io'],
    axios: {
      baseURL: 'http://localhost:3000/api'
    },
    serverMiddleware: {
      '/api': await backend()
    },
    server: {
      host: '0.0.0.0',
      port: clientPort
    }
  }),
  websocketUri: 'http://localhost:3000'
} as Environment;
