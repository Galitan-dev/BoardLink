import { Socket } from 'socket.io';

export enum DeviceType {
  Board,
  Controller
}

export class Device<T extends DeviceType> {
  type: T;
  socket: Socket;

  constructor(type: T, socket: Socket) {
    this.type = type;
    this.socket = socket;
  }

  get isBoard(): boolean {
    return this.type === DeviceType.Board;
  }

  get isController(): boolean {
    return this.type === DeviceType.Controller;
  }

  async emit(event: string, ...args: any[]) {
    await this.socket.emit(event, ...args);
  }
}

export class BoardDevice extends Device<DeviceType.Board> {
  constructor(socket: Socket) {
    super(DeviceType.Board, socket);
  }
}

export class ControllerDevice extends Device<DeviceType.Controller> {
  constructor(socket: Socket) {
    super(DeviceType.Controller, socket);
  }
}
