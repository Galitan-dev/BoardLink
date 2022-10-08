import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import env from '../../environment';
import { LinkId } from './entities/link.entity';
import { LinksService } from './links.service';

@WebSocketGateway(env.websocketPort)
export class LinksGateway {
  constructor(private linksService: LinksService) {}

  @SubscribeMessage('initialize-link')
  initializeLink(@ConnectedSocket() socket: Socket): void {
    try {
      const link = this.linksService.create(socket);
      socket.emit('link-initialized', link);
    } catch (err) {
      socket.emit('error', err);
    }
  }

  @SubscribeMessage('join-link')
  joinLink(@ConnectedSocket() socket: Socket, @MessageBody() linkId: LinkId) {
    try {
      const link = this.linksService.join(socket, linkId);
      socket.emit('link-joined', link);
    } catch (err) {
      socket.emit('error', err);
    }
  }
}
