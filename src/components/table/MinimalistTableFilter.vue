<template>
  <div class="minimalist-table-filter-heading d-flex align-items-center">
    <b-icon-filter
      v-if="showFilterButton"
      scale="1.5"
      class="mr-2 cursor-pointer"
      @click="$emit('filter-display-toggled')"
    />
    <b-input-group
      size="sm"
      class="size"
    >
      <b-form-input
        id="minimalist-table-filter-input"
        v-model="searchValue"
        size="sm"
        type="text"
        placeholder="Type to Search"
        @update="updateEvent(searchValue)"
      />
      <b-input-group-append>
        <span class="input-group-text">
          <b-icon-search v-if="searchValue === '' || searchValue === null" />
          <b-icon-x-circle
            v-else
            class="cursor-pointer"
            @click="resetSearchValue"
          />
        </span>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
import { BIconSearch, BIconXCircle } from 'bootstrap-vue'
import TableSearch from '@/components/_minimalist/mixins/TableSearch'

export default {
  components: {
    BIconSearch,
    BIconXCircle
  },
  props: {
    showFilterButton: {
      type: Boolean,
      default: true
    }
  },
  mixins: [
    TableSearch
  ]
}
</script>
<style lang="scss" scoped>
  .size {
    min-width: 200px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
