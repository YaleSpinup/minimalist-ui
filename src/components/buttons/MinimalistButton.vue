<template>
  <b-btn
    v-bind="$attrs"
    v-on="$listeners"
    :size="size"
    :disabled="isDisabled"
  >
    <font-awesome-icon v-if="!processing && icon.length !== 0" :icon="icon" :size="iconSize" />
    <i v-if="processing" class="fa fa-spinner fa-spin" />
    <slot />
  </b-btn>
</template>

<script>
export default {
  name: 'm-btn',
  props: {
    icon: {
      type: Array,
      default: () => []
    },
    processing: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    }
  },
  computed: {
    isDisabled () {
      return this.processing || this.disabled
    },
    /**
     * Gets the current icon size for font awesome based on desired button size
     *
     * @returns {string}
     */
    iconSize () {
      // Default font awesome icon size is 1x, not medium
      let iconSize = '1x'

      // If size is something other than md, set it to that size since there is a sm and lg
      // on the underlying font-awesome icon
      if (this.size !== 'md') {
        iconSize = this.size
      }

      // return the size
      return iconSize
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
