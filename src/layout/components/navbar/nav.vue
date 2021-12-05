<!-- 导航栏 -->
<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import Hamburger from "./hamburger.vue";
import Breadcrumb from "./breadcrumb.vue";
import RightNav from "./rightNav.vue";
import Horizontal from "../sidebar/horizontal.vue";

const store = useStore();
const layout = computed(() => store.state.layout);
// 处理hamburger
const collapse = computed(() => store.getters.collapse);
const toggleClick = () => {
  store.commit("UPDATE_SETTING_CONFIG", {
    hideSideBar: !collapse.value,
  });
};
</script>

<template>
  <div class="navbar">
    <div class="left-nav-container">
      <template v-if="layout === 'vertical'">
        <Hamburger :collapse="collapse" @toggle-click="toggleClick" />
        <Breadcrumb />
      </template>
      <template v-else>
        <Horizontal />
      </template>
    </div>
    <RightNav />
  </div>
</template>

<style scoped lang="scss">
.left-nav-container {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}
</style>
