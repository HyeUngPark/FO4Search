<template>
  <div class="content">
    <router-link to="/">
     <h1>Index</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      title: 'FO4 Search'
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
