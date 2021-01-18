<template>
  <LayoutSider
      :trigger="null"
      collapsible
      breakpoint='lg'
      width='256'
      class='sider'
    > 
    <a href="/" class="logo">
      <img src='../../assets/logo.png'>
      <span class="title">{{title}}</span>
    </a>
    <a-layout id='components-layout-demo-side'
              class='ant-layout-has-sider sider-margin'
              >
        <a-menu theme='dark' mode='inline'>
          <a-menu-item key="1">
            <a-icon type="user" :style="{ fontSize: '25px'}"/>
            선수조회
          </a-menu-item>
          <a-sub-menu key="user">
            <span slot="title">
              <a-icon type="meh" :style="{ fontSize: '25px'}" /> 유저조회
            </span>
            <a-menu-item key="3">
            <router-link to='/user/rank'>
              <a-icon type='trophy' :style="{ fontSize: '25px'}" />최고티어조회
            </router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <a-icon type='table' :style="{ fontSize: '25px'}"/>최근전적조회
            </a-menu-item>
            <a-menu-item key="5">
              <a-icon type='shopping-cart' :style="{ fontSize: '25px'}" />거래내역조회
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="calc">
            <a-icon type="calculator" :style="{ fontSize: '25px'}"/> 수수료계산기
          </a-menu-item>
          <a-menu-item key="sqd">

            <svg version="1.0"
                 width='1em' 
                 height='1em' 
                 viewBox="64 64 2200 2200"
                 fill="currentColor"
                 class='anticon anticon-calculator'
                 :style="{ fontSize: '25px'}"
            >
            <path d="M270 1125 l0 -1125 850 0 850 0 0 1125 0 1125 -850 0 -850 0 0 -1125z
            m1070 870 l0 -75 -220 0 -220 0 0 75 0 75 220 0 220 0 0 -75z m-610 -80 l0
            -145 395 0 395 0 0 145 0 145 130 0 130 0 0 -420 0 -420 -135 0 c-120 0 -136
            2 -141 18 -35 104 -123 204 -221 250 -51 24 -70 27 -153 27 -132 -1 -192 -26
            -281 -114 -48 -48 -71 -81 -86 -121 l-21 -55 -136 -3 -136 -3 0 421 0 420 130
            0 130 0 0 -145z m455 -586 c25 -7 57 -28 85 -58 l45 -46 -184 -3 c-101 -1
            -186 0 -189 3 -11 11 75 86 114 100 48 17 77 18 129 4z m-422 -359 c28 -77
            130 -178 212 -210 84 -34 215 -34 298 -1 99 39 195 144 231 254 5 15 21 17
            141 17 l135 0 0 -420 0 -420 -130 0 -130 0 0 155 0 155 -395 0 -395 0 0 -155
            0 -155 -130 0 -130 0 0 420 0 421 136 -3 136 -3 21 -55z m538 41 c-28 -51
            -115 -101 -176 -101 -61 0 -148 50 -176 101 -9 18 -2 19 176 19 178 0 185 -1
            176 -19z m39 -746 l0 -75 -220 0 -220 0 0 75 0 75 220 0 220 0 0 -75z"/>
            </svg>
            스쿼드메이커
          </a-menu-item>
        </a-menu>
    </a-layout>
  </LayoutSider>
</template>

<script>
import { Layout } from 'ant-design-vue'

export default {
  name: "Side",
  components: {
    LayoutSider: Layout.Sider,
  },
  props: {
    logo: {
      type: String
    },
    collapsed: {
      type: Boolean
    },
    onCollapse: {
      type: Function
    },
    menuData: {
      type: Array
    },
    location: {
      type: Object
    }
  },
  data() {
    return {
      title : 'FO4 SEARCH',
      openKeys: [],
      selectedKeys: [],
      status: false,
    }
  },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
@import "~ant-design-vue/lib/style/themes/default.less";
.drawer .drawer-content {
  background: #001529;
}
.ant-menu-item{
  font-size: @font-size-base+4.5 !important;
}
.ant-menu-submenu-title{
  font-size: @font-size-base+4.5 !important;
}
.ant-menu-inline-collapsed {
  & > .ant-menu-item .sider-menu-item-img + span
  &
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-item
    .sider-menu-item-img
    + span,
  & > .ant-menu-submenu > .ant-menu-submenu-title .sider-menu-item-img + span {
    max-width: 0;
    display: inline-block;
    opacity: 0;
  }
}
.ant-menu-item .sider-menu-item-img + span,
.ant-menu-submenu-title .sider-menu-item-img + span {
  transition: opacity 0.3s @ease-in-out, width 0.3s @ease-in-out;
  opacity: 1;
}
</style>
