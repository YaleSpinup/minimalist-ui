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
      <slot name="title" :title="title">
        <div>{{ title }}</div>
      </slot>

      <minimalist-table-filter
        v-if="headingProps.hasSearch"
        :show-filter-button="searchHasFilter"
        @filter-display-toggled="handleFilterDisplayToggle"
        @filter-change="handleFilterUpdate"
      />
    </minimalist-accent>

    <div v-if="showDescription" class="m-table-description p-2 border-bottom">
      <slot name="table-description" />
    </div>

    <minimalist-table-filter-panel :filter-body-footer-title="filterBodyFooterTitle" :display="showFilterPanel">
      <slot name="filterPanel" />

      <template v-slot:footer>
        <slot name="filterPanelFooter" />
      </template>
    </minimalist-table-filter-panel>

    <div class="position-relative">
      <!-- Overlay Transition -->
      <transition name="fade">
        <div v-if="showFilterPanel" class="overlay" />
      </transition>

      <!-- Table -->
      <b-table
        ref="minimalistTable"
        thead-tr-class="lighter-row-headings"
        class="mb-0"
        v-bind="$attrs"
        v-on="$listeners"
        :id="id"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :items="internalItems"
        :fixed="fixed"
        @filtered="onFiltered"
        small
      >
        <!-- Dynamic Slot Fallthrough for All Slots -->
        <template
          v-for="slot in Object.keys($scopedSlots)"
          v-slot:[slot]="scope"
        >
          <slot :name="slot" v-bind="scope" />
        </template>

        <!-- Empty Slot Wrap -->
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
      </b-table>
    </div>

    <div class="pagination-wrap p-0 pt-3 w-100 border-top d-flex align-items-stretch justify-content-between" v-if="pagination">
      <div class="pagination-row-beginning">
        <!-- Pagination Control -->
        <slot name="pagination-begin" />
        <b-pagination
          class="m-0"
          size="sm"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          :disabled="showFilterPanel"
          :aria-controls="id"
        />
        <slot name="pagination-end" />
      </div>
      <div class="pagination-row-end">
        <slot name="pagination-row-end" />
      </div>
    </div>
  </div>
</template>
<script>
import { getRandomId } from '../helpers/random'
import MinimalistAccent from '../components/MinimalistAccent.vue'
import MinimalistTableFilter from '../components/table/MinimalistTableFilter.vue'
import MinimalistTableFilterPanel from '../components/table/MinimalistTableFilterPanel.vue'
import Pagination from '../components/mixins/Pagination'

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
    fixed: {
      type: Boolean,
      default: true
    },
    hasSearch: {
      type: Boolean,
      default: false
    },
    headingDisabled: {
      type: Boolean,
      default: false
    },
    showDescription: {
      type: Boolean,
      default: false
    },
    showFilter: {
      type: Boolean,
      default: false
    },
    persistentRowDetails: {
      type: Boolean,
      default: false
    },
    persistentRowKey: {
      type: String,
      default: 'id'
    },
    id: {
      type: String,
      default: `minimalist-table-${getRandomId()}`
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
      headingProps: {
        title: this.title,
        centerTitle: this.centerTitle,
        hasSearch: this.hasSearch,
        disabled: this.headingDisabled
      },
      filter: '',
      showFilterPanel: false,
      searchHasFilter: this.hasSearch,
      internalItems: []
    }
  },
  created () {
    this.searchHasFilter = this.showFilter
    this.internalItems = this.items
  },
  watch: {
    itemsPerPage (newItemsPerPage) {
      this.perPage = newItemsPerPage
    },
    items (newItems, oldItems) {
      this.internalItems = this.persistentRowDetails ? this.mapShowDetails(newItems, oldItems) : newItems
      this.totalRows = newItems.length
    },
    showFilter (newShowFilter) {
      this.searchHasFilter = newShowFilter
    }
  },
  computed: {
    /**
     * Returns the BTable VueComponent
     *
     * @returns {*&{}}
     */
    table () {
      return this.$refs.minimalistTable
    }
  },
  methods: {
    closeFilterPanel () {
      this.showFilterPanel = false
    },
    /**
     * @param newItems
     * @param oldItems
     *
     * @returns []
     */
    mapShowDetails (newItems, oldItems) {
      const key = this.persistentRowKey

      if (!oldItems) {
        return newItems
      }

      return newItems.map(newItem => {
        const foundOld = oldItems.find(oldItem => oldItem[key] === newItem[key])

        if (foundOld) {
          newItem._showDetails = foundOld._showDetails
        }

        return newItem
      })
    },
    /**
     * Get the row visual size by its key
     * TODO: Write test
     *
     * @param key
     * @returns {*}
     */
    getRowSizeByKey (key) {
      const attempt = (this.$attrs.fields || []).filter(field => field.key === key)

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
  .minimalist-table::v-deep {
    .lighter-row-headings {
      th {
        font-weight: 600 !important;
      }
    }

    th {
      border-bottom-width: 1px !important;
      border-top-width: 1px !important;
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
