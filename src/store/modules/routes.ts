import { routesState, State } from "@typings/vuex";
import { ActionTree, Module, MutationTree } from "vuex";
import { storageSession } from "@/utils/storage";
import { RouteRecordRaw } from "vue-router";
import { requestAsyncRoutes } from "@/apis/router";
import { router } from "@/routes";
import Layout from "@/layout/index.vue";
import { isExternalLink } from "@/utils/helpers";
const fileModules = import.meta.glob("/src/views/**/*.vue");

/**
 * 根据数组rank字段进行排序
 * @param routes 原始数组
 * @returns 返回排序后的数组
 */
const ascRoutes = (routes: Array<MenuListItem>): Array<MenuListItem> => {
  return routes.sort((a, b) => a.rank - b.rank);
};
/**
 * 将原始路由转化为新的路由对象
 * @param route 原始路由对象
 * @returns 处理后的路由
 */
const MenuItemToComponentItem = (route: MenuListItem): MenuComponentItem => {
  let component: string;
  const name = (route.path.match(/\/(\w+)$/) as RegExpMatchArray)[1];
  if (route.parentId === null) {
    component = "/layout";
  } else {
    component = isExternalLink(route.path) ? "" : route.path;
  }
  return {
    path: route.path,
    name,
    component,
    meta: {
      type: route.type,
      icon: route.icon,
      i18n: route.i18n,
      title: route.title,
      hidden: route.hidden,
      rank: route.rank,
    },
    children: [],
  };
};

/**
 * 将请求的原始值处理后保存, 将hidden为false的提取出来, 否则用户修改sessionStorage的内容就可以访问其它未授权页面
 * @param routes 原始数组
 * @returns 新数组(保存在sessionStorage中)
 */
const filterForStorage = (routes: MenuListItem[]): MenuComponentItem[] => {
  let parentList: MenuListItem[] = [];
  let childrenList: MenuListItem[] = [];
  const storageRoutes: MenuComponentItem[] = [];
  routes.forEach((val) => {
    if (val.hidden !== true) {
      val.parentId === null ? parentList.push(val) : childrenList.push(val);
    }
  });
  parentList = ascRoutes(parentList);
  childrenList = ascRoutes(childrenList);
  const parentStorageList: MenuComponentItem[] = [];
  parentList.forEach((val) => {
    const temp = MenuItemToComponentItem(val);
    parentStorageList.push(temp);
    storageRoutes.push(temp);
  });
  while (parentList.length > 0) {
    const parent = parentList.shift() as MenuListItem;
    const parentStorage = parentStorageList.shift() as MenuComponentItem;
    const tempList = childrenList.filter((cVal) => cVal.parentId === parent.id);
    if (tempList.length > 0) {
      parentList.push(...tempList);
      tempList.forEach((val) => {
        const temp = MenuItemToComponentItem(val);
        parentStorageList.push(temp);
        (parentStorage.children as MenuComponentItem[]).push(temp);
      });
    }
  }
  return storageRoutes;
};

/**
 * 将componet字符串转为component对象或 () => import()
 * @param routes filterHidden返回的路由
 * @returns 路由对象，用于动态添加路由
 */
const filterForRouter = (
  routes: MenuComponentItem[],
  parentRoute?: RouteRecordRaw
): RouteRecordRaw[] | void => {
  const componentRoutes: RouteRecordRaw[] = [];
  routes.forEach((val) => {
    if (val.meta.hidden !== true) {
      const temp: RouteRecordRaw = {
        path: val.path,
        name: val.name,
        component:
          val.component === "/layout" || isExternalLink(val.component)
            ? Layout
            : fileModules[`/src/views${val.component}/index.vue`],
        meta: val.meta,
        children: [],
      };
      componentRoutes.push(temp);
      if (val.children.length > 0) {
        filterForRouter(val.children, temp);
      }
    }
  });
  if (typeof parentRoute === "undefined") {
    return componentRoutes;
  } else {
    parentRoute.children = componentRoutes;
  }
};

const state: routesState = {
  // 存储动态路由
  routes: storageSession.get("router") ?? [],
  btnsAuth: [],
  cacheRouteList: [],
  cachePageList: [],
};
const getters = {};

