<template>
  <div>
    <array-elements :inComingData="dataMap">
    </array-elements>
  </div>
</template>

<script>
import arrayElements from '@/components/base/enumerableObject.vue'
import {mapActions} from 'vuex'
import paragraphBorrowingProcess from '@/components/loan/paragraph-borrowingProcess/paragraph-borrowingProcess.vue'

export default {
  components: {
    arrayElements
  },
  data () {
    return {
      dataMap: {
        text: '0',
        object: {
          text: '1',
          object: {
            text: '2',
            object: {}
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'appPrompt'
    ])
  },
  mounted () {
    this.appPrompt({ content: paragraphBorrowingProcess, options: {timeout: 9990, props: { indexOfHighLightedItem: 2 }} })
    // setTimeout(() => {
    //   this.appPrompt()
    // }, 2000)
  }
}
</script>
