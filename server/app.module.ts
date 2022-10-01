import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { RoutesController } from './routes/routes.controller';
import { RoutesService } from './routes/routes.service';

@Module({
  imports: [MessagesModule],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class AppModule {}
