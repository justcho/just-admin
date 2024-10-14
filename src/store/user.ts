import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { login } from "@/api/login";

interface UserState {
  // Define the properties of your state here
  token: string;
}

interface UserActions {
  // Define the methods of your actions here
  [key: string]: any; // Added index signature
}

const useUserStore = defineStore<string, UserState, UserActions>("user", {
  state: (): UserState => ({
    token: getToken(),
  }),
  actions: {
    // Implement your action methods here
    login(userInfo: object) {
      return new Promise<void>((resolve, reject) => {
        login(userInfo)
          .then((res: any) => {
            setToken(res.result.token);
            this.token = res.result.token;
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
