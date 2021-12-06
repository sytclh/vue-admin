<!-- 当前登录账户 -->
<script setup lang="ts">
import { useStore } from "@/store";
import {
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} from "element-plus";
import { computed } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useRouter } from "vue-router";

const store = useStore();
const userInfo = computed(() => store.state.user?.userInfo);
const user = userInfo.value.user;

const router = useRouter();
const logout = () => {
  store.dispatch("user/toLogout").then((res) => {
    if (res.code === 0) {
      router.replace("/login");
    }
  });
};
</script>

<template>
  <el-dropdown
    class="avatar-container icon-shadow"
    trigger="click"
    placement="bottom-end"
  >
    <el-avatar>
      {{ user }}
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">
          <SvgIcon icon-name="el-switch-button" />
          {{ $t("message.logout") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
