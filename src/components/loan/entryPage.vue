<template>
  <section class="page-loan">
    <div class="paragraph-productDescription">
      <h1 class="title-productDescription">产品说明</h1>
      <ul class="list-productDescription">
        <li>
          <div>月利息（%）</div>
          <div>1.5%</div>
        </li>
        <li>
          <div>最高额度</div>
          <div>5000万</div>
        </li>
        <li>
          <div>贷款期限</div>
          <div>1~6月</div>
        </li>
        <li>
          <div>还款方式</div>
          <div>到期还本</div>
        </li>
        <li>
          <div>放款时间</div>
          <div>当天放款</div>
        </li>
      </ul>
    </div>
    <paragraph-borrowing-process :indexOfHighLightedItem="0"/>
    <div class="paragraph-applicationRequirements">
      <h1 class="title-applicationRequirements">申请条件</h1>
      <ol class="list-applicationRequirements">
        <li>1、18-55周岁中国大陆户籍</li>
        <li>2、具有稳定的收入和到期偿还款的能力</li>
        <li>3、征信记录良好</li>
      </ol>
    </div>
    <div class="link-applyNow" @click="applyNow">马上申请</div>
  </section>
</template>

<script>
import paragraphBorrowingProcess from '@/components/loan/paragraph-borrowingProcess/paragraph-borrowingProcess.vue'

export default {
  components: {
    paragraphBorrowingProcess
  },
  methods: {
    applyNow () {
      this.$router.push({
        path: `/loan/form`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$fontSizeOfBodyText: 20;

.page-loan {
  padding-bottom: px2rem(98);
}

.paragraph-productDescription,
.paragraph-borrowingProcess {
  &::after {
    @include line-type1();
  }
}
.list-productDescription {
  padding-left: 0;
}
.list-productDescription > li {
  @include text-type1($fontSizeOfBodyText);
  @include row-type1();
  justify-content: space-between;
}
.list-borrowingProcess {
  @include layoutScheme-type1(4, space-between, px2rem(115));
  height: px2rem(200);

  [class^="image-"]::after {
    content: "";
    display: block;
    background-image: url("./rightWardDoubleArrow.svg");
    background-repeat: no-repeat;
    background-position: right;
    height: 100%;
    width: 100%;
  }
}

.image-jieKuanWanCheng::after {
  content: none;
}
.paragraph-applicationRequirements {
  margin-bottom: px2rem(40);
}
.link-applyNow {
  @include button-type1();
  margin: 0 auto px2rem(50);
}
</style>
