export default {
  data () {
    return {
      firstOpenHeight: null,
      accordionOpen: false,
      transitionSpeed: 300,
      transitionBuffer: 50
    }
  },
  computed: {
    /**
     * If we don't add a small buffer sometimes the overflow: initial call we apply when opened causes a jump when removed. This
     * brief buffer that is adjustable fixes that.
     *
     * @returns {number}
     */
    transitionSpeedWithBuffer () {
      return this.transitionSpeed + this.transitionBuffer
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter: function (el) {
      const bodyInnerScrollHeight = el.querySelector('.body-inner').scrollHeight
      let height = el.scrollHeight - 1

      if (bodyInnerScrollHeight < height) {
        height = bodyInnerScrollHeight
      }

      el.style.height = height + 'px'

      // We use the $resizeTimeout here since it internally fires off on the resize event.
      this.$resizeTimeout = setTimeout(() => {
        this.accordionOpen = true
      }, this.transitionSpeedWithBuffer)
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight - 1 + 'px'
    },
    leave: function (el) {
      el.style.height = '0'

      this.accordionOpen = false
    }
  }
}
