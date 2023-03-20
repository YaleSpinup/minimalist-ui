<template>
  <div
    class="minimalist-accordion"
    :class="{
      'opened': show,
      'closed': !show
    }"
  >
    <div
      v-if="showHeader"
      class="header"
      :class="headerClasses"
    >
      <slot name="header">
        {{ headerTitle }}
      </slot>

      <i
        class="fa fa-2x fa-angle-down header-icon text-dark"
        :class="{ rotate: show }"
        @click="onShowChange(!show)"
      />
    </div>
    <b-collapse
      v-model="show"
      :id="id"
    >
      <div class="body-inner" :class="bodyClasses">
        <slot />
        <div
          v-if="showBodyFooter"
          class="body-footer"
          :class="bodyFooterClasses"
        >
          <slot name="bodyFooter">
            {{ bodyFooterTitle }}
          </slot>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { getRandomId } from '../helpers/random'

export default {
  props: {
    headerTitle: {
      type: String,
      default: 'Accordion'
    },
    headerClasses: {
      type: String,
      default: null
    },
    bodyFooterTitle: {
      type: String,
      default: null
    },
    bodyClasses: {
      type: String,
      default: null
    },
    bodyFooterClasses: {
      type: String,
      default: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showBodyFooter: {
      type: Boolean,
      default: false
    },
    display: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: '',
      show: false
    }
  },
  created () {
    this.id = this.getId()
    this.show = this.display
  },
  watch: {
    display (newDisplay) {
      this.show = newDisplay
    }
  },
  methods: {
    getId () {
      return `collapse-${getRandomId()}`
    },
    onShowChange (value) {
      this.show = value
    }
  }
}
</script>

<style lang="scss" scoped>
.minimalist-accordion {
  position: relative;
  z-index: 10;

  &.opened {
    .body {
      overflow: initial;
    }
  }

  .header {
    height: 40px;
    line-height: 40px;
    padding: 0 40px 0 8px;
    position: relative;
    color: #000;
  }

  .body-inner {
    overflow-wrap: break-word;
  }

  .body {
    overflow: hidden;
    border-top: 0;
  }

  .header-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    cursor: pointer;
    transform: rotate(180deg) translateY(-50%);
    transform-origin: top;
    transition: all 0.3s ease;

    &:hover {
      transform: rotate(0deg) translateY(-50%);
      color: var(--success) !important;
    }

    &.rotate {
      transform: rotate(0deg) translateY(-50%);

      &:hover {
        transform: rotate(180deg) translateY(-50%);
      }
    }
  }
}
</style>
