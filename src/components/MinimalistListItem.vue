<template>
  <li
    class="m-list-item d-flex w-100"
    :class="{
      'select-disabled': disableSelect,
      'active': internalItem._active,
      'is-new': internalItem._new
    }"
  >
    <div class="m-list-item-content-wrap d-flex w-100" @click="onClick">
      <div class="accent" :class="{ 'has-error': internalItem._error }"></div>
      <div
        class="m-list-item-content d-flex py-3 justify-content-between w-100 border-bottom"
      >
        <div class="font-weight-normal">
          <font-awesome-icon class="m-list-item-title-icon mr-1" v-if="internalItem._icon" :icon="internalItem._icon" />
          <slot>
            {{title(internalItem)}}
          </slot>
        </div>
        <div class="small d-flex align-items-center">
          <slot name="badge" :item="internalItem">
            <b-badge
              v-if="internalItem._new || internalItem._error"
              :variant="internalItem._error ? 'warning': internalItem._new ? 'success' : 'info'"
              class="new-badge mr-1"
            >
              {{internalItem._error ? 'Error' : 'New'}}
            </b-badge>
          </slot>
        </div>
      </div>
    </div>

    <div class="action-wrap" :id="actionId">
      <minimalist-list-item-action-button
        variant="danger"
        icon="trash-alt"
        v-if="item._removable && !item._removableOverride"
        :show-modal="showModal"
        :modal-title="`${destroyHeaderPrefix}: ${title(internalItem)}`"
        :title-key="titleKey"
        :disabled="item._removable === false || internalItem._processing"
        :processing="internalItem._processing !== undefined ? internalItem._processing : false"
        @action="onRemove"
        @action-close="onRemoveClose"
        @action-cancel="onRemoveCancel"
        @action-hidden="onRemoveHidden"
        @action-confirm="onDestroyConfirm"
      >
        <template #action-modal-text>
          <slot name="destroy-modal-text" />
        </template>

        <template #action-modal-items>
          <ul>
            <li>{{title(internalItem)}}</li>
          </ul>
        </template>
      </minimalist-list-item-action-button>

      <b-tooltip
        placement="right"
        :triggers="item._removable === false ? 'hover' : ''"
        :target="actionId"
      >
        Remove action has been disabled
      </b-tooltip>
    </div>
  </li>
</template>

<script>
import TitleKeyMixin from '@/components/mixins/TitleKeyMixin'
import MinimalistListItemActionButton from '@/components/MinimalistListItemActionButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    MinimalistListItemActionButton
  },
  mixins: [TitleKeyMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    destroyHeaderPrefix: {
      type: String,
      default: 'Destroy'
    },
    destroyUsesModal: {
      type: Boolean,
      default: false
    },
    disableSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      internalItem: {},
      showModal: false
    }
  },
  mounted () {
    this.internalItem = this.item
  },
  watch: {
    item: {
      deep: true,
      handler (newItem) {
        this.internalItem = newItem
      }
    }
  },
  computed: {
    ...mapGetters({
      canDelete: 'canDelete'
    }),
    actionId () {
      return `m-list-item-action-button-${this.internalItem._key}`
    }
  },
  methods: {
    onClick () {
      this.$emit('click', this.internalItem)
    },
    onRemove () {
      this.showModal = false

      if (this.destroyUsesModal && this.internalItem._new !== true) {
        this.showModal = true
      } else {
        this.$emit('remove', this.internalItem)
      }
    },
    onRemoveClose () {
      this.showModal = false
    },
    onRemoveCancel () {
      this.showModal = false
    },
    onRemoveHidden () {
      this.showModal = false
    },
    onDestroyConfirm () {
      this.showModal = false
      this.$emit('remove', this.internalItem)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/custom';

$accent-width: 10px;

.m-list-item {
  transition: all 0.3s ease;
  cursor: pointer;

  &.is-first {
    .m-list-item-content, .action-wrap {
      border-top: 1px solid #dee2e6;
    }
  }

  .m-list-item-content {
    padding-left: 0.65rem;
  }

  .accent {
    transition: all 0.3s ease;
    background: $yale-blue-light;
    width: 0;
  }

  .new-badge {
    padding-bottom: 0.2rem;
  }

  &.active {
    background: $yale-gray-light;

    .accent {
      width: $accent-width;
    }
  }

  &:not(.select-disabled):hover {
    background: $yale-gray-light;

    .accent {
      width: $accent-width;
    }
  }

  &.is-new {
    .accent:not(.has-error) {
      background: var(--success) !important;
    }
  }

  .accent.has-error {
    background: var(--warning) !important;
  }

  &:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
