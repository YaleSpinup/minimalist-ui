import { getLifeCycleStatuses } from '@/models/taskLifeCycle'

export default {
  data () {
    return {
      taskStatuses: getLifeCycleStatuses()
    }
  },
  computed: {
    selectedTaskStatuses: {
      get () {
        return this.$store.getters['container/selectedTaskStatuses']
      },
      set (value) {
        this.$store.commit('container/selectedTaskStatuses', value)
      }
    }
  },
  methods: {
    /**
     * @param {string } status
     */
    handleStatusClick (status) {
      if (this.statusSelected(status)) {
        this.selectedTaskStatuses = this.selectedTaskStatuses.filter(s => s !== status)
      } else {
        this.selectedTaskStatuses.push(status)
      }

      this.$emit('status-filter-clicked', this.selectedTaskStatuses.map(status => status.toUpperCase()))
    },
    /**
     * @param {string } status
     * @returns {boolean}
     */
    statusSelected (status) {
      return this.selectedTaskStatuses.indexOf(status) !== -1
    },
    /**
     * @param {string } status
     * @returns {string}
     */
    statusClasses (status) {
      const selected = this.statusSelected(status) ? 'active' : ''

      return `${status.toLowerCase()} ${selected}`
    },
    /**
     * Reset the selected task statuses
     */
    resetStatuses () {
      this.selectedTaskStatuses = []
      this.$emit('reset-selected-tasks-statuses')
    }
  }
}
