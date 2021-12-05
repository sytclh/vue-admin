<!-- 页面顶部 -->
<script setup lang="ts">
import { useStore } from "@/store";
import Nav from "./nav.vue";
import Tags from "../tags/index.vue";
import { computed } from "vue";

const store = useStore();
// 顶部样式
const headerLayout = computed(() => ({
  fixedHeader: store.state.fixedHeader,
}));
</script>

<template>
  <div :class="headerLayout">
    <Nav />
    <Tags />
  </div>
</template>

<style scoped lang="scss"></style>
