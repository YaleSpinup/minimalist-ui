<template>
  <div class="minimalist-preview-box">
    <div class="icon-overlay cursor-pointer" @click="showPreview">
      <slot name="icon">
          <font-awesome-icon class="icon" :icon="['fas', 'search-plus']" />
      </slot>
    </div>
    <div class="preview-container">
      <img class="w-100 h-auto" :src="imgSrc">
    </div>
    <b-modal
      :id="id"
      size="lg"
      centered
      hide-header
      hide-footer
    >
      <img class="w-100 h-auto" :src="imgSrc">
    </b-modal>
  </div>
</template>
<script>
import { getRandomId } from '../helpers/random'

export default {
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      internalId: getRandomId(),
      imgSrc: ''
    }
  },
  mounted () {
    this.imgSrc = this.imageSrc
  },
  watch: {
    imageSrc (newValue) {
      this.imgSrc = newValue
    }
  },
  computed: {
    id () {
      return `preview-modal-${this.internalId}`
    }
  },
  methods: {
    showPreview () {
      this.$bvModal.show(this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
  .minimalist-preview-box {
    position: relative;

    .icon-overlay {
      position: absolute;
      opacity: 0;
      background: rgba(238,238,238, 0.8);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      transition: all 0.3s ease;

      &:hover {
        opacity: 1;
      }

      .icon {
        position: absolute;
        color: $yale-blue-light;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        transition: all 0.3s ease;
      }
    }

    #preview-modal {
      max-width: 80vw;
      max-height: 60vh;
    }

    .preview-container {
      z-index: 1;
    }
  }
</style>
