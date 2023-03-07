<template>
  <div class="minimalist-days-of-week d-flex align-items-center rounded border w-100">
    <div
      v-for="day in daysOfWeek"
      class="border-left"
      :class="{
        'selected': isDayInSelected(day)
      }"
      :key="day"
      @click="toggleDay(day)"
    >
      {{getDayAbv(day)}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: [],
      daysOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }
  },
  created () {
    this.selected = this.value
  },
  watch: {
    value (newValue) {
      this.selected = newValue
    }
  },
  methods: {
    getDayAbv (day) {
      return day.substring(0, 3)
    },
    toggleDay (day) {
      if (!this.isDayInSelected(day)) {
        this.addSelected(day)
      } else {
        this.removeSelected(day)
      }

      this.$emit('input', this.selected)
    },
    isDayInSelected (day) {
      return this.selected
        .filter(selectedDay => day === selectedDay).length > 0
    },
    addSelected (day) {
      this.selected = [...this.selected, day]
    },
    removeSelected (day) {
      this.selected = this.selected
        .filter(selectedDay => selectedDay !== day)
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

  .minimalist-days-of-week {
    text-align: center;
    cursor: pointer;

    & > div {
      position: relative;
      width: calc(100% / 7);
      padding: 0.5em;
      transition: 0.3s all ease;
      text-transform: capitalize;

      &.selected {
        background: $yale-blue-light;
        color: #fff;
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
