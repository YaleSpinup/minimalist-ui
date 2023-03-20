<template>
  <div class="minimalist-tab-panel position-relative">
    <minimalist-tab-buttons
      :tabs="tabs"
      :active-tab="watchedTab"
      class="position-absolute"
      :type="type"
      :class="{
        'top': hasPosition('top'),
        'right': hasPosition('right'),
        'bottom': hasPosition('bottom'),
        'left': hasPosition('left'),
        'kill-bottom-border': noBottomBorder
      }"
      @click="handleTabAction"
    />
    <div class="tab-panel-content">
      <slot />
    </div>
  </div>
</template>
<script>
import MinimalistTabButtons from '@/components/_deprecated/MinimalistTabButtons'
import { EventBus } from '@/helpers/eventBus'

export default {
  components: {
    MinimalistTabButtons
  },
  props: {
    tabs: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'top'
    },
    position: {
      type: Array,
      default: () => ['top', 'right']
    },
    noBottomBorder: {
      type: Boolean,
      default: false
    },
    activeTab: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      watchedTab: {}
    }
  },
  created () {
    this.watchedTab = this.activeTab
  },
  watch: {
    activeTab (newActiveTab) {
      this.watchedTab = newActiveTab
    }
  },
  methods: {
    /**
     * Exposes the minimalist tab buttons click event.
     *
     * @param {Object} tab
     */
    handleTabAction (tab) {
      this.$emit('tab-click', tab)
      EventBus.$emit('MinimalistTabPanel::click', tab)
    },
    /**
     * @param {'top'|'right'|'bottom'|'left'} pos
     * @returns {boolean}
     */
    hasPosition (pos) {
      return this.position.includes(pos)
    }
  }
}
</script>

<style lang="scss">
  .kill-bottom-border {
    a {
      border-bottom: 1px solid transparent !important;
    }
  }

  // Leave 1px just for border, can be overridden if flush is needed
  .left {
    left: 0;
  }

  .bottom {
    bottom: 0;
  }

  .right {
    right: 0;
  }

  .top {
    top: 0;
  }

  .minimalist-tab-buttons {
    z-index: 2;
  }
</style>
