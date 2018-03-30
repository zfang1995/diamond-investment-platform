<template>
  <section class="page-realization">
    <div class="paragraph-productDescription">
      <h1 class="title-productDescription">变现说明</h1>
      <ol class="list-applicationRequirements">
        <li>1、凡是从奢华珠宝购买的钻石或钻戒，均可变现。</li>
        <li>2、变现交割方式有线上邮寄，与线下网点交割两种方式。</li>
        <li>3、收到货品后，由第三方检测机构检测无纰漏或假货后，按照当日的国际钻石交易价格来变现。</li>
        <li>4、若货品假冒则立刻报警，若货品有损，则重新估价。</li>
      </ol>
    </div>
    <paragraph-realization-process :indexOfHighLightedItem="0"></paragraph-realization-process>
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
import paragraphRealizationProcess from '@/components/realization/paragraph-realizationProcess/paragraph-realizationProcess.vue'

export default {
  components: {
    paragraphRealizationProcess
  },
  methods: {
    applyNow () {
      this.$router.push({
        path: `/realization/form`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$fontSizeOfBodyText: 20;

.page-realization {
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
