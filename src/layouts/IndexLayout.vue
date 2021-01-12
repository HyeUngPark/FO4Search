<template>
    <div class="BasicLayout">
        <a-layout class="ant-layout-has-sider">
            <Side/>
            <a-layout>
                <a-layout-header style="padding: 0">
                    <GlobalHeader/>
                </a-layout-header>
                <a-layout-content style="margin: 24px 24px 0; height: 100%">
                    <router-view></router-view>
                </a-layout-content>
                <a-layout-footer style="padding: 0">
                    <GlobalFooter />
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
<script>

import GlobalFooter from '@/components/GlobalFooter'
import GlobalHeader from '@/components/GlobalHeader'
import Side from '@/components/Side'
export default {
  name: "BasicLayout",
  components: {
    GlobalHeader,
    GlobalFooter,
    Side
  },
}
</script>