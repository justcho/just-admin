declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "js-cookie";
declare module 'nprogress';

interface ImportMeta {
  env: {
    VITE_APP_BASE_API: string;
    // Add other environment variables as needed
  };
}