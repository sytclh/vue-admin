import { store } from "@/store";
import { isMobile } from "@/utils/helpers";
import { watchEffect } from "vue";

export const initLayoutStyle = () => {
  // 设置初始页面样式布局
  const stop = watchEffect(
    () => {
      store.dispatch("updateDeviceAndSideBarOrLayout", isMobile());
      if (store.state.layout) {
        document.body.setAttribute("layout", store.state.layout);
      }
      if (store.state.theme) {
        document.documentElement.classList.add(
          `layout-theme-${store.state.theme}`
        );
      }
      if (store.state.grey) {
        document.documentElement.classList.add("html-grey");
      }
      if (store.state.weak) {
        document.documentElement.classList.add("html-weakness");
      }
    },
    {
      flush: "post",
    }
  );
  stop();
};
