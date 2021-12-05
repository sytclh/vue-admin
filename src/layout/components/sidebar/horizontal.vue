<!-- 菜单水平布局 -->
<script setup lang="ts">
import { homeMenu } from "@/routes/modules/homeRoutes";
import { useStore } from "@/store";
import { ElMenu } from "element-plus";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import sidebarItem from "./sidebarItem.vue";
import Logo from "./logo.vue";

const store = useStore();
const route = useRoute();

const hasLogo = computed(() => store.state.hasLogo);

const activeMenu = computed(() => {
  return route.path;
});
const triggerType = computed(() =>
  store.state.device === "mobile" ? "click" : "hover"
);
const handleMenuSelect = () => {
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
  <Logo v-if="hasLogo" />
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    :menu-trigger="triggerType"
    router
    @select="handleMenuSelect"
  >
    <sidebar-item v-for="item in routesList" :key="item.name" :item="item" />
  </el-menu>
</template>

<style scoped></style>
