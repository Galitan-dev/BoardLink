import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
  }

  lastMessages(limit: number = 50) {
    return this.messages.slice(-limit);
  }
}
