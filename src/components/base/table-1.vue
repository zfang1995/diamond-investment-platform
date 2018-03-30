<template>
  <div class="table-1">
    <div v-for=" (value, key) in dataMap " :key="key" class="cell">
      <span>{{ key }}</span><span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataMap: {},
      mockDataMap: {
        证书: 'GIA-2185088623',
        形状: 'Round',
        测量值: '9.15-9.2x5.75',
        重量: '3.02',
        净度: 'VVS1',
        切工: 'EX',
        抛光: 'EX',
        对称: 'EX',
        荧光: 'N',
        颜色: 'F'
      }
    }
  },
  props: {
    inComingData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    formatInComingData (inComingData) {
      let dataMap = {}
      dataMap.证书 = inComingData.sku
      dataMap.形状 = inComingData.shape
      dataMap.测量值 = inComingData.measurements
      dataMap.重量 = inComingData.weight
      dataMap.净度 = inComingData.clarity
      dataMap.切工 = inComingData.cut
      dataMap.抛光 = inComingData.polish
      dataMap.对称 = inComingData.symmetry
      dataMap.荧光 = inComingData.fluorescence
      dataMap.颜色 = inComingData.color
      return dataMap
    },
    updateData () {
      if (this.ObjectIsNotEmpty(this.inComingData)) {
        this.dataMap = this.formatInComingData(this.inComingData)
      } else {
        this.dataMap = this.mockDataMap
      }
      this.gia_id = this.inComingData.id
    },
    ObjectIsNotEmpty (obj) {
      for (var name in obj) {
        return true
      }
      return false
    }
  },
  created () { // 使用 created 钩子会不能接受到 父组件传来的数据
    // console.log(this.ObjectIsNotEmpty(this.inComingData)) // false
    // this.updateData()
  },
  mounted () { // 使用 mounted 钩子会不能接受到 父组件传来的数据
    // console.log(this.ObjectIsNotEmpty(this.inComingData)) // false
  },
  beforeUpdate () {
    // console.log(this.ObjectIsNotEmpty(this.inComingData)) // true
  },
  watch: {
    inComingData () {
      this.updateData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-1 {
    display: flex;
    flex-wrap: wrap;
    & .cell {
      flex-basis: 50%;
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1) solid #808080;
      &:nth-of-type(2n+1) {
        padding-right: px2rem(15);
        border-right: px2rem(1) solid #808080;
      }
      &:nth-of-type(2n) {
        padding-left: px2rem(15);
      }
      &>:first-child {
        color: #b2b2b2;
      }
      &>:last-child {
        color: black;
      }
    }
  }
</style>
