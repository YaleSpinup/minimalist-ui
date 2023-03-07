<template>
  <div class="minimalist-card bg-gray-light p-3 border rounded">
    <!-- Title -->
    <h6 class="minimalist-card-title mb-3 font-weight-boldish" v-if="hasTitle">
      <slot name="title" :title="title">
        {{title}}
      </slot>
    </h6>

    <!-- Content -->
    <slot name="content-wrap">
      <minimalist-card-content>
        <slot />
      </minimalist-card-content>
    </slot>
  </div>
</template>

<script>
import { isEmpty } from '@/helpers/general'
import MinimalistCardContent from '@/components/_minimalist/MinimalistCardContent'

export default {
  components: { MinimalistCardContent },
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    hasTitle () {
      return !isEmpty(this.title)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
