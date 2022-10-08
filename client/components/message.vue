<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class Message extends Vue {
  @Prop() msg!: string;
}
</script>

<style scoped lang="less">
h1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #deb841;
}
</style>
