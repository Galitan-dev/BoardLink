import { io } from 'socket.io-client';
import Vue from 'vue';
import mixin from './mixin';

const socket = io();

export default (_, inject) => {
  inject('socket', socket);
};

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__socket__) {
  Vue.__socket__ = true;
  Vue.mixin(mixin); // Set up your mixin then
}

export * from './decorators';
