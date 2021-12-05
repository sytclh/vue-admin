<!-- 图标组件 -->
<script setup lang="ts">
import { computed } from "vue";
import { ElIcon } from "element-plus";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { elementPlusIcons, fortawesomeIcons } from "@/configs/iconConfig";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "inherit",
  },
  size: {
    type: Number,
  },
});
const isFas = () => props.iconName.startsWith("fas-");
const isFa = () => props.iconName.startsWith("fa-");
const isEl = () => props.iconName.startsWith("el-");
const isSvg = () => props.iconName.startsWith("icon-");
const iconName = computed(() => {
  if (isSvg()) {
    return `#${props.iconName}`;
  } else if (isEl()) {
    const name = props.iconName
      .slice(2)
      .replace(/\-([a-z])/g, (_, p1) => p1.toUpperCase());
    return (elementPlusIcons as any)[name];
  } else if (isFas()) {
    const name = props.iconName
      .slice(3)
      .replace(/\-([a-z])/g, (_, p1) => p1.toUpperCase());
    library.add(fortawesomeIcons[`fa${name}`]);
    return props.iconName.slice(4);
  } else if (isFa()) {
    return ["fa", props.iconName];
  } else {
    return props.iconName;
  }
});
</script>

<template>
  <el-icon
    v-if="isEl()"
    :size="props.size"
    :color="props.color"
  >
    <component :is="iconName" />
  </el-icon>
  <font-awesome-icon
    v-else-if="isFas()"
    :icon="iconName"
    :style="{ color: color, fontSize: size + 'px' }"
  />
  <i
    v-else-if="isFa()"
    :class="iconName"
    :style="{ color: color, fontSize: size + 'px' }"
  />
  <svg
    v-else-if="isSvg()"
    class="svg-icon"
    aria-hidden="true"
    :style="{ fontSize: size + 'px' }"
  >
    <use :xlink:href="iconName" :color="color"></use>
  </svg>
  <div v-else>这个{{ iconName }}有问题</div>
</template>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;
  fill: currentColor;
}
</style>
