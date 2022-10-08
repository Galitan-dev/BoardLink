import { NuxtOptionsServer } from '@nuxt/types/config/server';
import { NuxtOptionsServerMiddleware } from '@nuxt/types/config/server-middleware';
import type { AxiosOptions } from '@nuxtjs/axios';
import DevEnvironment from './dev.env';
import ProdEnvironment from './prod.env';

export interface NuxtConfig {
  proxy: string[];
  axios: AxiosOptions;
  serverMiddleware: NuxtOptionsServerMiddleware;
  server: NuxtOptionsServer;
}

export interface Environment {
  clientPort: number;
  serverPort?: number;
  websocketPort?: number;
  nuxtConfig: (backend: () => Promise<any>) => Promise<NuxtConfig> | NuxtConfig;
  baseURL: string;
}

const env = process.env.APP_ENV !== 'prod' ? DevEnvironment : ProdEnvironment;

export default env;
