/** @type {import("vue").ComponentOptions} */
export default {
  mounted() {
    if (this.$options.sockets) {
      Object.keys(this.$options.sockets).forEach((event) => {
        this.$socket.on(event, this.$options.sockets[event].bind(this), this);
      });
    }
  }
};
