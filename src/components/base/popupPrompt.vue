<template>
  <div v-show="!!popupPromptInfo.content" :class="'popup-prompt '+`${popupPromptInfo.autoPosition?'autoPosition ':' '}`+ `${popupPromptInfo.outerUseCover?'cover ':' '}`">
    <div 
      :class="'inner '+
        `${popupPromptInfo.theme === 'warn'?'theme-warn':''}`
      "
    >
      <div v-if="typeof popupPromptInfo.content === 'object'" :is="popupPromptInfo.content" v-bind="popupPromptInfo.componentProps"></div>
      <span v-else>{{ popupPromptInfo.content }}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'popupPromptInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
$fontSize: 25;
  .popup-prompt {
    &.autoPosition {
      position: fixed;
      z-index: 1000;
      top: 0; left: 0; right: 0; bottom: 0;
    }
    &>.inner {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 25vh;
      width: fit-content;
      max-width: 80%;
      height: fit-content;
      max-height: 30%;
      margin: auto;
      border-radius: px2rem(20);
      padding: px2rem(25);
      font-size: px2rem($fontSize);
      line-height: px2rem($fontSize * 1.5);
      vertical-align: baseline;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
    }
  }
</style>

