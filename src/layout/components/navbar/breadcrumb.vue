<!-- 面包屑 -->
<script setup lang="ts">
import { useRoute } from "vue-router";
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
import { transformI18n } from "@/configs/i18n";
import { ref, watch } from "vue";

interface breadcrumb {
  path: string;
  name: string;
  meta: {
    i18n: boolean;
    title: string | null;
  };
  redirect?: string;
}

const route = useRoute();
const isHome = () => {
  return route.matched.findIndex((val) => val.name === "home") !== -1;
};
const breadcrumbList = ref<breadcrumb[]>([]);
const getBreadcrumb = () => {
  const home = {
    path: "/home",
    name: "home",
    meta: {
      i18n: true,
      title: "message.home",
    },
    redirect: "/",
  };
  if (isHome()) {
    breadcrumbList.value = [home];
  } else {
    breadcrumbList.value = [
      home,
      ...(route.matched as unknown as breadcrumb[]),
    ];
  }
};
watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
);
</script>

<template>
  <el-breadcrumb class="breadcrumb-container">
    <transition-group appear name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="item.redirect ? item.redirect : ''"
      >
        {{ transformI18n(item.meta.title, item.meta.i18n) }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 425px) {
  .breadcrumb-container {
    display: none;
  }
}
</style>
