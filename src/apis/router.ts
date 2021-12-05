import http from "@/utils/http";

export function requestAsyncRoutes(params: {
  user: string;
}): Promise<ReturnResult<MenuListItem[]>> {
  return http.post("/getAsyncRoutes", { name: params.user });
}
