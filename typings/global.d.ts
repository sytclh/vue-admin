const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};

type Nullable<T> = T | null;
type NonNullable<T> = T extends null | undefined ? never : T;
type Recordable<T = any> = Record<string, T>;
type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
type Indexable<T = any> = {
  [key: string]: T;
};
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
type TimeoutHandle = ReturnType<typeof setTimeout>;
type IntervalHandle = ReturnType<typeof setInterval>;

interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

interface WheelEvent {
  path?: EventTarget[];
}
interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

declare interface ViteEnv {
  VITE_PORT: number;
  VITE_TITLE: string;
  VITE_VERSION: string;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_LEGACY: boolean;
  VITE_USE_IMAGEMIN: boolean;
  VITE_GENERATE_UI: string;
  VITE_PROD_MOCK: boolean;
}

declare type langType = "zh-cn" | "en";
declare type LayoutType = "vertical" | "horizontal";
declare type ThemeType =
  | "default"
  | "light"
  | "dusk"
  | "volvano"
  | "yellow"
  | "mingQing"
  | "auroraGreen"
  | "pink"
  | "saucePurple";

declare interface ServerConfigs {
  version: string;
  title: string;
  fixedHeader: boolean = true;
  hideTabs: boolean = false;
  hideSideBar: boolean = false;
  keepAlive: boolean = true;
  lang: langType = "zh-cn";
  layout: LayoutType = "vertical";
  theme: ThemeType = "default";
  grey: boolean = false;
  weak: boolean = false;
  MapConfigure?: {
    amapKey?: string;
    baiduKey?: string;
    options: {
      resizeEnable?: boolean;
      center?: number[];
      zoom?: number;
    };
  };
}

type RefType<T> = T | null;

declare interface ReturnResult<T> {
  code: number;
  data: T;
  msg: string;
}

declare interface LoginParams {
  user: string;
  pwd: string;
}

declare interface MenuListItem {
  id: string;
  parentId: string | null;
  type: 0 | 1 | 2;
  path: string;
  icon: string | null;
  i18n: boolean;
  title: string | null;
  hidden: boolean;
  rank: number;
}

declare interface MenuComponentItem {
  path: string;
  name: string;
  component: string;
  meta: {
    type: 0 | 1 | 2;
    icon: string | null;
    i18n: boolean;
    title: string | null;
    hidden: boolean;
    rank: number;
    affix?: boolean;
  };
  children: MenuComponentItem[];
}

declare interface TagItem {
  path: string;
  fullPath: string;
  query: {
    [x: string]: RefType<string> | RefType<string>[];
  };
  hash: string;
  name: string | symbol;
  params: {
    [x: string]: string | string[];
  };
  meta: {
    i18n: boolean;
    title: string;
    affix?: boolean;
    [s: string]: any;
  };
  [s: string]: any;
}

declare interface ResponseContext {
  url: Recordable;
  body: Recordable;
  query: Recordable;
  headers: Recordable;
}
