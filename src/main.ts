import { createApp } from "vue";
import "@/style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 注册svg图标
import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon/index.vue";

const store = createPinia();
store.use(piniaPluginPersistedstate)
const app = createApp(App);
app.use(store);
app.use(router);
app.component('svg-icon', SvgIcon)

app.mount("#app");
