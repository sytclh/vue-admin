<!-- 设置 -->
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useStore } from "@/store";

const store = useStore();
const showSetting = () => {
  store.commit("UPDATE_SETTING_DRAWER");
};
</script>

<template>
  <div
    class="setting-container"
    :title="$t('message.systemSetting')"
    @click="showSetting"
  >
    <SvgIcon icon-name="el-setting" :size="20" />
  </div>
</template>

<style scoped lang="scss">
.setting-container {
  position: fixed;
  height: 40px;
  top: 33%;
  color: #fff;
  background-color: #4091f7ad;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  transform: translateX(30px);
  transition: all 0.3s;
  &:hover {
    transform: translateX(0px);
  }
}
</style>
