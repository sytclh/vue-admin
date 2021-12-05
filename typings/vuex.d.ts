import { ComponentCustomProperties } from "vue";
import { Store, Getter } from "vuex";
import { store } from "@/store";

declare interface RouterRecord extends RouteRecordRaw {}

declare interface routesState {
  routes: MenuComponentItem[];
  btnsAuth: string[];
  cacheRouteList: Array<TagItem>;
  cachePageList: string[];
}

declare interface routesGetters {
  [s: string]: Getter<routesState, State>;
}

declare interface userState {
  roles: string[];
  userInfo: any;
}

declare interface State {
  settingDrawer: boolean = false;
  hasLogo: boolean = true;
  device: string;
  title: string;
  lang: langType = "zh-cn";
  fixedHeader: boolean = true;
  hideTabs: boolean = false;
  hideSideBar: boolean = false;
  keepAlive: boolean = true;
  layout: LayoutType = "vertical";
  theme: ThemeType = "default";
  grey: boolean = false;
  weak: boolean = false;
  routes?: routesState;
  user?: userState;
  [s: string]: State[s];
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}
