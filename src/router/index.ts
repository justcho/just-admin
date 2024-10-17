import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "@/Layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "../store/user";
import { getToken } from "../utils/auth";

NProgress.configure({ showSpinner: false });

export const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
    hidden: true,
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403.vue"),
    hidden: true,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "",
    component: Layout,
    name: "dashboard",
    children: [
      {
        path: "/dashboard",
        key: "dashboard",
        name: "dashboard",
        label: "首页",
        component: () => import("@/views/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    hidden: true,
  },
];

/**
 * 动态路由
 */
export const asyncRouter: RouteRecordRaw[] = [
  {
    path: "/goods",
    component: Layout,
    name: "goods",
    meta: {
      showMenu: true,
      title: "商品管理",
      icon: "goods",
    },

    children: [
      {
        path: "add",
        name: "goodsAdd",
        meta: {
          showMenu: true,
          title: "添加商品",
        },
        component: () => import("@/views/test/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory('/just-admin'),
  routes: [...routes, ...asyncRouter],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const whiteList = ["login", "dashboard", "goodsAdd"];

router.beforeEach((to, _from, next) => {
  const auth = useUserStore();
  NProgress.start();

  // 登录后逻辑
  if (getToken()) {
    console.log(auth.asyncRouter, String(to.name), "我在这里！！！");
    // 判断权限是否通过
    if (auth.asyncRouter.includes(String(to.name))) {
      next();
    } else {
      next({ name: "dashboard" });
    }
    return;
  } else {
    // 未登录逻辑
    if (whiteList.includes(String(to.name))) {
      next();
    } else {
      next({ name: "login" });
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;
