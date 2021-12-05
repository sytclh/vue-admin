import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const tailRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: {
      i18n: true,
      title: "message.login",
      hidden: true,
    },
  },
  {
    path: "/redirect",
    name: "redirect",
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect.vue"),
      },
    ],
  },
  // 专用于测试功能的页面
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
    meta: {
      i18n: true,
      title: "message.test",
      hidden: true,
    },
  },
  // 展示所有可用图标
  {
    path: "/icons",
    name: "icons",
    component: () => import("@/views/icons/index.vue"),
    meta: {
      i18n: true,
      title: "message.icons",
      hidden: true,
    },
  },
];

export { tailRoutes, tailRoutes as default };
