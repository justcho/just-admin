import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "@/Layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "@/store/user";
import { getToken } from "@/utils/auth";

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
    path: "",
    component: Layout,
    name: "dashboard",
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
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
    name: "goods",
    meta: {
      showMenu: true,
      title: "商品管理",
      icon: "goods",
    },
    redirect: "/goods/add",
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
  {
    path: "/user",
    name: "user",
    meta: {
      showMenu: true,
      title: "用户管理",
      icon: "goods",
    },
    redirect: "/user/list",
    children: [
      {
        path: "list",
        name: "userList",
        meta: {
          showMenu: true,
          title: "用户列表",
        },
        component: () => import("@/views/test/test1.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...asyncRouter],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const whiteList = ["login"];

router.beforeEach((to, from, next) => {
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
