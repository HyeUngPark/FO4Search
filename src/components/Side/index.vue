<template>
  <LayoutSider
      :trigger="null"
      collapsible
      breakpoint="lg"
      width="256"
      class="sider"
    >
    <div class="logo">
      <img src="../../assets/logo.png">
      <span class="title">{{title}}</span>
    </div>
    <a-layout id="components-layout-demo-side" 
              class="ant-layout-has-sider sider-margin"
              >
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>Option 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>Option 2</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" /><span>User</span></span>
            <a-menu-item key="3">
              Tom
            </a-menu-item>
            <a-menu-item key="4">
              Bill
            </a-menu-item>
            <a-menu-item key="5">
              Alex
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="team" /><span>Team</span></span>
            <a-menu-item key="6">
              Team 1
            </a-menu-item>
            <a-menu-item key="8">
              Team 2
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <a-icon type="file" />
            <span>File</span>
          </a-menu-item>
        </a-menu>
    </a-layout>
  </LayoutSider>
</template>

<script>
import { Layout } from 'ant-design-vue'
import { urlToList } from "../_utils/pathTools"

export default {
  name: "Side",
  components: {
    LayoutSider: Layout.Sider
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
  mounted() {
    const pathArr = urlToList(this.location.path);
    if (pathArr[2] && !this.checkPath(pathArr[2])) {
      this.openKeys = [pathArr[0]];
      this.selectedKeys = [pathArr[1]];
      return;
    } else if (pathArr[2]) {
      this.openKeys = [pathArr[0], pathArr[1]];
    } else {
      this.openKeys = [pathArr[0]];
    }
    this.selectedKeys = [this.location.path];
  },
  watch: {
    collapsed: "collapsedChange",
    $route() {
      const pathArr = urlToList(this.location.path);
      if (pathArr[2] && !this.checkPath(pathArr[2])) {
        this.openKeys = [pathArr[0]];
        this.selectedKeys = [pathArr[1]];
        return;
      } else if (pathArr[2]) {
        this.openKeys = [pathArr[0], pathArr[1]];
      } else {
        this.openKeys = [pathArr[0]];
      }
      this.selectedKeys = [this.location.path];
    }
  },
  data() {
    return {
      title : 'FO4 SEARCH',
      openKeys: [],
      selectedKeys: [],
      status: false
    };
  },
  methods: {
    checkPath(url) {
      let status = false;
      const mapData = data => {
        data.map(item => {
          if (item.path == url) status = true;
          if (item.children) {
            haveChildren(item.children); // eslint-disable-line
          }
        });
      };
      const haveChildren = arr => {
        mapData(arr);
      };
      mapData(this.menuData);
      return status;
    },
    handleOpenChange(openKeys) {
      let keys;
      if (openKeys.length > 1) {
        if (openKeys.length > 2) {
          keys = [openKeys[openKeys.length - 1]];
        } else if (openKeys[1].indexOf(openKeys[0]) > -1) {
          keys = [openKeys[0], openKeys[1]];
        } else {
          keys = [openKeys[openKeys.length - 1]];
        }
        this.openKeys = keys;
      } else {
        this.openKeys = openKeys;
      }
    },
    // eslint-disable-next-line
    selected({ item, key, selectedKeys }) {
      this.selectedKeys = selectedKeys;
    },
    // eslint-disable-next-line
    collapsedChange(val, oldVal) {
      // eslint-disable-line
      if (val) {
        this.openKeys = [];
      } else {
        const pathArr = urlToList(this.location.path);
        if (pathArr[2]) {
          this.openKeys = [pathArr[0], pathArr[1]];
        } else {
          this.openKeys = [pathArr[0]];
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
@import "~ant-design-vue/lib/style/themes/default.less";
.drawer .drawer-content {
  background: #001529;
}
.ant-menu-inline-collapsed {
  & > .ant-menu-item .sider-menu-item-img + span,
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
