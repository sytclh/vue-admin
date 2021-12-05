<!-- 国际化 -->
<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useStore } from "@/store";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { transformI18n } from "@/configs/i18n";
import { useRoute } from "vue-router";

const store = useStore();
const lang = computed(() => store.state.lang);
const locales = [
  { type: "zh-cn", name: "简体中文" },
  { type: "en", name: "English" },
];
const { locale } = useI18n();
const route = useRoute();
watch(
  () => locale.value,
  () => {
    document.title = transformI18n(
      route.meta.title as string,
      route.meta.i18n as boolean
    );
  }
);
const handleLang = (l: string) => {
  if (l !== lang.value) {
    store.commit("UPDATE_LANG", l);
  }
};
</script>

<template>
  <el-dropdown
    class="international-container icon-shadow"
    trigger="click"
    :title="$t('message.international')"
  >
    <SvgIcon icon-name="icon-international" :size="20" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in locales"
          :key="item.type"
          @click="handleLang(item.type)"
        >
          <SvgIcon
            icon-name="el-check"
            :color="item.type === lang ? 'black' : 'transparent'"
          />
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
