<template>
  <router-view />
</template>

<script>

export default {
  data () {
    return {
      visitedPageAtLastTime: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path === '/invest') {
      next(false)
    } else {
      next()
    }
  }
}
</script>