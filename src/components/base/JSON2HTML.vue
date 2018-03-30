<template>
<!-- 
  JSON2HTML.vue is a way to represent HTML and CSS via JSON.
  It`s goal is provide a way to render data directly to webpage as easy as possible.
 -->
  <router-link tag="div" />
</template>

<script>
// import js2dom
// import writeCssByJs

export default {
  props: {
    业务数据: {},
    视觉数据: {}
  },
  data () {
    return {
      模拟视觉数据: { // root must be an object
        content: [ // if type of content is array, then all elements object in the array will rendered be HTMLElements.
          {
            content: [
              {
                content: [
                  {
                    HTMLattributes: {
                      class: ['image-借款']
                    },
                    tagName: 'div'  // optionally declare, the defalut is 'div'
                  },
                  {
                    content: '借款' // if type of content is string, then the content will rendered be textContent.
                  }
                ],
                styleProperties: {
                  'display': 'flex'
                }
              },
              {
                content: [
                  {
                    content: `${this.业务数据[this.视觉数据.迭代因子].loanAmount}元`
                  },
                  {
                    class: ['image-rightWardArrow']
                  }
                ],
                styleProperties: {
                  'display': 'flex'
                }
              }
            ],
            styleProperties: {
              'display': 'flex',
              'justify-content': 'space-between'
            }
          },
          ['theSameAs', 5]
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
