<!-- 主体内容 -->
<script setup lang="ts">
import { useStore } from "@/store";
import { ElScrollbar } from "element-plus";
import { computed } from "vue";
const props = defineProps({
  fixedHeader: {
    type: Boolean,
    required: true,
  },
  hideTabs: {
    type: Boolean,
    required: true,
  },
});

const sectionClass = computed(() => ({
  "app-main-hide-tabs": props.hideTabs,
}));

const store = useStore();
const cachePageList = computed(
  () => store.state.routes?.cachePageList as string[]
);
</script>

<template>
  <section class="app-main" :class="sectionClass">
    <router-view>
      <template #default="{ Component }">
        <el-scrollbar v-if="props.fixedHeader" wrap-class="scrollbar-wrapper">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive :include="cachePageList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </el-scrollbar>
        <div v-else>
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive :include="cachePageList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </div>
      </template>
    </router-view>
  </section>
</template>

<style scoped lang="scss"></style>
