import { Controller, Get, Query } from '@nestjs/common';
import { LinkId } from './entities/link.entity';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get('validate')
  validateLink(@Query('id') linkId: LinkId) {
    return this.linksService.validate(linkId);
  }
}