const mutations: MutationTree<routesState> = {
  UPDATE_ROUTES(state: routesState, payload?: MenuComponentItem[]) {
    if (typeof payload === "undefined") {
      state.routes = [];
      storageSession.remove("router");
    } else {
      state.routes = payload;
      storageSession.set("router", {
        type: "object",
        content: payload,
      });
    }
  },
  UPDATE_BTNS_AUTH(state: routesState, payload?: string[]) {
    if (typeof payload === "undefined") {
      state.btnsAuth = [];
      storageSession.remove("btnsAuth");
    } else {
      state.btnsAuth = payload;
      storageSession.set("btnsAuth", {
        type: "object",
        content: payload,
      });
    }
  },
  ADD_CACHE_ROUTE_LIST(state: routesState, payload: TagItem[]) {
    payload.forEach((val) => {
      state.cacheRouteList.push(val);
    });
  },
  REMOVE_CACHE_ROUTE_LIST(
    state: routesState,
    payload: { mode: "self" | "other" | "all"; name: string; index: number }
  ) {
    if (payload.mode === "self") {
      payload.index !== -1 && state.cacheRouteList.splice(payload.index, 1);
    } else if (payload.mode === "other") {
      const affixRoutes = state.cacheRouteList.filter(
        (value) => value.meta.affix
      );
      const selfRoutes = state.cacheRouteList.filter(
        (value) => !value.meta.affix && value.name === payload.name
      );
      state.cacheRouteList = [...affixRoutes, ...selfRoutes];
    } else {
      const affixRoutes = state.cacheRouteList.filter(
        (value) => value.meta.affix
      );
      state.cacheRouteList = [...affixRoutes];
    }
  },
  ADD_CACHE_PAGE_LIST(state: routesState, payload: string[]) {
    payload.forEach((val) => {
      !state.cachePageList.includes(val) && state.cachePageList.push(val);
    });
  },
  REMOVE_CACHE_PAGE_LIST(
    state: routesState,
    payload: { mode: "self" | "other"; name: string[] }
  ) {
    if (payload.mode === "self") {
      state.cachePageList.splice(
        state.cachePageList.indexOf(payload.name[0]),
        1
      );
    } else {
      state.cachePageList = [...payload.name];
    }
  },
};
const actions: ActionTree<routesState, State> = {
  getAsyncRoutes(
    { commit, dispatch },
    payload: string
  ): Promise<MenuComponentItem[]> {
    return new Promise((resolve) => {
      if (state.routes.length !== 0) {
        // 本地已存在路由数组
        const routes = filterForRouter(state.routes);
        dispatch("addRoutes", routes);
        resolve(state.routes);
      } else {
        // 获取新路由数组并处理
        requestAsyncRoutes({ user: payload })
          .then((res) => {
            if (res.code === 0) {
              const asyncRoutes = res.data;
              const menuRoutes = filterForStorage(asyncRoutes);
              commit("UPDATE_ROUTES", menuRoutes);
              const routes = filterForRouter(menuRoutes);
              dispatch("addRoutes", routes);
              resolve(menuRoutes);
            }
          })
          .catch((err) => {
            resolve(err);
          });
      }
    });
  },
  addRoutes({}, payload: RouteRecordRaw[]) {
    // 将处理后的路由数组再次处理成路由对象并注册
    payload.forEach((val) => {
      if (!router.hasRoute(val.name as string)) {
        router.addRoute(val);
      }
    });
    if (!router.hasRoute("not-found")) {
      const errorRoute = {
        path: "/:pathMatch(.*)",
        name: "not-found",
        redirect: "/error/404",
      };
      router.addRoute(errorRoute);
    }
  },
  clearRoutes({ commit }) {
    commit("UPDATE_ROUTES");
    commit("UPDATE_BTNS_AUTH");
  },
  addCacheTags({ commit }, payload: TagItem[]) {
    commit("ADD_CACHE_ROUTE_LIST", payload);
    commit(
      "ADD_CACHE_PAGE_LIST",
      payload.map((val) => val.name)
    );
  },
  removeCacheTags(
    { commit },
    payload: { mode: "self" | "other" | "all"; name: string; index: number }
  ) {
    commit("REMOVE_CACHE_ROUTE_LIST", payload);
    if (payload.mode === "self") {
      commit("REMOVE_CACHE_PAGE_LIST", {
        mode: "self",
        name: [payload.name],
      });
    } else if (payload.mode === "other") {
      const affixRoutes = state.cacheRouteList.filter(
        (value) => value.meta.affix
      );
      const selfRoutes = state.cacheRouteList.filter(
        (value) => !value.meta.affix && value.name === payload.name
      );
      commit("REMOVE_CACHE_PAGE_LIST", {
        mode: "other",
        name: [
          ...affixRoutes.map((val) => val.name),
          ...selfRoutes.map((val) => val.name),
        ],
      });
    } else {
      const affixRoutes = state.cacheRouteList.filter(
        (value) => value.meta.affix
      );
      commit("REMOVE_CACHE_PAGE_LIST", {
        mode: "other",
        name: [...affixRoutes.map((val) => val.name)],
      });
    }
  },
};

const routesStore: Module<routesState, State> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { routesStore, routesStore as default };
