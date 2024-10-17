import { defineStore } from "pinia";

interface MenuState {
  menuList: any[];
}

const list:any[] = [
  {
    name: "dashboard",
    label: "首页",
  },
  {
    name: "goods",
    label: "测试1",
    children: [
      {
        name: "goodsAdd",
        label: "测试1-1",
      },
    ],
  },
];


export const useMenuStore = defineStore<string, MenuState>("menu", {
  state: (): MenuState => ({
    menuList: list,
  }),
  persist: true,
});
