 <template>
  <div class="list-2" ref="list-2">
    <div v-for="(value, key) in inComingData" :key="key" class="listItem">
      <span>{{ key }}</span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inComingData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    //   dataMap () {
    //     let dataMap = {}
    //     dataMap['订单号'] = this.inComingData.id
    //     dataMap['状态'] = this.inComingData.status
    //     dataMap['下单时间'] = this.inComingData.created_at
    //     return dataMap
    //   }
  }
}
</script>

<style lang="scss" scoped>
.list-2 {
  padding: 0 px2rem(30);
  background-color: #fff;
  .listItem {
    @include row(45);
    justify-content: flex-start;
    font-size: px2rem(24);
    color: #737373;
    &:first-child>:last-child {
      color: #ff0000;
    }
    &>:first-child {
      margin-right: px2rem(12);
    }
  }
  .division-1 {
    justify-content: flex-end;
    .image-rightWardArrow {
      height: px2rem(25);
      width: px2rem(25);
      margin-left: px2rem(20);
    }
  }
}
</style>
