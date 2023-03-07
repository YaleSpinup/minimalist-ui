<template>
  <b-collapse
    class="m-list-action-reveal"
    :class="{
      'border-top': value
    }"
    v-model="value"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="m-list-action-reveal-wrap">
      <div class="m-list-action-reveal-content mb-3">
        <slot />
      </div>

      <div class="m-list-action-reveal-footer border-top p-2 mt-3 text-right">
        <slot name="footer" :footer="{ text: actionText }">
          <b-btn variant="success" size="sm" :disabled="actionDisabled" @click="$emit('action')">
            <font-awesome-icon :icon="['fas', icon]" />
            {{ actionText }}
          </b-btn>

          <b-btn variant="warning" size="sm" @click="onCancel">
            <font-awesome-icon :icon="['fas', 'times']" />
            Cancel
          </b-btn>
        </slot>
      </div>
    </div>
  </b-collapse>
</template>

<script>
export default {
  props: {
    actionText: {
      type: String,
      default: 'Save'
    },
    actionDisabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'save'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.m-list-action-reveal {
  .m-list-action-reveal-content {
    border-radius: 4px;
  }
}
</style>
