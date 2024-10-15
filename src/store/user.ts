import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { login } from "@/api/login";

interface UserState {
  token: string;
  asyncRouter: string[];
  role: string;
  isLogin: boolean;
}

interface UserActions {
  // Define the methods of your actions here
  [key: string]: any; // Added index signature
}
const baseRouterName = ['dashboard']
export const useUserStore = defineStore<string, UserState, UserActions>("user", {
  state: (): UserState => ({
    token: getToken(),
    asyncRouter: [],
    role: "user",
    isLogin: false,
  }),
  actions: {
    // Implement your action methods here
    login(userInfo: object) {
      return new Promise<void>((resolve, reject) => {
        login(userInfo)
          .then((res: any) => {
            setToken(res.result.token);
            this.token = res.result.token;
            this.role = "admin";
            this.isLogin = true;
            if (this.role == 'admin') {
              this.asyncRouter = ['goods', 'goodsAdd']
            } else if (this.role == 'user') {
              this.asyncRouter = ['user', 'userList']
            }
            this.asyncRouter = [...baseRouterName, ...this.asyncRouter]
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
  },
  persist: true,
});


