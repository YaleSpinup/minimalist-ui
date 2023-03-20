<template>
  <div>
    <b-container class="m-panes px-0">
      <b-row no-gutters>
        <b-col :md="size.left">
          <div class="py-4">
            <b-tabs v-model="tabIndex" class="m-navigation-tabs">
              <slot name="tabs" />
            </b-tabs>
          </div>
        </b-col>
        <b-col
          class="m-pane-container"
          :md="size.right"
          :class="{
            'border-left pl-4 py-4': !isMobile,
            'pl-0 border-0': isMobile
          }"
        >
          <slot name="panes-outer" :info="{ tabIndex }">
            <slot :name="selectedSlot" />
          </slot>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { isMobile } from '@/helpers'

export default {
  props: {
    size: {
      type: Object,
      default: () => {
        return {
          left: 3,
          right: 9
        }
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  mounted () {
    this.tabIndex = this.activeIndex
  },
  watch: {
    activeIndex (newActiveIndex) {
      this.tabIndex = newActiveIndex
    }
  },
  computed: {
    selectedSlot () {
      const scopedSlotKeys = Object.keys(this.$scopedSlots).filter(key => !key.indexOf('pane-'))
      const selectedSlot = scopedSlotKeys[this.tabIndex]

      if (selectedSlot === undefined) {
        return {}
      }

      return selectedSlot
    },
    isMobile () {
      return isMobile()
    }
  }
}
</script>

<style lang="scss" scoped>
.m-navigation-tabs {
  &::v-deep .nav-item {
    &:first-child {
      .nav-link {
        border-left: none;
      }
    }

    .nav-link {
      border-radius: 0;
      padding: 0.5rem .65rem;
      border-bottom: 1px solid #ddd !important;
      transition: all 0.3s ease;
      color: #222;

      &:hover {
        background-color: darken(#f9f9f9, 5%);
      }

      &.active {
        background: #f9f9f9;
      }
    }
  }
}

.m-pane-container {
  min-height: 500px;
}
</style>
