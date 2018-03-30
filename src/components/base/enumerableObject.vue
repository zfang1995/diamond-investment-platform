<template>
  <div v-if="inComingData || (inComingData === '')">
    <div v-if="(typeof inComingData === 'string') || (typeof inComingData === 'number')">{{ inComingData }}</div>
    <enumerable-object v-else-if="typeof inComingData === 'object'"
      v-for="(value, key) in inComingData" :key="key" :inComingData="value">
    </enumerable-object>
  </div>
</template>
 
<script>
export default {
  props: {
    inComingData: {
      default: {},
      type: Object
    }
  },
  name: 'enumerableObject',
  mounted () {
    // console.log(this.$props)
  }
}
</script>
