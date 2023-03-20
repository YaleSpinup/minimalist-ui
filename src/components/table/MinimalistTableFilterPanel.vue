<template>
  <div class="minimalist-table-filter-panel">
    <slot name="empty">
      <div class="no-filters" />
    </slot>

    <minimalist-accordion
      :show-header="false"
      :show-body-footer="true"
      :display="display"
      :body-footer-title="filterBodyFooterTitle"
      body-classes="bg-gray-light-alt"
      body-footer-classes="bg-gray-light body-footer yborder-gray p-2"
      class="position-absolute w-100"
    >
      <slot />
      <template v-slot:bodyFooter>
        <slot name="footer" />
      </template>
    </minimalist-accordion>
  </div>
</template>
<script>

export default {
  inheritAttrs: false,
  props: {
    filterBodyFooterTitle: {
      type: String,
      default: null
    },
    display: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .body-footer {
    border-top: 1px solid #dddddd;
    border-bottom: 4px solid #dddddd;
  }
</style>
