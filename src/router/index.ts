import { createRouter, createWebHistory } from "vue-router";
import Layout from "../Layout/index.vue";
export const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
    hidden: true,
  },
  {
    path: "/403",
    component: () => import("@/views/error/403.vue"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
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
    path: "",
    component: Layout,
    children: [
      {
        path: "",
        key: "test",
        name: "test",
        label: "test",
        children: [
          {
            path: "test1",
            key: "test1",
            name: "test1",
            label: "test1",
            component: () => import("@/views/test/test1.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    hidden: true,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
