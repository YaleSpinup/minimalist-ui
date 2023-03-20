import Tab from '@/models/tab'
import _ from 'lodash'

const tabFactory = (key, target = '#') => {
    const tab = _.cloneDeep(Tab)
    tab.key = key
    tab.target = target

    return tab
}

export { tabFactory }
