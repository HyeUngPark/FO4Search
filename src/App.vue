<template>
  <div id="app" 
    :class="{'not-click': $store.state.LoadingStatus}">
  >
      <ConfigProvider>
          <router-view />
      </ConfigProvider>
      <Spinner :loading='$store.state.LoadingStatus'/>
  </div>
</template> 
<script>

import { ConfigProvider } from "ant-design-vue";
import Spinner from '@/components/Spinner'

export default {
  name: 'App',
  components: {
    ConfigProvider,
    Spinner,
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="less">
.not-click{
  pointer-events: none; 
}
</style>

