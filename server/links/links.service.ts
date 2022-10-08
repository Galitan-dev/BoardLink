import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { BoardDevice, ControllerDevice } from './entities/device.entity';
import { ClientLink, Link, LinkId } from './entities/link.entity';

@Injectable()
export class LinksService {
  protected links: Map<LinkId, Link> = new Map();

  create(socket: Socket): ClientLink {
    const board = new BoardDevice(socket);
    const link = new Link(board);
    this.links.set(link.id, link);
    socket.join(link.id);
    return link.toClient();
  }

  validate(linkId: LinkId): boolean {
    return this.links.has(linkId);
  }

  join(socket: Socket, linkId: LinkId): ClientLink {
    const link = this.links.get(linkId);
    if (!link) throw new NotFoundException();
    if (link.controller) throw new ForbiddenException();

    link.controller = new ControllerDevice(socket);
    socket.join(link.id);

    socket.broadcast.to(link.id).emit('link-joined', link.toClient());
    return link.toClient();
  }
}
