<template>
  <a href="javascript:void(0)"
     class="m-action-button icon-container border rounded bg-gray-light small form-control"
     :class="[{
      'icon-normal': !small && !xSmall,
      'icon-small': small,
      'icon-xsmall': xSmall,
      'disabled': disabled
     }, `${variant}`]"
     @click="onClick"
  >
    <slot name="all" :options="{ processing }">
      <i v-if="processing" class="fa fa-spinner fa-spin" />
      <font-awesome-icon
        class="icon"
        :class="{'disabled': disabled}"
        :icon="['fas', icon]"
        v-else
      />
      <slot />
    </slot>
  </a>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    },
    processing: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    xSmall: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'success'
    }
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/custom';

.icon {
  transition: all 0.3s ease;

  &.disabled {
    color: $yale-gray !important;
  }
}

.m-action-button {
  font-size: 1.05rem !important;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
  text-decoration: none !important;
  padding: 0;

  .icon {
    width: 45%;
    height: auto;
  }

  &.icon-xsmall {
    width: 24px;
    height: 24px;
  }

  &.icon-small {
    width: 30px;
    height: 30px;
  }

  &.icon-normal {
    width: 40px;
    height: 40px;
  }

  &::v-deep .icon {
    transition: color 0.3s ease;
  }

  &.disabled {
    outline: none;
    box-shadow: none;
  }

  &:not(.disabled):hover {
    &::v-deep .icon { color: #fff; }
  }
}

.primary {
  &::v-deep .icon { color: $primary; }
  &:not(.disabled):hover { background: $primary; }
}

.secondary {
  &::v-deep .icon { color: $secondary; }
  &:not(.disabled):hover { background: $secondary; }
}

.success {
  &::v-deep .icon { color: $success; }
  &:not(.disabled):hover { background: $success; }
}

.danger {
  &::v-deep .icon { color: $danger; }
  &:not(.disabled):hover { background: $danger; }
}

.warning {
  &::v-deep .icon { color: $warning; }
  &:not(.disabled):hover { background: $warning; }
}

.info {
  &::v-deep .icon { color: $info; }
  &:not(.disabled):hover { background: $info; }
}

@media(max-width: #{$becomes-mobile}) {
  .details-commands {
    min-height: 1.5rem;
  }
}
</style>
