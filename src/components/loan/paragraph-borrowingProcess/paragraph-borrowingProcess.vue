<template>

  <div class="paragraph-borrowingProcess">
    <h1 class="title-borrowingProcess">借款流程</h1>
    <ol class="list-borrowingProcess" ref="list">
      <li>
        <div class="image-zaiXianShenQing"></div>
        <div>在线申请</div>
      </li>
      <li>
        <div class="image-dianHuaYuYue"></div>
        <div>电话预约</div>
      </li>
      <li>
        <div class="image-heTongMianQian"></div>
        <div>合同面签</div>
      </li>
      <li>
        <div class="image-jieKuanWanCheng"></div>
        <div>借款完成</div>
      </li>
    </ol>
  </div>

</template>

<script>
export default {
  mounted () {
    this.$refs.list.querySelectorAll('li')[this.indexOfHighLightedItem].firstElementChild.classList.add('highlighted')
    this.$refs.list.querySelectorAll('li')[this.indexOfHighLightedItem].lastElementChild.classList.add('highlighted')
  },
  props: {
    indexOfHighLightedItem: {
      type: Number,
      default: 0
    }
  }
}
</script>


<style lang="scss" scoped>
$fontSizeOfBodyText: 20;

 .paragraph-borrowingProcess {
   &::after {
     @include line-type1();
   }
 }

 .list-borrowingProcess {
    @include layoutScheme-type1(4, space-between, px2rem(115));
    height: px2rem(200);
    
    & [class^="image-"]::after {
        content: '';
        display: block;
        background-image: url('./rightWardDoubleArrow.svg');
        background-repeat: no-repeat;
        background-position: right;
        height: 100%;
        width: 100%;
      }

    & .image-jieKuanWanCheng::after {
        content: none;
      }

 }



  .highlighted {
    color: #007cfb;
  }
</style>
