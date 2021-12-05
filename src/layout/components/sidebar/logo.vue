<!-- Logo -->
<script setup lang="ts">
// 可以考虑使用vuex存储地址
import imgLogo from "@/assets/logo.png";
import { useStore } from "@/store";
import { computed } from "vue";
const store = useStore();
const props = defineProps({
  collapse: Boolean,
});
const title = computed(() => store.state.title);
</script>
<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img class="sidebar-logo" :src="imgLogo" />
      <div class="sidebar-title" v-show="!props.collapse">
        {{ title }}
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.sidebar-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: $sidebarLogoBackground;
  .sidebar-logo-link {
    white-space: nowrap;
    .sidebar-logo {
      width: $sidebarLogoSize;
      height: $sidebarLogoSize;
      margin-right: 12px;
      vertical-align: middle;
    }
    .sidebar-title {
      display: inline-block;
      font-weight: 800;
      color: $sidebarLogoTextColor;
    }
  }
}
</style>
