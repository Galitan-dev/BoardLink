import getApp from './app';

export default async function bootstrap() {
  const app = await getApp();
  await app.init();

  const adapter = app.getHttpAdapter();

  return adapter.getInstance();
}
