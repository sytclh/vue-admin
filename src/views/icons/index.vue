<!-- 组件图标库 -->
<script setup lang="ts">
import {
  elementPlusIconsName,
  fortawesomeIconsName,
  fontawesomeIcons,
  customSvgIcons,
} from "@/configs/iconConfig";
import { ElTabs, ElTabPane, ElTooltip, ElScrollbar } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { ref } from "vue";

const camel2kebab = (str: string, type: 0 | 1 | 2 | 3 = 0): string => {
  if (type === 0) {
    return (
      "el" +
      str.replace(/([A-Z])/g, (_, p1) => {
        return "-" + p1.toLowerCase();
      })
    );
  } else if (type === 1) {
    const name = str.slice(2);
    return (
      "fas" +
      name.replace(/([A-Z])/g, (_, p1) => {
        return "-" + p1.toLowerCase();
      })
    );
  } else if (type === 2) {
    return str;
  } else {
    return str;
  }
};
const generatorCode = (str: string, type: 0 | 1 | 2 | 3 = 0): string => {
  if (type === 0) {
    return `<svg-icon icon-name="${camel2kebab(str)}" />`;
  } else if (type === 1) {
    return `<svg-icon icon-name="${camel2kebab(str, type)}" />`;
  } else if (type === 2) {
    return `<svg-icon icon-name="${str}" />`;
  } else {
    return `<svg-icon icon-name="${str}" />`;
  }
};

const iconsList = ref<string[]>(elementPlusIconsName);
const iconsList1 = ref<string[]>([]);
const iconsList2 = ref<string[]>([]);
const iconsList3 = ref<string[]>([]);

const handleBeforeLeave = (tab: string) => {
  if (tab === "1" && iconsList1.value.length === 0) {
    iconsList1.value = fortawesomeIconsName;
  } else if (tab === "2" && iconsList2.value.length === 0) {
    iconsList2.value = fontawesomeIcons;
  } else if (tab === "3" && iconsList3.value.length === 0) {
    iconsList3.value = customSvgIcons;
  }
};
</script>

<template>
  <div class="icons-container">
    <el-scrollbar>
      <el-tabs type="border-card" :before-leave="handleBeforeLeave">
        <el-tab-pane label="element-plus icons">
          <div class="icons-list">
            <div v-for="(name, index) of iconsList" :key="index">
              <el-tooltip placement="top">
                <template #content>{{ generatorCode(name) }}</template>
                <div class="icon-item">
                  <svg-icon :icon-name="camel2kebab(name)" :size="20" />
                  <span>{{ camel2kebab(name) }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="fontawesome6">
          <div class="icons-list">
            <div v-for="(name, index) of iconsList1" :key="index">
              <el-tooltip placement="top">
                <template #content>{{ generatorCode(name, 1) }}</template>
                <div class="icon-item">
                  <svg-icon :icon-name="camel2kebab(name, 1)" :size="20" />
                  <span>{{ camel2kebab(name, 1) }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="fontawesome4">
          <div class="icons-list">
            <div v-for="(name, index) of iconsList2" :key="index">
              <el-tooltip placement="top">
                <template #content>{{ generatorCode(name, 2) }}</template>
                <div class="icon-item">
                  <svg-icon :icon-name="name" :size="20" />
                  <span>{{ name }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="icons">
          <div class="icons-list">
            <div v-for="(name, index) of iconsList3" :key="index">
              <el-tooltip placement="top">
                <template #content>{{ generatorCode(name, 3) }}</template>
                <div class="icon-item">
                  <svg-icon :icon-name="name" :size="20" />
                  <span>{{ name }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.icons-container {
  padding: 20px;
  .icons-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
  .icon-item {
    margin: 10px;
    height: 40px;
    width: 200px;
    text-align: center;
    cursor: pointer;
    span {
      display: block;
    }
  }
}
</style>
