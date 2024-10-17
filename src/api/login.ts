import request from "../utils/request";

const URL = {
  LOGIN: "/api/login",
};

// 登录 
export const login = (data: object) => {
  return request({
    url: URL.LOGIN,
    method: "post",
    data,
  });
};
