 <template>
  <div class="list-1" ref="list-1">
    <div v-for="(value, key) in inComingData" :key="key" class="listItem">
      <span>{{ key }}</span>
      <span>{{ value }}</span>
    </div>
    <div v-if="orderType" class="division-1 listItem" @click="$router.push('/user/orders/'+orderType+'/'+inComingData[['订单号']])">查看详情 <span class="image-rightWardArrow"></span></div>
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
    },
    orderType: {
      type: String,
      default: ''
    }
  },
  computed: {
    dataMap () {
      return this.inComingData
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-1 {
    padding: 0 px2rem(30);
    background-color: #fff;
    .listItem {
      @include row(70) ;
      font-size: px2rem(24);
      border-bottom: px2rem(1) solid #f4f4f4;
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
