import { io } from 'socket.io-client';
import Vue from 'vue';
import env from '../../../environment';
import mixin from './mixin';

const socket = io(env.websocketUri);

export default (_, inject) => {
  inject('socket', socket);
};

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__socket__) {
  Vue.__socket__ = true;
  Vue.mixin(mixin); // Set up your mixin then
}
