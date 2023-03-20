import { getRandomId } from '../../helpers/random'

export default {
  props: {
    titleKey: {
      type: String,
      default: '_title'
    }
  },
  methods: {
    getRandomId () {
      return getRandomId()
    },
    title (selected) {
      if (selected === undefined) {
        return ''
      }

      if (this.titleKey !== '_title' && selected[this.titleKey] !== undefined) {
        return selected[this.titleKey]
      }

      return selected._title ? selected._title : this.key(selected)
    },
    update (selected, value) {
      if (this.titleKey !== '_title' && selected[this.titleKey] !== undefined) {
        selected[this.titleKey] = value
      }

      return selected
    },
    key (selected) {
      if (selected === undefined) {
        return ''
      }

      return selected._key
    }
  }
}
