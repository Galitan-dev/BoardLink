import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksGateway } from './links.gateway';
import { LinksService } from './links.service';

@Module({
  controllers: [LinksController],
  providers: [LinksGateway, LinksService]
})
export class LinksModule {}
