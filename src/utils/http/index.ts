import axios from "axios";
import { errorMessage } from "../message";
import { storageSession } from "../storage";
import NProgress from "../nprogress";
import { store } from "@/store";
import { router } from "@/routes";

const toLogin = () => {
  storageSession.clear();
  store.commit("user/UPDATE_USER_INFO");
  router.replace({
    path: "/login",
    query: {
      from: router.currentRoute.value.path,
    },
  });
};

const http = axios.create({
  baseURL: "./",
  timeout: 3000,
});

http.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.resolve(error);
  }
);

http.interceptors.response.use(
  (response) => {
    NProgress.done();
    const res = response.data;
    if (res.code !== 0) {
      errorMessage(res.msg);
      return Promise.resolve(res);
    }
    return res;
  },
  (error) => {
    NProgress.done();
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 302:
          errorMessage("重定向错误");
          break;
        case 400:
          errorMessage("请求参数错误");
          break;
        case 401:
        case 403:
          toLogin();
          break;
        case 404:
          errorMessage("请求的资源不存在");
          break;
        case 415:
          errorMessage("不支持的媒体类型");
          break;
        case 500:
          errorMessage("服务端错误");
      }
      return Promise.resolve(error);
    } else {
      // 网络错误，连接超时
      toLogin();
      return Promise.resolve(error);
    }
  }
);

export default http;
