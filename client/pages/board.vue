<template>
  <div>
    <Message v-if="link.joined" msg="Ready!" />
    <LinkQrCode v-else-if="link.initialized" :link-id="link.id" />
    <Loader v-else />
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator';
import { Socket } from 'socket.io-client';
import Component from 'vue-class-component';
import { SocketListener } from 'plugins/socket.io';

@Component
export default class Board extends Vue {
  public link!: Link;
  private $socket!: Socket;

  async mounted() {
    await this.$socket.emit('initialize-link');
  }

  @SocketListener
  onLinkInitialized(link: Link) {
    this.link = link;
  }

  @SocketListener
  async onDestroy() {
    this.link = {
      initialized: false
    } as Link;
    await this.$socket.emit('initialize-link');
  }

  @SocketListener
  onLinkJoined(link: Link) {
    this.link = link;
  }

  data() {
    return {
      link: {
        initialized: false
      }
    };
  }
}
</script>
