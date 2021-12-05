import { State, userState } from "@typings/vuex";
import { storageSession } from "@/utils/storage";
import { ActionTree, Module, MutationTree } from "vuex";
import { login, logout } from "@/apis/user";

const state: userState = {
  roles: storageSession.get("roles") || [],
  userInfo: storageSession.get("userInfo") || null,
};

const mutations: MutationTree<userState> = {
  UPDATE_ROLES(state: userState, payload?: string[]) {
    if (typeof payload === "undefined") {
      storageSession.remove("roles");
      state.roles = [];
    } else {
      storageSession.set("roles", {
        type: "object",
        content: payload,
      });
      state.roles = payload;
    }
  },
  UPDATE_USER_INFO(state: userState, payload?: Object) {
    if (typeof payload === "undefined") {
      storageSession.remove("userInfo");
      storageSession.remove("router");
      state.userInfo = null;
    } else {
      storageSession.set("userInfo", {
        type: "object",
        content: payload,
      });
      state.userInfo = payload;
    }
  },
};

const actions: ActionTree<userState, State> = {
  toLogin({ commit }, params: LoginParams): Promise<ReturnResult<LoginParams>> {
    return new Promise((resolve) => {
      login(params).then((res) => {
        if (res.code === 0) {
          commit("UPDATE_USER_INFO", res.data);
        } else {
          commit("UPDATE_USER_INFO");
        }
        resolve(res);
      });
    });
  },
  toLogout({ commit, dispatch }): Promise<ReturnResult<null>> {
    return new Promise((resolve) => {
      logout().then((res) => {
        if (res.code === 0) {
          dispatch("routes/clearRoutes", null, { root: true });
          commit("UPDATE_ROLES");
          commit("UPDATE_USER_INFO");
          resolve(res);
        }
      });
    });
  },
};

const userStore: Module<userState, State> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export { userStore, userStore as default };
