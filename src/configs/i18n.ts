import { createI18n } from "vue-i18n";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import customZhCn from "@/locale/zh-cn";
import en from "element-plus/es/locale/lang/en";
import customEn from "@/locale/en";
import { storageLocal } from "@/utils/storage";
import { settingConfig } from "./setting";

export const messages = {
  "zh-cn": {
    ...zhCn,
    ...customZhCn,
  },
  en: {
    ...en,
    ...customEn,
  },
};

export const i18n = createI18n({
  locale: storageLocal.get("lang") || "zh-cn",
  messages,
});

export const transformI18n = (msg: string | null = "", isI18n = false) => {
  if (isI18n) {
    if (typeof msg === "string" && msg !== "") {
      return i18n.global.t(msg);
    }
    return i18n.global.t(settingConfig.title);
  } else {
    if (msg === null) return i18n.global.t(settingConfig.title);
    return msg;
  }
};
