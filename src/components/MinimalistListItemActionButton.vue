<template>
  <div
    class="m-list-item-action h-100 d-flex align-items-center cursor-pointer p-2 border-bottom"
    :class="[
      variant,
      {
        'processing': local.processing,
        'disabled': disabled
      }
    ]"
    @click="onAction"
    :key="`m-action-list-button-${getRandomId()}`"
  >
    <span class="icon-container">
      <i v-if="local.processing" class="fa fa-spinner fa-spin" />
      <font-awesome-icon
        class="m-action-icon"
        v-if="!local.processing"
        :icon="['fas', icon]"
      />
    </span>

    <!-- Destroy Modal -->
    <b-modal
      ref="actionModal"
      header-text-variant="light"
      :header-bg-variant="variant"
      :id="`action-list-item-modal-${getRandomId()}`"
      :title="modalTitle"
      :visible="showModal"
      @ok="onActionConfirm"
      @close="onActionModalClose"
      @cancel="onActionModalCancel"
      @hidden="onActionModalHidden"
    >
      <p>
        <slot name="action-modal-text" />
      </p>
      <div class="font-weight-bold">
        <slot name="action-modal-items" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import TitleKeyMixin from '@/components/_minimalist/mixins/TitleKeyMixin'

export default {
  mixins: [TitleKeyMixin],
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'success'
    },
    modalTitle: {
      type: String,
      default: 'Modal: Title'
    },
    icon: {
      type: String,
      default: 'check'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    processing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      local: {
        processing: false
      }
    }
  },
  mounted () {
    this.local.processing = this.processing
  },
  watch: {
    processing (newValue) {
      this.local.processing = newValue
    }
  },
  methods: {
    onAction () {
      if (!this.disabled) {
        this.$emit('action')
      }
    },
    onActionConfirm () {
      if (!this.disabled) {
        this.$emit('action-confirm')
      }
    },
    onActionModalClose () {
      if (!this.disabled) {
        this.$emit('action-close')
      }
    },
    onActionModalCancel () {
      if (!this.disabled) {
        this.$emit('action-cancel')
      }
    },
    onActionModalHidden () {
      if (!this.disabled) {
        this.$emit('action-hidden')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-list-item-action {
  background: transparent;
  transition: all 0.3s ease;
  color: var(--dark);

  &:not(.processing), &:not(.disabled) {
    &:hover {
      color: #fff;
    }
  }

  .m-action-icon {
    color: $yale-gray-mid;
    transition: all 0.3s ease;
  }

  &:not(.disabled) {
    &:hover {
      .m-action-icon {
        color: #fff;
      }
    }

    &.danger:hover {
      background: var(--danger);
    }
  }
}
</style>
