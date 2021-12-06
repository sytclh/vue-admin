<!-- 导航栏右侧 -->
<script setup lang="ts">
import Fullscreen from "./fullscreen/index.vue";
import International from "./international/index.vue";
import Setting from "./setting/index.vue";
import Avatar from "./avatar/index.vue";
import { useStore } from "@/store";
import { computed } from "vue";
const store = useStore();
const settingConfig = computed(() => ({
  fixedHeader: store.state.fixedHeader,
  hideTabs: store.state.hideTabs,
  hasLogo: store.state.hasLogo,
  grey: store.state.grey,
  weak: store.state.weak,
}));
</script>

<template>
  <div class="right-nav-container">
    <Fullscreen />
    <International />
    <Avatar />
    <Setting :fixed-header="settingConfig.fixedHeader" />
  </div>
</template>

<style scoped lang="scss">
.right-nav-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.3s;
}
</style>
