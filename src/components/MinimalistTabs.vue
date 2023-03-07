<template>
  <b-tabs
    v-bind="$attrs"
    class="minimalist-tabs"
    :class="{
      'align-top': alignY === 'top',
      'align-bottom': alignY === 'bottom',
      'align-left': $attrs.align === 'left',
      'align-right': $attrs.align === 'right'
    }"
    pills
    v-on="$listeners"
  >
    <slot />
  </b-tabs>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    alignY: {
      type: String,
      default: 'top'
    }
  }
}
</script>
<style lang="scss" scoped>
.minimalist-tabs {
  &::v-deep .nav-link {
    color: #222 !important;
    border-radius: 0 !important;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    &.active {
      background: #f9f9f9 !important;
      border: 1px solid #ddd;
    }

    &:hover {
      background: #ddd !important;
    }

    &:focus {
      outline: none;
    }
  }

  &.align-top {
    border-top: 1px solid #ddd;

    &::v-deep .nav-link {
      border-top: none !important;
    }
  }

  &.align-bottom {
    border-bottom: 1px solid #ddd;

    &::v-deep .nav-link {
      border-bottom: none !important;
    }
  }

  &.align-right {}

  &.align-left {}
}
</style>
