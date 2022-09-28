<!-- client/pages/index.vue -->
<template>
  <div>{{ hello }}</div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Index'
})
export default class Index extends Vue {
  public hello!: string;

  async asyncData({ $axios, query }: Context) {
    let hello;
    try {
      hello = await $axios.$get('/', { params: query });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return {
      hello
    };
  }
}
</script>
