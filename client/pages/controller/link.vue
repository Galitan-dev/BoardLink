<template>
  <div class="wrapper">
    <input
      v-for="i in [1, 2, 3, 4]"
      :key="i"
      :ref="'input-' + i"
      type="text"
      placeholder="0"
      maxlength="1"
      @keyup="(event) => onKeyUp(event, i)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class ControllerLink extends Vue {
  mounted() {
    this.getInput(1).focus();
  }

  onKeyUp(event: KeyboardEvent, inputIndex: number) {
    const input = this.getInput(inputIndex);

    if (event.key === 'Backspace' && inputIndex > 1) {
      const prev = this.getInput(inputIndex - 1);
      prev.focus();
      if (input.value.length < 1) prev.value = '';
    } else if (!isNaN(parseInt(event.key))) {
      input.value = event.key;
      if (inputIndex === 4) this.submit();
      else this.getInput(inputIndex + 1).focus();
    } else input.value = input.value.replace(/[^\d]/g, '');
  }

  submit() {
    const linkId =
      'link_' +
      this.getInput(1).value +
      this.getInput(2).value +
      this.getInput(3).value +
      this.getInput(4).value;

    this.$router.push('/controller/' + linkId);
  }

  getInput(index: number) {
    return (this.$refs['input-' + index] as Array<HTMLInputElement>)[0];
  }
}
</script>

<style lang="less" scoped>
input {
  size: 1;
  font-size: 150px;
  width: 85px;
  background: none;
  outline: none;
  color: #deb841;
  border: solid 3px #6d6a75;
  border-radius: 10px;
  padding: 30px;
  caret-color: transparent;

  &:focus {
    border-color: #deb841;
  }
}

.wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  gap: 50px;
}
</style>
