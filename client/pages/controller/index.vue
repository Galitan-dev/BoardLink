<template>
  <div>
    <Message v-if="link.joined" msg="Ready!" />
    <Loader v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Socket } from 'socket.io-client';
import { SocketListener } from 'plugins/socket.io';

@Component
export default class Controller extends Vue {
  public link!: Link;
  private $socket!: Socket;

  data() {
    return {
      link: {
        joined: false
      }
    };
  }

  @SocketListener
  onLinkJoined(link: Link) {
    this.link = link;
  }

  @SocketListener
  async onDestroy() {
    await this.$router.push('/controller/link');
  }

  async mounted() {
    const linkId: string = this.$route.params.linkId;

    if (!linkId || !(await this.$axios.get('/links/validate?id=' + linkId)))
      return await this.$router.push('/controller/link');

    window.history.replaceState(null, '', '/controller');

    await this.$socket.emit('join-link', linkId);
  }
}
</script>
