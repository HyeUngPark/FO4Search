<template>
  <div id="app" >
    <div class="container">
      <GlobalHeader></GlobalHeader>
      <router-view/>
    </div>
    <div class="center">
    <GlobalFooter>
        <template slot="copyright"></template>
    </GlobalFooter>
    </div>
  </div>
</template>
<script>
import GlobalFooter from '@/components/GlobalFooter'
import GlobalHeader from '@/components/GlobalHeader'
export default {
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter
  }
}
</script>

<style lang="less" scoped>
@import "./main.less";
</style>
