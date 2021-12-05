import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/home",
    meta: {
      i18n: false,
      title: null,
      icon: null,
      hidden: false,
      rank: 0,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          affix: true,
          i18n: true,
          title: "message.home",
          icon: "fa-cog",
          hidden: false,
          rank: 0,
        },
      },
    ],
  },
];

const homeMenu: MenuComponentItem[] = [
  {
    path: "/",
    name: "layout",
    component: "/layout",
    meta: {
      type: 0,
      i18n: false,
      title: null,
      icon: null,
      hidden: false,
      rank: 0,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: "/home",
        meta: {
          type: 1,
          affix: true,
          i18n: true,
          title: "message.home",
          icon: "el-edit",
          hidden: false,
          rank: 0,
        },
        children: [],
      },
    ],
  },
];

const affixRoute: TagItem[] = [
  {
    path: "/home",
    fullPath: "/home",
    query: {},
    hash: "",
    name: "home",
    params: {},
    meta: {
      affix: true,
      i18n: true,
      title: "message.home",
    },
  },
];

export { affixRoute, homeMenu, homeRoutes, homeRoutes as default };
