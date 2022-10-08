import { BoardDevice, ControllerDevice } from './device.entity';

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type LinkId = `link_${Digit}${Digit}${Digit}${Digit}`;

export interface ClientLink {
  id: LinkId;
  initialized: boolean;
  joined: boolean;
}

export class Link {
  board: BoardDevice;
  controller: ControllerDevice;
  id: LinkId;

  constructor(board: BoardDevice) {
    this.board = board;
    this.id = Link.generateId();
  }

  toClient(): ClientLink {
    return {
      id: this.id,
      initialized: this.isInitialized,
      joined: this.isJoined
    };
  }

  broadcast(event: string, ...args: any[]): void {
    this.board?.emit?.(event, ...args);
    this.controller?.emit?.(event, ...args);
  }

  get isInitialized(): boolean {
    return !!this.board;
  }

  get isJoined(): boolean {
    return !!this.controller;
  }

  static generatedIds: LinkId[] = [];
  static generateId(): LinkId {
    let id: LinkId;
    do {
      const number = Math.floor(Math.random() * 10000);
      id = `link_${String(number).padStart(4, '0')}` as LinkId;
    } while (this.generatedIds.includes(id));
    this.generatedIds.push(id);

    return id;
  }
}
