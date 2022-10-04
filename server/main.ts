import env from '../environment';
import getApp from './app';

async function bootstrap() {
  const app = await getApp();

  app.setGlobalPrefix('/api');
  await app.listen(env.serverPort as number);
}
bootstrap();
