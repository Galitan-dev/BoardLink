import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { RoutesController } from './routes/routes.controller';
import { RoutesService } from './routes/routes.service';

@Module({
  imports: [LinksModule],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class AppModule {}
