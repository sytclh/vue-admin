import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
const errorRoutes: RouteRecordRaw[] = [
  {
    path: "/error",
    name: "error",
    component: Layout,
    meta: {
      i18n: false,
      title: "error",
      hidden: true,
    },
    children: [
      {
        path: "401",
        name: "401",
        component: () => import("@/views/error/401.vue"),
        meta: {
          i18n: false,
          title: "401",
          hidden: true,
        },
      },
      {
        path: "404",
        name: "404",
        component: () => import("@/views/error/404.vue"),
        meta: {
          i18n: false,
          title: "404",
          hidden: true,
        },
      },
    ],
  },
];

export { errorRoutes, errorRoutes as default };
