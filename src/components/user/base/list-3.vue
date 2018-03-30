 <template>
  <div class="list-3" ref="list-3"  @click="$router.push('/user/orders/'+orderType+'/'+inComingData[['订单号']])">
    <div class="row">
      <div class="listItem">
        {{inComingData['订单号']}}
      </div>
      <div class="listItem">
        {{inComingData['状态']}}
      </div>
    </div>
    <div class="spaceHolder-line"></div>
    <div class="row">
      <div class="listItem">
        {{inComingData['下单时间']}}
      </div>
      <div v-if="orderType" class="division-1 listItem">
        查看详情<span class="image-rightWardArrow"></span>
      </div>
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
.list-3 {
  padding: 0 px2rem(30);
  background-color: #fff;
  height: px2rem(140);
  &>.row {
    height: px2rem(70);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .listItem {
    display: flex;
    align-items: center;
    font-size: px2rem(24);
  }
  .spaceHolder-line {
    height: px2rem(2);
    background-color: #f4f4f4;
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
