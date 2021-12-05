<!-- 全屏图标处理 -->
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { onBeforeUnmount, ref } from "vue";

const isFullscreen = ref(false);
const isSupport = document.fullscreenEnabled;
const handleF11 = (e: KeyboardEvent) => {
  if (e.key === "F11") {
    e.preventDefault();
    toggle();
  }
};
document.addEventListener("keydown", handleF11, true);
const handleFullscreenchange = () => {
  if (isSupport) {
    if (document.fullscreenElement) {
      isFullscreen.value = true;
    } else {
      isFullscreen.value = false;
    }
  }
};
document.addEventListener("fullscreenchange", handleFullscreenchange, true);
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleF11);
  document.removeEventListener("fullscreenchange", handleFullscreenchange);
});

const enter = () => {
  if (!isSupport) {
    return false;
  }
  if (isFullscreen.value) {
    return false;
  }
  document.documentElement.requestFullscreen();
  isFullscreen.value = true;
  return true;
};
const exit = () => {
  if (!isSupport) {
    return false;
  }
  if (!isFullscreen.value) {
    return false;
  }
  document.exitFullscreen();
  isFullscreen.value = false;
  return true;
};
const toggle = () => {
  if (isSupport) {
    if (isFullscreen.value) {
      exit();
    } else {
      enter();
    }
  }
};
</script>

<template>
  <div
    v-if="isSupport"
    class="full-screen icon-shadow"
    :title="
      isFullscreen ? $t('message.exit_screen') : $t('message.full_screen')
    "
    @click="toggle"
  >
    <svg-icon
      :icon-name="isFullscreen ? 'icon-exit_screen' : 'icon-full_screen'"
      :size="20"
    />
  </div>
</template>

<style scoped lang="scss"></style>
