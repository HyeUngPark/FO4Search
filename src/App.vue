<template>
  <div id="app">
      <ConfigProvider>
          <router-view />
      </ConfigProvider>
  </div>
</template>
<script>

import { ConfigProvider } from "ant-design-vue";

export default {
  name: 'App',
  components: {
    ConfigProvider
  },
  data() {
    return {
    }
  }
}
</script>


