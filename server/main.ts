import getApp from './app';

async function bootstrap() {
  const app = await getApp();

  app.setGlobalPrefix('/api');
  await app.listen(4000);
}
bootstrap();
