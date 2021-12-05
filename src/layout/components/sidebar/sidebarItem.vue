<!-- 菜单 -->
<script setup lang="ts">
import { PropType, ref } from "vue";
import { ElMenuItem, ElSubMenu } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { transformI18n } from "@/configs/i18n";

const props = defineProps({
  item: {
    type: Object as PropType<MenuComponentItem>,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
});

const onlyOneChild = ref<MenuComponentItem>();
const hasOnlyOneChild = (parent: MenuComponentItem) => {
  if (props.isNest) {
    if (parent.meta.type === 1) {
      onlyOneChild.value = parent;
      return true;
    }
  } else {
    if (parent.children.length === 1 && parent.children[0].meta.type === 1) {
      onlyOneChild.value = parent.children[0];
      return true;
    }
  }
  return false;
};
</script>

<template>
  <template v-if="hasOnlyOneChild(props.item)">
    <el-menu-item :index="onlyOneChild?.path">
      <svg-icon
        v-if="!!onlyOneChild?.meta.icon"
        class="el-icon"
        :icon-name="onlyOneChild.meta.icon"
      />
      <template #title>
        <span>{{
          transformI18n(onlyOneChild?.meta.title, onlyOneChild?.meta.i18n)
        }}</span>
      </template>
    </el-menu-item>
  </template>
  <el-sub-menu v-else :index="props.item.path" popper-append-to-body>
    <template #title>
      <svg-icon
        v-if="!!props.item.meta.icon"
        class="el-icon"
        :icon-name="props.item.meta.icon"
      />
      <span>{{
        transformI18n(props.item.meta.title, props.item.meta.i18n)
      }}</span>
    </template>
    <sidebar-item
      v-for="child in props.item.children"
      :key="child.path"
      :item="child"
      :base-path="child.path"
      :is-nest="true"
    />
  </el-sub-menu>
</template>

<style scoped lang="scss"></style>
