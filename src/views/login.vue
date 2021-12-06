<!-- 登录 -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { addClass, removeClass } from "@/utils/operate";
import illustration1 from "@/assets/login/illustration1.svg";
import { useStore } from "@/store";

const router = useRouter();
const store = useStore();

const title = computed(() => store.state.title);

const user = ref("admin");
const pwd = ref("123456");

function onUserFocus() {
  addClass(document.querySelector(".user"), "focus");
}
function onUserBlur() {
  if (user.value.length === 0)
    removeClass(document.querySelector(".user"), "focus");
}
function onPwdFocus() {
  addClass(document.querySelector(".pwd"), "focus");
}
function onPwdBlur() {
  if (pwd.value.length === 0)
    removeClass(document.querySelector(".pwd"), "focus");
}

const onLogin = (): void => {
  // 验证用户名及密码
  if (user.value !== "" && pwd.value !== "") {
    // 开发环境(使用mock)
    // store
    //   .dispatch("user/toLogin", {
    //     user: user.value,
    //     pwd: pwd.value,
    //   })
    //   .then((res) => {
    //     if (res.code === 0) {
    //       router.push("/");
    //     }
    //   });
    // 生产环境测试
    store.commit("user/UPDATE_USER_INFO", {
      user: "admin",
      accessToken: "123456",
    });
    router.push("/");
  }
};
</script>

<template>
  <div class="container login-page">
    <div class="img"><img :src="illustration1" /></div>
    <div class="login-box">
      <div class="login-form">
        <h2 class="title">{{ title }}</h2>
        <div class="input-group user focus">
          <div class="input-item">
            <span class="icon"><i class="fa fa-user"></i></span>
            <div class="label">{{ $t("message.userName") }}</div>
            <input
              type="text"
              class="input"
              v-model="user"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div class="input-group pwd focus">
          <div class="input-item">
            <span class="icon"><i class="fa fa-lock"></i></span>
            <div class="label">{{ $t("message.pwd") }}</div>
            <input
              type="password"
              class="input"
              v-model="pwd"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
            />
          </div>
        </div>
        <button class="login-btn" @click="onLogin">
          {{ $t("message.login") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  background-image: url("@/assets/login/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 500px;
  }
}
.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}
.login-form {
  width: 100%;
  min-width: 360px;
  .title {
    text-transform: uppercase;
    margin: 15px 0;
    color: #999;
    font: bold 200% Consolas, Monaco, monospace;
    animation: loginAnimation 0.5s 0.02s;
  }
}

.input-group {
  position: relative;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
  animation: loginAnimation 0.5s 0.03s;
  &:nth-child(1) {
    margin-bottom: 4px;
    animation: loginAnimation 0.5s 0.04s;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #c5d3f7;
    transition: 0.5s;
  }
  &::before {
    left: 50%;
  }
  &::after {
    right: 50%;
  }
  &.focus {
    &::before,
    &::after {
      width: 50%;
    }
    .icon i {
      color: #5392f0;
    }
    .input-item .label {
      top: -5px;
      font-size: 15px;
    }
  }
  & > .input-item {
    position: relative;
    display: flex;
    height: 45px;
    .label {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #d9d9d9;
      font-size: 18px;
      transition: 0.3s;
      margin: 0;
      padding: 0;
    }
    & > .input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 10px;
      border: none;
      outline: none;
      background: none;
      padding: 0.5rem 0.7rem;
      font-size: 1.2rem;
      color: #555;
      font-family: "Roboto", sans-serif;
    }
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: #d9d9d9;
    transition: 0.5s;
  }
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
  &:hover {
    color: #5392f0;
  }
}

.login-btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #0942a5, #2870db, #669bf5);
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  background-size: 200%;
  animation: loginAnimation 0.5s 0.05s;
  &:hover {
    background-position: right;
  }
}
@media screen and (max-width: 768px) {
  .login-page {
    background-image: none;
  }
  .login-box {
    justify-content: center;
    .login-form {
      min-width: 290px;
      .title {
        font-size: 2.4rem;
        margin: 8px 0;
      }
    }
  }

  .img {
    display: none;
  }
}

@keyframes loginAnimation {
  0% {
    transform: translateY(20px);
  }
  40% {
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
