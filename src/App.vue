<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { ElConfigProvider } from "element-plus";

const store = useStore();
const locale = computed(() => store.getters.locale);
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
