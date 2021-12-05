import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store";
import { router } from "./routes";
import { i18n } from "@/configs/i18n";
// import { useIcons } from "@/configs/icons";
// 引入所有本地svg
import "vite-plugin-svg-icons/register";
// 引入全局样式
import "./styles/index.scss";
import "font-awesome/css/font-awesome.css";

const app = createApp(App);

app.use(router);
router
  .isReady()
  .then(() => {
    app.use(store, key).use(i18n);
  })
  .finally(() => {
    app.mount("#app");
  });
