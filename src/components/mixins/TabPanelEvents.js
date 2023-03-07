import { tabFactory } from '@/factories/tabFactory'

export default {
  data () {
    return {
      actionTabs: [],
      showing: tabFactory('')
    }
  },
  methods: {
    handlesTabClick (tab) {
      this.showing = tab
    }
  }
}
