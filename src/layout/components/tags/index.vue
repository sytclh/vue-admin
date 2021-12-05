<!-- 标签页 -->
<script setup lang="ts">
import { transformI18n } from "@/configs/i18n";
import { affixRoute } from "@/routes/modules/homeRoutes";
import { useStore } from "@/store";
import { ElButton, ElScrollbar } from "element-plus";
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  WatchStopHandle,
} from "vue";
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon/index.vue";

const store = useStore();
// 是否隐藏标签栏
const hideTabs = computed(() => store.state.hideTabs);

const router = useRouter();
const route = useRoute();
// 显示缓存路由
const cacheRouteList = computed(
  () => store.state.routes?.cacheRouteList as TagItem[]
);

// 初始化标签页, 添加affix路由
const initAffixRoute = (routes: TagItem[]) => {
  // 过滤，防止页面回退后重复添加
  const filterList = routes.filter(
    (route) => !cacheRouteList.value.some((val) => val.name === route.name)
  );
  store.dispatch("routes/addCacheTags", filterList);
};
initAffixRoute(affixRoute);

const addTag = (route: RouteLocationNormalizedLoaded) => {
  const flag = cacheRouteList.value.some((val) => val.name === route.name);
  if (!flag) {
    const temp: TagItem = {
      path: route.path,
      fullPath: route.fullPath,
      query: route.query,
      hash: route.hash,
      name: route.name as string,
      params: route.params,
      meta: {
        i18n: route.meta.i18n as boolean,
        title: route.meta.title as string,
        affix: route.meta.affix as boolean | undefined,
      },
    };
    store.dispatch("routes/addCacheTags", [temp]);
  }
};

