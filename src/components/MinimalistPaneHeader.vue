<template>
  <div v-if="!editing">
    <div class="m-panel-header d-flex align-items-center">
      <slot name="badge">
        <b-badge
          class="new-badge mr-2"
          v-if="selected._new || selected._error"
          :variant="selected._error ? 'warning' : selected._new ? 'success' : 'info'"
        >
          {{selected._error ? 'Error' : 'New'}}
        </b-badge>
      </slot>

      <h5 class="text-dark m-0 font-weight-bold">
        <slot :title="form.title">
          {{ form.title }}
        </slot>
      </h5>

      <minimalist-action-button
        icon="edit"
        class="ml-2"
        v-if="isEditable"
        @click="onEditClick"
        small
      />
    </div>
    <div>
      <slot name="below-title" />
    </div>
  </div>
  <div v-else>
    <div>
      <b-form-group
        class="mb-0"
        size="sm"
        :label="titleLabel"
        :description="titleDescription"
        :state="titleStateWrapped"
        :invalid-feedback="titleInvalidFeedbackWrapped"
      >
        <div class="d-flex align-items-center">
          <b-form-input
            size="sm"
            v-model="form.title"
            :placeholder="titlePlaceholder"
            :state="titleStateWrapped"
          />

          <minimalist-action-button
            icon="check"
            class="ml-2"
            :disabled="!titleStateWrapped"
            @click="onConfirmClick"
            small
          />
        </div>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import MinimalistActionButton from '../components/buttons/MinimalistActionButton'
import TitleKeyMixin from '../components/mixins/TitleKeyMixin'
import { stripReactivity } from '../helpers/reactivity'

export default {
  components: { MinimalistActionButton },
  mixins: [TitleKeyMixin],
  props: {
    selected: {
      type: Object,
      default: () => {}
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    titleState: {
      type: Function,
      default: () => {}
    },
    titleInvalidFeedback: {
      type: Function,
      default: () => ''
    },
    titlePlaceholder: {
      type: String,
      default: 'Title'
    },
    titleDescription: {
      type: String,
      default: 'The title field'
    },
    titleLabel: {
      type: String,
      default: 'Title'
    }
  },
  data () {
    return {
      editing: false,
      form: {
        title: ''
      }
    }
  },
  mounted () {
    this.form.title = this.title(this.selected)
  },
  computed: {
    titleStateWrapped () {
      return this.titleState(this.form.title, this.editing)
    },
    titleInvalidFeedbackWrapped () {
      return this.titleInvalidFeedback(this.form.title)
    }
  },
  watch: {
    selected: {
      deep: true,
      handler (newSelected) {
        this.editing = false
        this.form.title = this.title(newSelected)
      }
    },
    titleStateWrapped (newTitleState) {
      this.$emit('state-change', newTitleState)
    }
  },
  methods: {
    onEditClick () {
      this.onEditing(true)
    },
    onConfirmClick () {
      this.editing = false

      const selected = stripReactivity(this.selected)
      const updated = this.update(selected, this.form.title)

      this.$emit('updated', updated)
      this.onEditing(false)
    },
    onEditing (value) {
      this.editing = value

      this.$emit('editing', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
