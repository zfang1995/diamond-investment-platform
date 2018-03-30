<template>
  <div class="investmentScheme">
    <div class="paragraph-introduce">
      <div class="image-invertedTriangle"></div>
      <div>项目公司：{{investmentScheme.company}}</div>
      <div>项目公司估价：{{investmentScheme.estimate}}</div>
      <div>筹集规模：{{investmentScheme.amount}}</div>
      <div>筹集模式：{{investmentScheme.project_type}}</div>
      <div>投资期限：{{investmentScheme.limit_days}}</div>
      <div>退出时间：{{investmentScheme.exit_time}}</div>
    </div>

    <div class="paragraph-totalRewards">
      <div class="title">回 报 方 案</div>
      <div v-html="return_plan"></div>
    </div>

    <div class="paragraph-withdrawalMechanism ">
      <div class="title">退 出 机 制</div>
      <div v-html="exit_plan"></div>
    </div>

    <div class="paragraph-riskControlMeasures">
      <div class="title">风 控 措 施</div>
      <div v-html="venture_plan"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    investmentScheme: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      return_plan: '',
      exit_plan: '',
      venture_plan: ''
    }
  },
  created () {
    this.return_plan = this.investmentScheme.return_plan.replace(/(\r\n)|(\n)/g, '<br />')
    this.exit_plan = this.investmentScheme.exit_plan.replace(/(\r\n)|(\n)/g, '<br />')
    this.venture_plan = this.investmentScheme.venture_plan.replace(/(\r\n)|(\n)/g, '<br />')
  }
}
</script>


<style lang="scss" scoped>
  .investmentScheme {
    font-size: px2rem(30);
    margin-top: 0;
    padding-bottom: px2rem(100);
    [class^="paragraph-"] {
      margin: px2rem(100) 0;
      &:first-of-type {
        margin-top: 0;
      }
      &>div {
        margin: px2rem(50) 0;
      }
      .image-invertedTriangle {
        width: 100%;
        height: px2rem(25);
        background-position: center;
      }
      &>.title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        &::before {
          content: '';
          width: px2rem(200);
          height: px2rem(3);
          background-color: #a2a2a2;
        }
        &::after {
          content: '';
          width: px2rem(200);
          height: px2rem(3);
          background-color: #a2a2a2;
        }
      }
    }
  }
</style>
