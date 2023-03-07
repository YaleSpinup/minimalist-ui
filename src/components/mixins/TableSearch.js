export default {
  data () {
    return {
      searchValue: null
    }
  },
  methods: {
    updateEvent (value) {
      this.$emit('filter-change', value)
    },
    resetSearchValue () {
      this.searchValue = null

      this.updateEvent(this.searchValue)
    }
  }
}
