<template>
  <div
    class="minimalist-expandable-display position-relative"
    :class="{
      'position-fixed': this.maximized
    }"
  >
    <minimalist-card
      class="expandable-slot-container"
      :class="{ 'maximized': maximized }"
      :title="title"
    >
      <template v-slot:title>
        <span>{{title}}</span>
        <button
          class="btn-expand-restore"
          id="btn-expand-restore"
          type="button"
          :class="{ 'disabled': disabled }"
          :disabled="disabled"
          @click="onToggle"
        >
          <font-awesome-icon
            v-if="!maximized"
            class="btn-icon"
            :icon="['fas', 'window-maximize']"
          />

          <font-awesome-icon
            v-if="maximized"
            class="btn-icon"
            :icon="['fas', 'window-restore']"
          />
        </button>
      </template>
      <slot />
    </minimalist-card>
  </div>
</template>

<script>
import MinimalistCard from '@/components/_minimalist/MinimalistCard'

export default {
  components: {
    MinimalistCard
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maximized: false
    }
  },
  methods: {
    onToggle () {
      this.maximized = !this.maximized
    }
  }
}
</script>

<style lang="scss" scoped>
.minimalist-expandable-display {
  &.position-fixed {
    width: 95%;
    height: 95%;
    top: 2.5%;
    left: 2.5%;
    z-index: 10;
  }
}

.expandable-slot-container {
  &.maximized {
    height: 100%;
    display: flex;
    flex-direction: column;

    &::v-deep {
      .minimalist-card-content, .minimalist-card-content > * {
        flex: 1 1 0;
      }

      .minimalist-card-content {
        display: flex;
        flex-direction: column;
      }

      .minimalist-card-content > * {
        min-height: initial !important;
        max-height: initial !important;
      }
    }
  }
}

.btn-expand-restore {
  background: var(--yblue);
  position: absolute;
  color: #fff;
  top: 0;
  right: 0;
  width: 3em;
  height: 2em;
  border-bottom-left-radius: 0.25em;
  border-top-right-radius: 0.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;

  &.disabled {
    background: $yale-gray-mid;
  }

  &:hover:not(.disabled) {
    background: var(--ylblue);
  }
}

.top-right {
  top: 0.5rem;
  right: 0.5rem;
}

.top-left {
  top: 0.5rem;
  left: 0.5rem;
}

.bottom-left {
  bottom: 0.5rem;
  left: 0.5rem;
}

.bottom-right {
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
