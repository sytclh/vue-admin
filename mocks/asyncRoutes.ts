import { MockMethod } from "vite-plugin-mock";

// http://mockjs.com/examples.html#Object
/**
 * type: 0(目录) | 1(菜单) | 2(按钮)
 */
const systemRoutes: MenuListItem[] = [
  {
    id: "system",
    parentId: null,
    type: 0,
    path: "/system",
    icon: "fa-cog",
    i18n: true,
    title: "message.sysManagement",
    hidden: false,
    rank: 5,
  },
  {
    id: "log",
    parentId: "system",
    type: 0,
    path: "/system/log",
    icon: null,
    i18n: true,
    title: "message.logManagement",
    hidden: false,
    rank: 3,
  },
  {
    id: "operationLog",
    parentId: "log",
    type: 1,
    path: "/system/log/operationLog",
    icon: null,
    i18n: true,
    title: "message.operationLog",
    hidden: false,
    rank: 2,
  },
  {
    id: "loginLog",
    parentId: "log",
    type: 1,
    path: "/system/log/loginLog",
    icon: null,
    i18n: true,
    title: "message.loginLog",
    hidden: false,
    rank: 1,
  },
  {
    id: "dict",
    parentId: "system",
    type: 1,
    path: "/system/dict",
    icon: null,
    i18n: true,
    title: "message.dictManagement",
    hidden: false,
    rank: 1,
  },
];

const authRoutes: MenuListItem[] = [
  {
    id: "auth",
    parentId: null,
    type: 0,
    path: "/auth",
    icon: "fa-cog",
    i18n: true,
    title: "message.authManagement",
    hidden: false,
    rank: 2,
  },
  {
    id: "user",
    parentId: "auth",
    type: 1,
    path: "/auth/user",
    icon: null,
    i18n: true,
    title: "message.userManagement",
    hidden: false,
    rank: 3,
  },
  {
    id: "role",
    parentId: "auth",
    type: 1,
    path: "/auth/role",
    icon: null,
    i18n: true,
    title: "message.roleManagement",
    hidden: false,
    rank: 2,
  },
  {
    id: "menu",
    parentId: "auth",
    type: 1,
    path: "/auth/menu",
    icon: null,
    i18n: true,
    title: "message.menuManagement",
    hidden: false,
    rank: 1,
  },
];

export default [
  {
    url: "/getAsyncRoutes",
    method: "post",
    response: ({ body }: ResponseContext): ReturnResult<MenuListItem[]> => {
      if (body.name === "test") {
        return {
          code: 0,
          data: systemRoutes,
          msg: "success",
        };
      } else {
        return {
          code: 0,
          data: [...systemRoutes, ...authRoutes],
          msg: "success",
        };
      }
    },
  },
] as MockMethod[];
