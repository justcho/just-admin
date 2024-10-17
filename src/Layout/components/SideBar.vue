<template>
  <div class="bg-[#001529]">
    <div class="py-6 text-center text-white text-2xl font-bold">Just-admin</div>
      <a-menu
        class="w-[256px]"
        theme="dark"
        :selectedKeys="[route.name]"
        :openKeys="openKeys"
        mode="inline"
        @click="handleClick"
        @openChange="handleOpenChange"
      >
        <template v-for="i in sidebarRouters">
          <a-sub-menu v-if="i?.children && i.children.length > 0" :key="i.name">
            <template #title>
              <span class="text-base text-white">{{ i.label }}</span>
            </template>
            <a-menu-item v-for="j in i.children" :key="j.name">
              <div class="flex items-center">
                <svg-icon icon-class="dog" class="w-4 h-4 mx-3" />
                <span class="text-base text-white"> {{ j.label }}</span>
              </div>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="i.name">
            <div class="flex items-center">
              <svg-icon icon-class="dog" class="w-4 h-4 mx-3" />
              <span class="text-base text-white"> {{ i.label }}</span>
            </div>
          </a-menu-item>
        </template>
      </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { useMenuStore } from "../../store/menu";
import { useRouter, useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import type { MenuProps } from "ant-design-vue";

const router = useRouter();
const route = useRoute();

const openKeys = ref<string[]>([]);
const menuStore = useMenuStore();
const sidebarRouters = computed(() => menuStore.menuList);

console.log(sidebarRouters.value, "sidebarRouters");

const handleClick: MenuProps["onClick"] = (e) => {
  router.push({ name: e.key as string });
  if (e.keyPath && e.keyPath.length === 1) {
    sessionStorage.removeItem("openKeys");
    openKeys.value = [];
  }
};

const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
  console.log(keys, "keys");
  const keyArr: string[] = [];
  if (keys.length > 0) {
    //取最后一项，最后一项才是你当前展开的菜单
    keyArr.push(keys[keys.length - 1] as string);
  }
  openKeys.value = keyArr;
  sessionStorage.setItem("openKeys", JSON.stringify(keyArr));
};

onMounted(() => {
  const openKey = sessionStorage.getItem("openKeys");
  if (openKey) {
    openKeys.value = JSON.parse(openKey);
  }
});
</script>
