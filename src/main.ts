import { createApp } from "vue";
import "@/style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// 注册svg图标
import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon/index.vue";

import "@/utils/permission";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('svg-icon', SvgIcon)

app.mount("#app");
