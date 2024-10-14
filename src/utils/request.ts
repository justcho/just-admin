import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";
import { getToken } from "./auth";
import errorCode from "./errorCode";
import { tansParams } from "./index";
import { Modal, message } from "ant-design-vue";

// 是否显示重新登录
export let isRelogin = { show: false };

// https://api.apiopen.top 是一个开放的api网站，提供简单测试，不要做为生产使用.
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  withCredentials: false,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
  if (getToken() && !isToken) {
    config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (
    !isRepeatSubmit &&
    (config.method === "post" || config.method === "put")
  ) {
    const requestObj = {
      url: config.url,
      data:
        typeof config.data === "object"
          ? JSON.stringify(config.data)
          : config.data,
      time: new Date().getTime(),
    };
    const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
    const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
    if (requestSize >= limitSize) {
      console.warn(
        `[${config.url}]: ` +
          "请求数据大小超出允许的5M限制，无法进行防重复提交验证。"
      );
      return config;
    }
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200;
    // 获取错误信息
    const msg =
      errorCode[code as keyof typeof errorCode] ||
      response.data.msg ||
      errorCode["default"];
    // 二进制数据则直接返回
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      return response.data;
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;

        Modal.confirm({
          title: "系统提示",
          content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
          onOk() {
            //  退出登录
            location.href = "/index";
          },
          onCancel() {},
        });
      }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      message.error(msg);
      return Promise.reject(new Error(msg));
    } else if (code === 601) {
      message.warn(msg);
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      return Promise.reject("error");
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    message.error(message);
    return Promise.reject(error);
  }
);

export default request;
