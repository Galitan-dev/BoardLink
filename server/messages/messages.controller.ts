import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  lastMessages(@Query() limit: number) {
    limit = Math.abs(limit);
    if (limit > 50) throw new BadRequestException('limit must be less than 50');

    return this.messagesService.lastMessages(limit);
  }
}
