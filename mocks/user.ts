import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/login",
    method: "post",
    response({ body }: ResponseContext): ReturnResult<{
      user: string;
      "accessToken|10": RegExp;
    } | null> {
      const { user, pwd } = body;
      if (user === "admin" && pwd === "123456") {
        return {
          code: 0,
          data: {
            user,
            "accessToken|10": /(\w|\d)/,
          },
          msg: "success",
        };
      } else if (user === "test" && pwd === "123456") {
        return {
          code: 0,
          data: {
            user,
            "accessToken|10": /(\w|\d)/,
          },
          msg: "success",
        };
      } else {
        return {
          code: -1,
          data: null,
          msg: "用户名或密码错误",
        };
      }
    },
  },
  {
    url: "/logout",
    method: "post",
    response(): ReturnResult<null> {
      return {
        code: 0,
        data: null,
        msg: "success",
      };
    },
  },
] as MockMethod[];
