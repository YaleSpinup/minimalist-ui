<template>
  <div class="m-list">
    <div
      v-if="allowNew"
      class="m-list-add-new d-flex justify-content-between align-items-center py-3"
    >
      <h6 class="mb-0 p-0 list-title font-weight-bold">
        <slot name="add-text" :add="{ text: addText }">
          {{ addText }}
        </slot>
      </h6>
      <div :id="addButtonId">
        <minimalist-action-button
          icon="plus"
          :disabled="disableAdd"
          @click="onAddNew"
          x-small
        />

        <b-tooltip
          placement="right"
          :triggers="disableAdd ? 'hover' : ''"
          :target="addButtonId"
        >
          Add action has been disabled.
        </b-tooltip>
      </div>
    </div>
    <minimalist-list-action-reveal
      v-model="displayingReveal"
      v-if="useActionReveal"
      :action-text="revealActionButtonText"
      :action-disabled="revealButtonDisabled"
      :icon="revealActionButtonIcon"
      @action="onRevealAction"
      @cancel="onRevealCancel"
    >
      <slot name="list-reveal" />
    </minimalist-list-action-reveal>
    <b-collapse v-model="displayingList">
      <ul class="m-list-ul" v-if="internalItems.length > 0">
        <minimalist-list-item
          v-for="(item, index) in internalItems"
          :item="item"
          :key="item._key"
          :title-key="titleKey"
          :destroy-uses-modal="item._removeModal"
          :destroy-header-prefix="destroyHeaderPrefix"
          :disable-select="disableSelect || item._selectable === false"
          :class="{
            'is-first': index === 0 && allowNew
          }"
          @click="onClick(item)"
          @remove="onRemove(item)"
        >
          <template #destroy-modal-text>
            <slot name="destroy-modal-text" :item="item" />
          </template>
        </minimalist-list-item>
      </ul>
      <div v-else class="text-center small pt-3" :class="{ 'border-top': allowNew }">
        <slot name="empty">
          The provided list contains no items.
        </slot>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import MinimalistActionButton from '../components/buttons/MinimalistActionButton.vue'
import MinimalistListActionReveal from '../components/MinimalistListActionReveal.vue'
import MinimalistListItem from '../components/MinimalistListItem.vue'
import TitleKeyMixin from '../components/mixins/TitleKeyMixin.vue'
import { getRandomId } from '../helpers/random'

export default {
  components: { MinimalistListActionReveal, MinimalistActionButton, MinimalistListItem },
  mixins: [TitleKeyMixin],
  props: {
    addText: {
      type: String,
      default: 'Add New'
    },
    allowNew: {
      type: Boolean,
      default: false
    },
    disableAdd: {
      type: Boolean,
      default: false
    },
    disableSelect: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    destroyHeaderPrefix: {
      type: String,
      default: 'Destroy'
    },
    destroyCallback: {
      type: Function,
      default: () => {
        return new Promise(resolve => resolve())
      }
    },
    revealActionButtonIcon: {
      type: String,
      default: 'save'
    },
    revealActionButtonText: {
      type: String,
      default: 'Save'
    },
    revealButtonDisabled: {
      type: Boolean,
      default: false
    },
    useActionReveal: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.internalItems = this.items
    this.internalKey = getRandomId()
  },
  data () {
    return {
      internalItems: [],
      displayingReveal: false,
      displayingList: true,
      internalKey: 0
    }
  },
  watch: {
    items: {
      deep: true,
      handler (newItems) {
        const hasActive = newItems.find(i => i._active) !== undefined

        if (newItems.length > 0 && !hasActive) {
          newItems[0]._active = true
        }

        this.internalItems = [...newItems]
      }
    },
    displayingReveal (newDisplayingReveal) {
      this.displayingList = newDisplayingReveal === false
    }
  },
  computed: {
    addButtonId () {
      return `m-list-add-button-${this.internalKey}`
    },
    activeItem () {
      const activeItem = this.internalItems.find(item => item._active)

      return activeItem !== undefined ? activeItem : null
    }
  },
  methods: {
    filterItem (internalItem, item) {
      return internalItem._key !== item._key
    },
    getNextItem (pivotItem) {
      let nextItem = this.activeItem

      if (pivotItem._active) {
        const itemIndex = this.internalItems.indexOf(pivotItem)

        nextItem = this.internalItems[itemIndex + 1] ? this.internalItems[itemIndex + 1] : this.internalItems[itemIndex - 1]
      }

      return nextItem
    },
    onAddNew () {
      if (this.activeItem) {
        this.activeItem._active = false
      }

      if (this.useActionReveal) {
        this.displayingReveal = true
        this.$emit('open-reveal')
        return
      }

      this.$emit('item-added')
    },
    onClick (item) {
      if (this.disableSelect || item._selectable === false) {
        return
      }

      const activeItem = this.internalItems.find(item => item._active)

      if (activeItem !== undefined) {
        activeItem._active = false
      }

      item._active = true

      this.$emit('item-clicked', item)
    },
    async onRemove (removedItem) {
      if (!removedItem._removable) {
        return
      }

      const nextItem = this.getNextItem(removedItem)
      const updatedItemsList = this.internalItems.filter(internalItem => this.filterItem(internalItem, removedItem))

      removedItem._processing = true

      console.debug(`[MINIMALIST] MinimalistList@onRemove: calling destroy callback for ${removedItem._key}`)
      await this.destroyCallback(removedItem, updatedItemsList)
        .then(() => {
          removedItem._active = false
          removedItem._processing = false

          if (nextItem) {
            nextItem._active = true
          }

          this.$emit('item-removed', updatedItemsList)
        })
        .catch(() => {})
      console.debug(`[MINIMALIST] MinimalistList@onRemove: destroy callback returned for ${removedItem._key}`)
    },
    onRevealAction () {
      this.displayingReveal = false
      this.$emit('item-added')
    },
    onRevealCancel () {
      this.displayingReveal = false
      this.$emit('add-canceled')
    }
  }
}
</script>

<style lang="scss" scoped>
.m-list-add-new {
  padding-left: 0.65rem;
  padding-right: 0.65rem;
}

.m-list-ul {
  list-style: none;
  padding-left: 0;
}
</style>
