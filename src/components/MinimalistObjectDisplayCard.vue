<template>
  <div class="minimalist-object-display-card">
    <div
      class="object-header p-2"
      :class="{
        'bg-gray-light': hideContent,
        'bg-ylblue text-white': !hideContent
      }"
      @click="onHeaderClick"
    >
      <div
        class="font-weight-bold object-header-title"
        :class="{
          'border-bottom mb-1 pb-1': hasTitleProps
        }"
      >
        {{object[titlePropName]}}
      </div>
      <div class="object-header-title-props-container" v-if="hasTitleProps">
        <span
          v-for="titleProp in titleProps"
          :key="`title-prop-${titleProp}`"
          class="mr-3 pr-3 border-right object-header-title-props"
        >
          <span class="mr-1">{{titleProp}}: </span>
          <span>{{object[titleProp]}}</span>
        </span>
      </div>
    </div>
    <div
      class="p-2 object-content-container"
      :class="{
        'd-none': hideContent
      }"
    >
      <b-container class="px-0" fluid>
        <b-row
          v-for="(value, propertyName) in object"
          :key="`object-display-property-${propertyName}`"
          class="object-content-row border-bottom pb-2 mb-2"
          no-gutters
        >
          <b-col md="3" class="font-weight-bold">
            {{propertyName}}
          </b-col>
          <b-col md="9">
            {{value}}
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      default: () => {}
    },
    titleProps: {
      type: Array,
      default: () => []
    },
    titlePropName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hideContent: true
    }
  },
  computed: {
    hasTitleProps () {
      return this.titleProps.length > 0
    }
  },
  methods: {
    onHeaderClick () {
      this.hideContent = !this.hideContent
    }
  }
}
</script>

<style lang="scss" scoped>
.object-header {
  cursor: pointer;

  &:hover {
    background: $yale-blue-light !important;
    color: white !important;
  }
}

.object-header-title-props-container {
  .object-header-title-props {
    &:last-child {
      border-right: none !important;
      padding-right: 0 !important;
      margin-right: 0 !important;
    }
  }
}

.object-header-title-props {
  border-width: 2px !important;
}

.object-header-title {
  border-width: 2px !important;
}

.object-content-container {
  &::v-deep .object-content-row {
    &:last-child {
      border-bottom: none !important;
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
    }
  }
}
</style>
