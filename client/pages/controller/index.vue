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
    this.$cookies.set('link', link);
  }

  async mounted() {
    const linkId: string =
      this.$route.params.linkId || this.$cookies.get('linkId');

    if (!linkId || !(await this.$axios.get('/links/validate?id=' + linkId)))
      return await this.$router.push('/controller/link');

    await this.$socket.emit('join-link', linkId);
  }
}
</script>
