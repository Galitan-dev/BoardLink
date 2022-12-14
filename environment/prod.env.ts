import { Environment } from '.';

const clientPort = process.env.PORT || 3000;
const isBuilding = process.env.BUILDING;

export default {
  clientPort: 3000,
  websocketPort: isBuilding ? undefined : 4000,
  nuxtConfig: async (backend) => ({
    proxy: ['http://localhost:4000/socket.io'],
    axios: {
      baseURL: 'http://localhost:' + clientPort + '/api'
    },
    serverMiddleware: {
      '/api': await backend()
    },
    server: {
      host: '0.0.0.0',
      port: clientPort
    }
  }),
  baseURL: 'https://boardlink.ethanwtr.ml'
} as Environment;
