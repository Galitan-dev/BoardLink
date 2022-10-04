import Vue from 'vue';
import { createDecorator } from 'vue-class-component';

export function SocketListener(target: Vue, key: string, descriptor: any) {
  createDecorator((componentOptions: any, k) => {
    (componentOptions.sockets || ((componentOptions.sockets = {}) as any))[
      k.startsWith('on') ? k[2].toLowerCase() + k.slice(3) : k
    ] = descriptor.value;
  })(target, key);
}
