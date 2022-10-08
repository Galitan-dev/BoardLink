<!-- client/pages/index.vue -->
<template>
  <div>
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <ul ref="messages" class="messages">
            <li v-for="(msg, index) in messages" :key="index" class="message">
              <i
                :title="msg.date.toLocaleString()"
                :style="`color: ${msg.author.color};`"
              >
                {{ msg.author.name }}:
              </i>
              {{ msg.text }}
            </li>
          </ul>
        </div>
        <div class="bottomArea">
          <input
            v-model="message"
            class="inputMessage"
            type="text"
            placeholder="Type here..."
            @keyup.enter="sendMessage"
          />
          <span class="author" :style="`color: ${author.color};`">{{
            author.name
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Socket } from 'socket.io-client';
import { Component, Vue } from 'nuxt-property-decorator';
import { SocketListener } from 'plugins/socket.io';

@Component
export default class Index extends Vue {
  public messages!: Message[];
  public message!: string;
  public author!: MessageAuthor;
  private $socket!: Socket;

  async asyncData({ $axios }: Context) {
    const messages = await $axios.$get('/messages');

    const authorName = (
      await $axios.$get(
        'https://randommer.io/api/Name?nameType=fullname&quantity=1',
        {
          headers: {
            'X-Api-Key': 'bc14a09a5e54447189d3c9b0d0254829'
          }
        }
      )
    )[0];

    return {
      messages,
      author: { name: authorName, color: randomColor() }
    };
  }

  @SocketListener
  onMessage(message: Message) {
    this.messages.push({
      text: message.text,
      date: new Date(message.date),
      author: message.author
    });
  }

  data() {
    return {
      message: ''
    };
  }

  sendMessage() {
    const message: Message = {
      text: this.message,
      date: new Date(),
      author: this.author
    };

    this.messages.push(message);
    this.$socket.emit('message', message);
    this.message = '';
  }
}

function randomColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const random = Math.random();
    const bit = (random * 16) | 0;
    color += bit.toString(16);
  }
  return color;
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
html,
input {
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  word-wrap: break-word;
}
/* Pages */
.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
.page {
  height: 100%;
  position: absolute;
  width: 100%;
}
/* Font */
.messages {
  font-size: 150%;
}
.inputMessage {
  font-size: 100%;
}
.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}
/* Messages */
.chatArea {
  height: 100%;
  padding-bottom: 60px;
}
.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}
/* Input */
.bottomArea {
  border: 10px solid #3b8070;
  bottom: 0;
  left: 0;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.inputMessage {
  outline: none;
  border: none;
  height: 100%;
  width: 80%;
}
.author {
  width: fit-content;
}
</style>
