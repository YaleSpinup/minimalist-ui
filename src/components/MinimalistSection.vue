<template>
  <div class="m-details-section">
    <minimalist-accordion
      ref="accordion"
      :display="internalDisplay"
      :header-classes="combinedHeaderClasses"
    >
      <template v-slot:header>
        <h5 class="mr-2 mt-1">
          <slot name="header" />
        </h5>
      </template>
      <div class="section-description small">
        <!-- TODO: Write Test -->
        <div class="pt-2 description" v-if="hasDescription">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <slot name="above-content" />
      <div class="content" :class="{ 'border-top mt-2 pt-3': hasDescription }">
        <slot />
      </div>
      <slot name="below-content" />
    </minimalist-accordion>
  </div>
</template>

<script>
import MinimalistAccordion from '../components/MinimalistAccordion'

export default {
  components: { MinimalistAccordion },
  inheritAttrs: false,
  props: {
    description: {
      type: String,
      default: ''
    },
    display: {
      type: Boolean,
      default: false
    },
    headerClasses: {
      type: String,
      default: 'border-bottom pl-0'
    }
  },
  watch: {
    display (newValue) {
      this.internalDisplay = newValue
    }
  },
  computed: {
    hasDescription () {
      return this.description !== '' || this.$slots.description !== undefined
    },
    combinedHeaderClasses () {
      const headerNeedsMargin = !this.hasDescription

      if (headerNeedsMargin) {

      }
      return headerNeedsMargin ? this.headerClasses + ' mb-3' : this.headerClasses
    }
  },
  data () {
    return {
      internalDisplay: false
    }
  },
  created () {
    this.internalDisplay = this.display
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}

@media(max-width: #{$becomes-mobile}) {
  .m-details-section {
    font-size: 14px;

    &::v-deep h5 {
      font-size: .9rem;
    }
  }
}
</style>
