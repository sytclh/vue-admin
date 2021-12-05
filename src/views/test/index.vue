<!-- 测试页 -->
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import http from "@/utils/http";

const { locale, t } = useI18n();

const store = useStore();
const lang = computed(() => store.state.lang);
const change = () => {
  const val: langType = lang.value === "en" ? "zh-cn" : "en";
  store.commit("UPDATE_LANG", val);
  locale.value = val;
  console.log(t("message.home"));
  http.get("/getAsyncRoutes?name=admin").then((res) => {
    console.log(res);
  });
};
</script>

<template>
  <div>
    <span>{{ $t("message.hello") }}</span>
    <button @click="change">修改</button>
  </div>
</template>

<style scoped lang="scss"></style>
