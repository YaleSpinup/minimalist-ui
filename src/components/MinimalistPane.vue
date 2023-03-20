<template>
  <!-- Something Selected -->
  <div v-if="selected">
    <div class="d-flex justify-content-between border-bottom pb-3 mb-5">

      <!-- Header -->
      <minimalist-pane-header
        class="flex-grow-1"
        :selected="selected"
        :is-editable="header.editable"
        :title-key="titleKey"
        :title-state="header.state"
        :title-invalid-feedback="header.invalidFeedback"
        :title-placeholder="header.placeholder"
        :title-description="header.description"
        :title-label="header.label"
        @updated="onHeaderUpdate"
        @editing="onHeaderEditing"
        @state-change="onHeaderStateChange"
      >
        <!-- Default Content Slot -->
        <template v-slot:default="{ title }">
          <slot name="header-title" :title="title">
            {{ title }}
          </slot>
        </template>

        <!-- Below Title Slot -->
        <template v-slot:below-title>
          <slot name="below-header-title" />
        </template>
      </minimalist-pane-header>

      <!-- Pane Actions -->
      <div v-if="showSave" class="d-flex align-items-center">
        <slot name="pane-actions">
          <b-btn
            class="ml-5"
            variant="success"
            size="sm"
            :disabled="!canSave || editing.header || selected._processing"
            @click="onSave"
          >
            <i class='fa fa-spinner fa-spin mr-1' v-if="selected._processing" />
            <font-awesome-icon class="text-white mr-1" :icon="['fas', 'save']" v-else />
            Save
          </b-btn>
        </slot>
      </div>
    </div>

    <!-- Main Content Slot -->
    <slot name="content" :selected="selected" />
  </div>

  <!-- Nothing Selected -->
  <div v-else>
    <slot name="nothing-selected">
      Nothing selected.
    </slot>
  </div>
</template>

<script>
import MinimalistPaneHeader from '../components/MinimalistPaneHeader'
import TitleKeyMixin from '../components/mixins/TitleKeyMixin'

export default {
  components: { MinimalistPaneHeader },
  mixins: [TitleKeyMixin],
  props: {
    selected: {
      type: Object,
      default: () => {}
    },
    canSave: {
      type: Boolean,
      default: false
    },
    showSave: {
      type: Boolean,
      default: false
    },
    header: {
      type: Object,
      default: () => {
        return {
          editable: false,
          state: (title) => {
            return title !== ''
          },
          invalidFeedback: (title) => {
            if (title === '') {
              return 'Input cannot be empty.'
            }

            return 'Uncaught error.'
          },
          placeholder: 'Enter a title.',
          description: 'The title field',
          label: 'Title'
        }
      }
    }
  },
  data () {
    return {
      editing: {
        header: false
      }
    }
  },
  watch: {
    selected: {
      deep: true,
      handler () {
        this.editing.header = false
      }
    }
  },
  methods: {
    onHeaderUpdate (data) {
      this.$emit('updated', data)
    },
    onHeaderStateChange (data) {
      this.$emit('state-change', data)
    },
    onHeaderEditing (value) {
      this.editing.header = value
    },
    onSave () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
