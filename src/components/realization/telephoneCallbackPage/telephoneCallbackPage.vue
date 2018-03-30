<template>
  <section class="page-telephoneCallback">
    <div class="paragraph-telephoneCallback">
      <h1 class="title-telephoneCallback">电话回访</h1>
      <div class="text-pleaseWait…">
        请耐心等候，我们工作人员尽快与您联系，请保持电话通话保持正常！
      </div>
      <div class="text-contactPhoneNumber">0755-22270985</div>
    </div>
    <paragraph-realization-process :indexOfHighLightedItem="1"></paragraph-realization-process>
    <div class="link-completeRequest" @click="completeRequest">完成</div>
  </section>
</template>

<script>
import paragraphRealizationProcess from '@/components/realization/paragraph-realizationProcess/paragraph-realizationProcess.vue'

export default {
  components: {
    paragraphRealizationProcess
  },
  methods: {
    completeRequest () {
      this.$router.push('/realization')
    }
  }
}
</script>

<style lang="scss" scoped>
  .link-completeRequest {
    @include button-type1() ;
    margin-top: px2rem(100);
    margin-left: auto;
    margin-right: auto;
  }

  [class^="text"] {
    text-align: center;
    @include text-type1(30) ;
    padding: 0 px2rem(80);  
  }
</style>
