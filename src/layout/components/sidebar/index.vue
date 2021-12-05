<!-- 页面左侧 -->
<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import Logo from "./logo.vue";
import Vertical from "./vertical.vue";

const store = useStore();
const collapse = computed(() => store.getters.collapse);
</script>

<template>
  <div
    class="sidebar-container"
    :class="[store.state.hasLogo ? 'has-logo' : '']"
  >
    <Logo v-if="store.state.hasLogo" :collapse="collapse" />
    <Vertical :collapse="collapse" />
  </div>
</template>

<style scoped lang="scss"></style>
