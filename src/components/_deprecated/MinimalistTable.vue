<template>
  <div class="minimalist-table">
    <!-- Heading Slot -->
    <minimalist-accent
      :class="{
        'text-center': headingProps.centerTitle,
        'd-flex justify-content-between align-items-center': headingProps.hasSearch,
      }"
      v-if="!headingProps.disabled"
    >
      <slot
        name="title"
        :title="title"
      >
        <div>{{ title }}</div>
      </slot>
      <minimalist-table-filter
        v-if="headingProps.hasSearch"
        :show-filter-button="searchHasFilter"
        @filter-display-toggled="handleFilterDisplayToggle"
        @filter-change="handleFilterUpdate"
      />
    </minimalist-accent>

    <minimalist-table-filter-panel
      :filter-body-footer-title="filterBodyFooterTitle"
      :display="showFilterPanel"
    >
      <slot name="filterPanel" />
      <template v-slot:footer>
        <slot name="filterPanelFooter" />
      </template>
    </minimalist-table-filter-panel>

    <div class="position-relative">
      <transition
        name="fade"
      >
        <div
          v-if="showFilterPanel"
          class="overlay"
        />
      </transition>

      <!-- Table -->
      <b-table
        :id="id"
        ref="minimalistTable"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :items="items"
        v-bind="$attrs"
        v-on="$listeners"
        thead-tr-class="lighter-row-headings"
        class="mb-0"
        fixed
        small
        @filtered="onFiltered"
      >
        <!-- Dynamic Slot (Fallthrough) -->
        <template
          v-for="field in $attrs.fields"
          v-slot:[`cell(${field.key})`]="data"
        >
          <!-- Bind it to our templates dynamic slot so it can fall through -->
          <slot
            :name="field.key"
            :[field.key]="data"
          >
            {{ data.value }}
          </slot>
        </template>

        <!-- Empty Slot Wrap -->
        <!-- TODO: See if there is a way for slots to just simply fall through -->
        <template v-slot:empty>
          <div class="text-center small p-3">
            <slot name="empty" />
          </div>
        </template>

        <!-- Apply Sizing Prop from Fields -->
        <!-- TODO: Write test for column sizing logic -->
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: getRowSizeByKey(field.key) }"
          >
        </template>

        <template v-slot:row-details="row">
          <slot name="row-details" :row-details="row" />
        </template>
      </b-table>
    </div>

    <div
      v-if="pagination"
      class="pagination-wrap p-0 pt-3 w-100 border-top d-flex align-items-stretch"
    >
      <!-- Pagination Control -->
      <slot name="pagination-being" />
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        :disabled="showFilterPanel"
        :aria-controls="id"
        size="sm"
        class="m-0"
      />
      <slot name="pagination-end" />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/mixins/Pagination'
import MinimalistAccent from '@/components/MinimalistAccent'
import MinimalistTableFilter from '@/components/table/MinimalistTableFilter'
import MinimalistTableFilterPanel from '@/components/table/MinimalistTableFilterPanel'
import { getRandomId } from '@/helpers/random'

export default {
  components: {
    MinimalistAccent,
    MinimalistTableFilter,
    MinimalistTableFilterPanel
  },
  mixins: [
    Pagination
  ],
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    filterBodyFooterTitle: {
      type: String,
      default: null
    },
    centerTitle: {
      type: Boolean,
      default: false
    },
    hasSearch: {
      type: Boolean,
      default: false
    },
    headingDisabled: {
      type: Boolean,
      default: false
    },
    showFilter: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // Needed for aria reference
      id: `minimalist-table-${getRandomId()}`,
      headingProps: {
        title: this.title,
        centerTitle: this.centerTitle,
        hasSearch: this.hasSearch,
        disabled: this.headingDisabled
      },
      filter: '',
      showFilterPanel: false,
      searchHasFilter: this.hasSearch
    }
  },
  created () {
    this.searchHasFilter = this.showFilter
  },
  watch: {
    itemsPerPage (newItemsPerPage) {
      this.perPage = newItemsPerPage
    },
    items (newItems) {
      this.totalRows = newItems.length
    },
    showFilter (newShowFilter) {
      this.searchHasFilter = newShowFilter
    }
  },
  methods: {
    closeFilterPanel () {
      this.showFilterPanel = false
    },
    /**
     * Get the row visual size by its key
     * TODO: Write test
     *
     * @param key
     * @returns {*}
     */
    getRowSizeByKey (key) {
      const attempt = this.$attrs.fields.filter(field => field.key === key)

      return !attempt.length ? '100%' : attempt[0].size
    },
    /**
     * Handles the filter change
     * TODO: Write test
     *
     * @param value
     */
    handleFilterUpdate (value) {
      this.filter = value
    },
    handleFilterDisplayToggle () {
      this.showFilterPanel = !this.showFilterPanel

      // Trigger an emit so other components can react to it
      this.$emit('filter-display-toggled', this.showFilterPanel)
    },
    refresh () {
      this.$refs.minimalistTable.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;

  }

  .minimalist-table::v-deep .lighter-row-headings {
    th {
      font-weight: 600 !important;
    }
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .overlay {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(194, 165, 165, 0.2);
  }
</style>
