<template>
  <div class="link-qr-code">
    <img :src="qrcode" class="qr-code" />
    <span class="link-id">{{ linkId.replace(/[^\d]/g, '') }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { toDataURL as makeQRCode } from 'qrcode';
import env from 'env';

@Component
export default class LinkQrCode extends Vue {
  @Prop() linkId!: string;
  public qrcode!: string;

  data() {
    return {
      qrcode: ''
    };
  }

  @Watch('linkId', { immediate: true })
  async onLinkIdChange(linkId: string) {
    this.qrcode = await makeQRCode(`${env.baseURL}/controller/${linkId}`, {
      color: {
        light: '#37323e',
        dark: '#deb841'
      },
      width: 200,
      margin: 0,
      version: 3,
      errorCorrectionLevel: 'low'
    });
  }
}
</script>

<style scoped>
.link-qr-code {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.link-id {
  color: #deb841;
  font-size: 40px;
}
</style>
