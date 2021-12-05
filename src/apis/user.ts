import http from "@/utils/http";

export function login(params: LoginParams): Promise<ReturnResult<LoginParams>> {
  return http.post("/login", params);
}

export function logout(): Promise<ReturnResult<null>> {
  return http.post("/logout");
}
