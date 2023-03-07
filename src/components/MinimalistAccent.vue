<template>
  <div
    :class="{
      'd-inline-block': inline,
      'font-weight-boldish': !noBold
    }"
    class="minimalist-accent bg-gray-light yborder-bottom border-gray w-100 p-2"
  >
    <slot />
  </div>
</template>
<style lang="scss"></style>
<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    noBold: {
      type: Boolean,
      default: false
    }
  }
}
</script>
