import router, { routes } from "@/router";
import { defineStore } from "pinia";

interface MenuState {
  menuList: typeof routes;
}
export const useMenuStore = defineStore<string, MenuState>("menu", {
  state: (): MenuState => ({
    menuList: routes,
  }),
  persist: true,
});
