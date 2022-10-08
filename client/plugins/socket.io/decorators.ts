import Vue from 'vue';
import { createDecorator } from 'vue-class-component';

export function SocketListener(target: Vue, key: string, descriptor: any) {
  createDecorator((componentOptions: any, k) => {
    (componentOptions.sockets || ((componentOptions.sockets = {}) as any))[
      k.startsWith('on')
        ? k
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .slice(2)
            .replace(/^-/, '')
        : k
    ] = descriptor.value;
  })(target, key);
}
