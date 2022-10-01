import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway(3001)
export class MessagesGateway {
  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody('text') text: string,
    @MessageBody('date') date: string,
    @MessageBody('author') author: MessageAuthor
  ): void {
    this.messagesService.addMessage({
      text,
      author,
      date: new Date(date)
    });
    socket.broadcast.emit('message', { text, date, author });
  }
}
