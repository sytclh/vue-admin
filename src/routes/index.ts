import { createRouter, createWebHashHistory } from "vue-router";
import { transformI18n } from "@/configs/i18n";
import { store } from "@/store";
import NProgress from "@/utils/nprogress";
import { isExternalLink, openLink } from "@/utils/helpers";
// 导入常量路由
import { homeRoutes } from "./modules/homeRoutes";
import { errorRoutes } from "./modules/errorRoutes";
import { tailRoutes } from "./modules/tailRoutes";
// 按文件顺序批量导入模块(无序的), 可能需要重新排序
// const modulesObj = import.meta.glob("./modules/**/*.ts");
// const moduleArr: RouteRecordRaw[] = [];
// Object.keys(modulesObj).forEach((key) => {
//   modulesObj[key]().then((val) => {
//     moduleArr.push(...val.default);
//   });
// });

export const constantRoutes = [...homeRoutes, ...errorRoutes, ...tailRoutes];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return {
      left: 0,
      top: 0,
      behavior: "smooth",
    };
  },
});

// 路由白名单
const whiteList = ["/login", "/test", "/icons"];

let hasAddAsyncRoutes = false;
// 注意: 每个分支有且只能有一个next()
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const externalLink = isExternalLink(to.fullPath);
  if (!externalLink) {
    // 修改网站title
    document.title = transformI18n(
      to.meta.title as string,
      to.meta.i18n as boolean
    );
  } else {
    openLink(to.fullPath);
    NProgress.done();
  }
  // 简单验证
  const userInfo = store.state.user?.userInfo;
  if (userInfo) {
    // 已登录
    if (to.path === "/login") {
      next();
    } else {
      if (hasAddAsyncRoutes) {
        // 刷新后
        next();
      } else {
        if (to.matched.length === 0 || from.name === undefined) {
          // 刷新
          hasAddAsyncRoutes = true;
          // 重新注册动态路由
          await store.dispatch("routes/getAsyncRoutes", userInfo.user);
          next({ ...to, replace: true });
        } else {
          // 正常登录后，刷新前
          if (store.state.routes?.routes.length === 0) {
            await store.dispatch("routes/getAsyncRoutes", userInfo.user);
          }
          next();
        }
      }
    }
  } else {
    // 未登录
    if (to.path !== "/login") {
      // 输入其它路径
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        // 重定向到/login
        // store.dispatch("user/toLogout");
        next({
          path: "/login",
          replace: true,
        });
      }
    } else {
      // 输入 /login
      // store.dispatch("user/toLogout");
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
