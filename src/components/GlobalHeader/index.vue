<template>
  <div class="header">
    <router-link to="/">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'GlobalHeader',
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
<style lang="less">
.ant-layout {
  min-height: 100vh;
  overflow-x: hidden;
}
.menu {
  .anticon {
    margin-right: 8px;
  }
  .ant-dropdown-menu-item {
    width: 160px;
  }
}
</style>
