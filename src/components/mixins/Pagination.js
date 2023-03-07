export default {
  props: {
    pagination: {
      type: Boolean,
      default: false
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 0,
      totalRows: (this.items || []).length
    }
  },
  computed: {
    rows () {
      return (this.$attrs.items || []).length
    }
  },
  methods: {
    /**
     * Set the total rows the the filterItems length and reset current page to 1
     *
     * @param {Array} filteredItems
     */
    onFiltered (filteredItems) {
      this.totalRows = (filteredItems || []).length
      this.currentPage = 1

      this.$emit('filtered', filteredItems)
    }
  },
  created () {
    this.perPage = this.itemsPerPage
  }
}
