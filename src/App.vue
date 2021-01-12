<template>
  <div id="app">
      <!-- 
      <GlobalHeader></GlobalHeader>
      <div class="container">
      <Side></Side>
        <router-view class="content"/>
      <GlobalFooter class="center"></GlobalFooter> 
      </div>
      -->
      <LocaleProvider :locale="locale">
          <router-view />
      </LocaleProvider>
  </div>
</template>
<script>
// import GlobalFooter from '@/components/GlobalFooter'
// import GlobalHeader from '@/components/GlobalHeader'
// import Side from '@/components/Side'

import { LocaleProvider } from "ant-design-vue";

export default {
  name: 'App',
  components: {
    LocaleProvider
    // GlobalHeader,
    // GlobalFooter,
    // Side,
  },
  data() {
    return {
    }
  }
}
</script>


