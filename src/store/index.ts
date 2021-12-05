import { InjectionKey } from "vue";
import {
  createStore,
  useStore as useBaseStore,
  Store,
  ModuleTree,
  ActionTree,
} from "vuex";
import { Language } from "element-plus/es/locale";
import { State } from "typings/vuex";
import { messages, i18n, transformI18n } from "@/configs/i18n";
import { storageLocal } from "@/utils/storage";
import { settingConfig } from "@/configs/setting";
import { isMobile } from "@/utils/helpers";

// 统一处理模块
const modulesObj = import.meta.globEager("./modules/**/*.ts");
const newModulesObj: ModuleTree<State> = {};
Object.keys(modulesObj).forEach((key) => {
  const fileName = key.split("/").pop() as string;
  const newKey = fileName.slice(0, -3);
  const module = modulesObj[key];
  newModulesObj[newKey] = module.default;
});

const storageSettingConfig = storageLocal.get("settingConfig");

const state: State = {
  settingDrawer: false,
  hasLogo: storageLocal.get("hasLogo") ?? true,
  device: isMobile() ? "mobile" : "desktop",
  title: transformI18n(settingConfig.title, true),
  // lang与locale相关联，单独存储。
  lang: storageLocal.get("lang") || settingConfig.lang,
  fixedHeader: storageSettingConfig?.fixedHeader ?? settingConfig.fixedHeader,
  hideTabs: storageSettingConfig?.hideTabs ?? settingConfig.hideTabs,
  hideSideBar: storageSettingConfig?.hideSideBar ?? settingConfig.hideSideBar,
  keepAlive: storageSettingConfig?.keepAlive ?? settingConfig.keepAlive,
  layout: storageSettingConfig?.layout ?? settingConfig.layout,
  theme: storageSettingConfig?.theme ?? settingConfig.theme,
  grey: storageSettingConfig?.grey ?? settingConfig.grey,
  weak: storageSettingConfig?.weak ?? settingConfig.weak,
};
const getters = {
  locale: (state: State): Language => {
    return messages[state.lang];
  },
  collapse: (state: State): boolean => state.hideSideBar,
};
const mutations = {
  UPDATE_SETTING_DRAWER(state: State) {
    state.settingDrawer = !state.settingDrawer;
  },
  UPDATE_LOGO(state: State, payload?: boolean) {
    if (typeof payload === "undefined") {
      state.hasLogo = false;
      storageLocal.set("hasLogo", {
        type: "boolean",
        content: false,
      });
    } else {
      state.hasLogo = payload;
      storageLocal.set("hasLogo", {
        type: "boolean",
        content: payload,
      });
    }
  },
  UPDATE_DEVICE(state: State, payload: boolean) {
    if (payload) {
      state.device = "mobile";
    } else {
      state.device = "desktop";
    }
  },
  UPDATE_LANG(state: State, payload?: langType) {
    if (typeof payload === "undefined") {
      state.lang = "zh-cn";
      i18n.global.locale = "zh-cn";
    } else {
      state.lang = payload;
      storageLocal.set("lang", {
        type: "string",
        content: payload,
      });
      i18n.global.locale = payload;
    }
    state.title = transformI18n(settingConfig.title, true);
  },
  UPDATE_SETTING_CONFIG(state: State, payload: any) {
    const localSettingConfig = storageLocal.get("settingConfig");
    let config: any;
    if (localSettingConfig === null) {
      config = {
        fixedHeader: settingConfig.fixedHeader,
        hideTabs: settingConfig.hideTabs,
        hideSideBar: settingConfig.hideSideBar,
        keepAlive: settingConfig.keepAlive,
        layout: settingConfig.layout,
        theme: settingConfig.theme,
        grey: settingConfig.grey,
        weak: settingConfig.weak,
      };
    } else {
      config = localSettingConfig;
    }
    const keys = Object.keys(payload);
    keys.forEach((key) => {
      const val = payload[key];
      state[key] = val;
      config[key] = val;
      switch (key) {
        case "layout":
          document.body.setAttribute("layout", val);
          break;
        case "theme":
          document.documentElement.classList.forEach(
            (value, key, parent) =>
              value.startsWith("layout-theme-") && parent.remove(value)
          );
          document.documentElement.classList.add(`layout-theme-${val}`);
          break;
        case "grey":
          val
            ? document.documentElement.classList.add("html-grey")
            : document.documentElement.classList.remove("html-grey");
          break;
        case "weak":
          val
            ? document.documentElement.classList.add("html-weakness")
            : document.documentElement.classList.remove("html-weakness");
          break;
      }
    });
    storageLocal.set("settingConfig", {
      type: "object",
      content: config,
    });
  },
};

const actions: ActionTree<State, State> = {
  updateDeviceAndSideBarOrLayout({ state, commit }, payload: boolean) {
    if (
      (payload === true && state.device === "desktop") ||
      (payload === false && state.device === "mobile")
    ) {
      commit("UPDATE_DEVICE", payload);
      let options: any = {
        hideSideBar: payload,
      };
      if (payload) {
        options.layout = "vertical";
      }
      commit("UPDATE_SETTING_CONFIG", options);
    }
  },
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: newModulesObj,
});

export const useStore = () => {
  return useBaseStore(key);
};