const instance = getCurrentInstance();
const activeTag = ref("");
const activeIndex = ref(0);
// 选中标签
const selectTag = (index: number) => {
  nextTick(() => {
    // 将标签页滚动至可见
    setTimeout(() => {
      (instance?.refs[`dynamic${index}`] as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }, 0);
  });
};
// 监听路由变化(注意：退出/进入路由都会触发watch)，添加标签栏及keep-alive
let stopWatch: WatchStopHandle;
onMounted(() => {
  stopWatch = watch(
    () => router.currentRoute.value,
    (newRoute) => {
      // 匹配的第一个必须是layout
      if (newRoute.matched.length > 1) {
        if (!newRoute.meta.hidden) {
          activeTag.value = newRoute.name as string;
          const index = cacheRouteList.value.findIndex(
            (value) => value.name === newRoute.name
          );
          if (index !== -1) {
            selectTag(index);
          } else {
            addTag(newRoute);
            selectTag(cacheRouteList.value.length - 1);
          }
        }
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
});
onBeforeUnmount(() => {
  stopWatch();
});
// 关闭标签
const closeTags = (
  mode: "self" | "other" | "all",
  name: string,
  index: number
) => {
  if (mode === "self") {
    store.dispatch("routes/removeCacheTags", {
      mode,
      name,
      index,
    });
    // 关闭当前标签页
    if (activeTag.value === name) {
      setTimeout(() => {
        const preRoute = cacheRouteList.value[index - 1];
        router.push({ path: `/redirect${preRoute.path}` });
      }, 0);
    }
  } else if (mode === "other") {
    // 关闭其它标签
    if (activeIndex.value !== index) {
      const path = cacheRouteList.value[index].path;
      activeTag.value = cacheRouteList.value[index].name as string;
      store.dispatch("routes/removeCacheTags", {
        mode,
        name,
        index,
      });
      activeIndex.value = cacheRouteList.value.findIndex(
        (val) => val.name === activeTag.value
      );
      router.push({ path: `/redirect${path}` });
    } else {
    }
  } else {
    store.dispatch("routes/removeCacheTags", {
      mode,
      name,
      index,
    });
    // 关闭所有标签
    if (cacheRouteList.value.length > 0) {
      activeIndex.value = 0;
      activeTag.value = cacheRouteList.value[0].name as string;
      router.push({ path: cacheRouteList.value[0].path });
    } else {
      activeIndex.value = 0;
      activeTag.value = "";
    }
  }
};
// 刷新当前标签页
const refreshTag = (index?: number) => {
  if (typeof index === "undefined") {
    const currentRoute = cacheRouteList.value.find(
      (value) => value.name === activeTag.value
    );
    if (currentRoute) {
      router.push({
        path: `/redirect${currentRoute.path}`,
      });
    }
  } else {
    router.push({
      path: `/redirect${cacheRouteList.value[index].path}`,
    });
  }
};
// 右键菜单
const contextMenuVisible = ref(false);
// 左键点击隐藏右键菜单
const cancelContextMenu = () => {
  contextMenuVisible.value = false;
};
onMounted(() => {
  window.addEventListener("click", cancelContextMenu);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", cancelContextMenu);
});

const contextMenuPosition = reactive({
  top: "0px",
  left: "0px",
});
const triggerClickTagIndex = ref(0);
const contextMenuRef = ref<HTMLUListElement>();
const handleContextMenu = (index: number, e: MouseEvent) => {
  e.preventDefault();
  contextMenuVisible.value = true;
  triggerClickTagIndex.value = index;
  nextTick(() => {
    contextMenuPosition.top = e.pageY + 20 + "px";
    const contextMenuWidth = contextMenuRef.value?.clientWidth as number;
    const parentWidth =
      ((e.currentTarget as HTMLDivElement).offsetParent
        ?.clientWidth as number) + 40;
    const contextMenuLeft = (e.currentTarget as HTMLDivElement).offsetLeft;
    if (parentWidth - contextMenuLeft < contextMenuWidth) {
      contextMenuPosition.left = parentWidth - contextMenuWidth - 5 + "px";
    } else {
      contextMenuPosition.left = contextMenuLeft + "px";
    }
  });
};
const contextMenu = [
  {
    operation: "refreshTag",
    title: "message.refreshTag",
    icon: "el-refresh",
  },
  {
    operation: "closeOtherTags",
    title: "message.closeOtherTags",
    icon: "el-minus",
  },
  {
    operation: "closeAllTags",
    title: "message.closeAllTags",
    icon: "el-minus",
  },
];
const handleContextMenuClick = (operation: string) => {
  if (operation === "refreshTag") {
    refreshTag(triggerClickTagIndex.value);
  } else if (operation === "closeOtherTags") {
    const name = cacheRouteList.value[triggerClickTagIndex.value]
      .name as string;
    closeTags("other", name, triggerClickTagIndex.value);
  } else if (operation === "closeAllTags") {
    const name = cacheRouteList.value[triggerClickTagIndex.value]
      .name as string;
    closeTags("all", name, triggerClickTagIndex.value);
  }
};
</script>

<template>
  <div class="tags" v-if="!hideTabs">
    <el-scrollbar class="tags-container" wrap-class="tags-wrapper">
      <div class="tag-list">
        <div
          class="tag-item"
          v-for="(item, index) in cacheRouteList"
          :key="index"
          :ref="`dynamic${index}`"
          @click.right="handleContextMenu(index, $event)"
        >
          <router-link class="tag-link" :to="item.path">
            <el-button
              class="tag-btn"
              :class="{ 'tag-close-btn': !item.meta.affix }"
              :plain="item.name !== activeTag"
              type="primary"
            >
              {{ transformI18n(item.meta.title, item.meta.i18n) }}
            </el-button>
          </router-link>
          <SvgIcon
            v-if="!item.meta.affix"
            class="close-icon"
            :class="{ 'active-close-icon': item.name === activeTag }"
            icon-name="el-close"
            :size="20"
            @click.stop="closeTags('self', String(item.name), index)"
          />
        </div>
      </div>
    </el-scrollbar>
    <div
      class="refresh-container icon-shadow"
      :title="$t('message.refreshTag')"
      @click="refreshTag()"
    >
      <SvgIcon icon-name="el-refresh" :size="20" />
    </div>
    <ul
      class="contextmenu"
      v-show="contextMenuVisible"
      :style="contextMenuPosition"
      ref="contextMenuRef"
    >
      <li
        class="icon-shadow"
        v-for="(item, index) in contextMenu"
        :key="index"
        @click="handleContextMenuClick(item.operation)"
      >
        <SvgIcon :icon-name="item.icon" :size="18" />
        <span style="margin-left: 5px">{{ $t(item.title) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.tags {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: $navbarBackground;
  border: 1px solid #eaeaeaea;
  border-left: none;
  border-right: none;
  .tags-container {
    width: 100%;
  }
  :deep(.tags-wrapper) {
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    .tag-list {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 5px;
      .tag-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-left: 5px;
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          .close-icon {
            color: #ffffff;
          }
        }
        .tag-link {
          display: inline-block;
          .tag-btn {
            padding: 0 10px;
            min-height: 30px;
            &.tag-close-btn {
              padding: 0 25px 0 10px;
            }
          }
        }
        .close-icon {
          position: absolute;
          right: 5px;
          color: #409eff;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
          &.active-close-icon {
            color: #ffffff;
          }
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    padding: 5px 0;
    color: $navbarTextColor;
    border-radius: 4px;
    background-color: $navbarBackground;
    font-size: $smallFontSize;
    box-shadow: 0 2px 6px #999999ea;
    z-index: 999;
    .icon-shadow {
      justify-content: flex-start;
    }
  }
}
</style>
