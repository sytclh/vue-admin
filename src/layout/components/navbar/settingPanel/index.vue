<!-- 项目配置 -->
<script setup lang="ts">
import {
  ElDrawer,
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadio,
  ElScrollbar,
  ElSwitch,
} from "element-plus";
import { useStore } from "@/store";
import { computed, ref } from "vue";

const store = useStore();
const drawer = computed({
  get: () => store.state.settingDrawer,
  set: () => store.commit("UPDATE_SETTING_DRAWER"),
});

// 布局
const layout = computed({
  get: () => store.state.layout,
  set: (val) =>
    store.commit("UPDATE_SETTING_CONFIG", {
      layout: val,
    }),
});
const handleLayoutChange = (label: LayoutType) => {
  layout.value = label;
};
// 主题
const theme = ref(store.state.theme);
const handleThemeChange = (label: ThemeType) => {
  theme.value = label;
  store.commit("UPDATE_SETTING_CONFIG", {
    theme: label,
  });
};
// 固定导航栏
const fixedHeader = ref(store.state.fixedHeader);
const handleFixedHeaderChange = (e: any) => {
  store.commit("UPDATE_SETTING_CONFIG", {
    fixedHeader: e,
  });
};
// 隐藏标签页
const hideTabs = ref(store.state.hideTabs);
const handleHideTabsChange = (e: any) => {
  store.commit("UPDATE_SETTING_CONFIG", {
    hideTabs: e,
  });
};
// 显示Logo
const hasLogo = ref(store.state.hasLogo);
const handleHasLogoChange = (e: any) => {
  store.commit("UPDATE_LOGO", e);
};
// 灰色模式
const grey = ref(store.state.grey);
const handleGreyChange = (e: any) => {
  store.commit("UPDATE_SETTING_CONFIG", {
    grey: e,
  });
};
// 色弱模式
const weak = ref(store.state.weak);
const handleWeakChange = (e: any) => {
  store.commit("UPDATE_SETTING_CONFIG", {
    weak: e,
  });
};
</script>

<template>
  <el-drawer custom-class="project-settings" title="项目配置" v-model="drawer">
    <el-scrollbar wrap-class="setting-body">
      <el-form>
        <el-form-item label="布局">
          <el-radio-group v-model="layout" @change="handleLayoutChange">
            <el-radio label="vertical" border>垂直</el-radio>
            <el-radio label="horizontal" border>水平</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主题">
          <el-radio-group v-model="theme" @change="handleThemeChange">
            <el-radio label="default" border>默认</el-radio>
            <el-radio label="light" border>明亮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="固定导航栏">
          <el-switch
            v-model="fixedHeader"
            @change="handleFixedHeaderChange"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </el-form-item>
        <el-form-item label="隐藏标签页">
          <el-switch
            v-model="hideTabs"
            @change="handleHideTabsChange"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </el-form-item>
        <el-form-item label="显示Logo">
          <el-switch
            v-model="hasLogo"
            @change="handleHasLogoChange"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </el-form-item>
        <el-form-item label="灰色模式">
          <el-switch
            v-model="grey"
            @change="handleGreyChange"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </el-form-item>
        <el-form-item label="色弱模式">
          <el-switch
            v-model="weak"
            @change="handleWeakChange"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-drawer>
</template>

<style lang="scss">
.project-settings {
  min-width: 350px;
  .el-drawer__header {
    font-weight: 800;
    font-size: 1.3em;
    color: #000;
    border-bottom: 1px solid #dcdfe7;
    margin-bottom: unset;
    padding-bottom: var(--el-drawer-padding-primary);
  }
  .el-drawer__body {
    height: calc(100vh - 70.6px);
    padding: 0;
  }
  .setting-body {
    padding: 20px 20px 0;
  }
}

@media screen and (max-width: 425px) {
  .project-settings {
    min-width: 100vw;
  }
}
</style>
