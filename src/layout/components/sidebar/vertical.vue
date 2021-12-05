<!-- 左侧菜单 -->
<script setup lang="ts">
import { homeMenu } from "@/routes/modules/homeRoutes";
import { useStore } from "@/store";
import { ElMenu, ElScrollbar } from "element-plus";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import sidebarItem from "./sidebarItem.vue";

const props = defineProps({
  collapse: Boolean,
});

const store = useStore();
const route = useRoute();
const activeMenu = computed(() => {
  return route.path;
});

const device = computed(() => store.state.device);
const handleMenuSelect = () => {
  // 处理左侧菜单
  if (device.value === "mobile") {
    store.commit("UPDATE_SETTING_CONFIG", {
      hideSideBar: true,
    });
  }
  // 处理tags
};

const routesList = ref<MenuComponentItem[]>([]);
watchEffect(() => {
  if (store.state.routes?.routes.length === 0) {
    routesList.value = homeMenu;
  } else {
    routesList.value = homeMenu.concat(
      ...(store.state.routes?.routes as MenuComponentItem[])
    );
  }
});
</script>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="props.collapse"
      unique-opened
      router
      class="menu-wrapper"
      @select="handleMenuSelect"
    >
      <sidebar-item v-for="item in routesList" :key="item.name" :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.menu-wrapper {
  border-right: none;
  background: transparent;
}
</style>
