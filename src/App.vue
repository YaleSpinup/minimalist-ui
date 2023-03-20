<template>
  <div>
    <minimalist-card title="Test">
      foo
    </minimalist-card>
  </div>
</template>

<script>
import MinimalistCard from './components/MinimalistCard.vue'

export default {
  components: {
    MinimalistCard
  }
}
</script>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
</style>
