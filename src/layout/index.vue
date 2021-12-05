<!-- 页面容器 -->
<script setup lang="ts">
import { useStore } from "@/store";
import { isMobile } from "@/utils/helpers";
import { onBeforeUnmount, computed } from "vue";
import { initLayoutStyle } from "./config";
import { ElScrollbar } from "element-plus";
import SideBar from "./components/sidebar/index.vue";
import NavBar from "./components/navbar/index.vue";
import AppMain from "./components/appMain.vue";
import SettingPanel from "./components/navbar/settingPanel/index.vue";

const store = useStore();

// 处理页面 resize
const resizeHandler = () => {
  store.dispatch("updateDeviceAndSideBarOrLayout", isMobile());
};
window.addEventListener("resize", resizeHandler);
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

// 设置初始页面样式布局
initLayoutStyle();
const appClasses = computed(() => ({
  mobile: store.state.device === "mobile",
  hideSideBar: store.state.hideSideBar,
  openSideBar: !store.state.hideSideBar,
}));

// 设置菜单遮罩层样式及事件
const sidebarDrawerVisible = computed(
  () =>
    store.state.device === "mobile" &&
    store.state.hideSideBar === false &&
    store.state.layout === "vertical"
);
const handleClickDrawer = () => {
  store.commit("UPDATE_SETTING_CONFIG", {
    hideSideBar: true,
  });
};
</script>

<template>
  <div class="app-wrapper" :class="appClasses">
    <!-- 手机遮罩层 -->
    <div
      class="drawer-bg"
      v-show="sidebarDrawerVisible"
      @click="handleClickDrawer"
    ></div>
    <!-- 左侧边栏 -->
    <SideBar v-if="store.state.layout === 'vertical'" />
    <!-- 主页面 -->
    <div class="main-container">
      <template v-if="store.state.fixedHeader">
        <NavBar />
        <AppMain
          :fixed-header="store.state.fixedHeader"
          :hide-tabs="store.state.hideTabs"
        />
      </template>
      <el-scrollbar v-else wrap-class="scrollbar-wrapper">
        <NavBar />
        <AppMain
          :fixed-header="store.state.fixedHeader"
          :hide-tabs="store.state.hideTabs"
        />
      </el-scrollbar>
    </div>
    <!-- 项目配置 -->
    <SettingPanel />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
.app-wrapper {
  @include relative;
  @include clearfix;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1000;
}
</style>
