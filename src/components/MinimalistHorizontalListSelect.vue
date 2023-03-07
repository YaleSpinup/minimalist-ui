<template>
  <div
    id="m-horizontal-list-select"
    class="m-horizontal-list-select"
  >
    <label class="m-label" v-if="hasLabel">
      <slot name="label">
      </slot>
    </label>
    <div
      class="m-list-outer list d-flex align-items-center rounded border w-100"
      :class="{
        'border-success': state
      }"
    >
      <div
        class="horizontal-list-item border-left"
        v-for="item in items"
        :id="`horizontal-list-item-${item}`"
        :class="{
          'selected': isSelected(item),
          'disabled': isDisabled(item),
          'bg-success': isSelected(item) && state,
          'success': state
        }"
        :style="{ width: listItemSize }"
        :key="item"
        @click="selectItem(item)"
      >
        {{formatter(item)}}
      </div>
    </div>
    <div class="small m-description">
      <slot name="description">
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    multiSelect: {
      type: Boolean,
      default: false
    },
    formatter: {
      type: Function,
      default: (value) => value
    },
    disabled: {
      type: Array,
      default: () => []
    },
    state: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      selected: null,
      items: []
    }
  },
  created () {
    this.selected = this.value
    this.items = this.options
  },
  watch: {
    value (newValue) {
      this.selected = newValue
    },
    options (newOptions) {
      this.items = newOptions
    }
  },
  computed: {
    /**
     * Calculate the individual list item size percentage and return the style string
     *
     * @returns {string}
     */
    listItemSize () {
      return `calc(100% / ${this.items.length})`
    },
    hasLabel () {
      return this.$scopedSlots.label !== undefined
    }
  },
  methods: {
    isSelected (item) {
      return this.selected.indexOf(item) !== -1
    },
    isDisabled (item) {
      return this.disabled.indexOf(item) !== -1
    },
    /**
     * Select the item
     *
     * @param item
     */
    selectItem (item) {
      if (this.isDisabled(item)) {
        return
      }

      if (this.multiSelect) {
        if (this.selected.indexOf(item) !== -1) {
          this.selected.splice(this.selected.indexOf(item), 1)
        } else {
          this.selected = [...this.selected, item]
        }
      } else {
        this.selected = [item]
      }
      this.$emit('selected', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    margin-bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  input[type="checkbox"] {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .m-description {
    color: var(--gray);
    margin-top: 0.25rem;
  }

  .m-label {
    margin-bottom: 0.5rem;
  }

  .m-list-outer {
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    & > div {
      position: relative;
      padding: 0.45rem;
      transition: 0.3s all ease;
      text-transform: capitalize;

      &.success {
        &:hover {
          background: $success;
          color: #fff;
        }
      }

      &.selected {
        background: $yale-blue-light;
        color: #fff;
      }

      &.disabled {
        background: $yale-gray;
        color: #222;
      }

      &:hover {
        background: $yale-blue-light;
        color: #fff;
      }

      &:active {
        background: $yale-blue-extra-light;
      }

      &:first-child {
        border-left: none !important;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }

      &:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
</style>
