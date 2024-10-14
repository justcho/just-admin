<template>
  <div class="bg-[#001529]">
    <div class="py-6 text-center text-white text-2xl font-bold">Just-admin</div>
    <div v-for="item in sidebarRouters" :key="item.path">
      <a-menu
        class="w-[256px]"
        theme="dark"
        :selectedKeys="[route.name]"
        :openKeys="openKeys"
        mode="inline"
        @click="handleClick"
        @openChange="handleOpenChange"
      >
        <template v-for="i in item.children">
          <a-menu-item v-if="!i.children" :key="i.key">
            <div class="flex items-center">
              <svg-icon icon-class="dog" class="w-4 h-4 mx-3" />
              <span class="text-base text-white"> {{ i.name }}</span>
            </div>
          </a-menu-item>
          <a-sub-menu v-else :key="i.key">
            <template #title>
              <span class="text-base text-white">{{ i.name }}</span>
            </template>
            <a-menu-item v-for="j in i.children" :key="j.key">
              <div class="flex items-center">
                <svg-icon icon-class="dog" class="w-4 h-4 mx-3" />
                <span class="text-base text-white"> {{ i.name }}</span>
              </div>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMenuStore } from "@/store/menu";
import { useRouter, useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import type { MenuProps } from "ant-design-vue";

const router = useRouter();
const route = useRoute();

const openKeys = ref<[]>([]);
const menuStore = useMenuStore();
const sidebarRouters = computed(() =>
  menuStore.menuList.filter((item: any) => item.hidden !== true)
).value;

const handleClick: MenuProps["onClick"] = (e) => {
  router.push(e.key);
  if (e.keyPath.length == 1) {
    sessionStorage.removeItem("openKeys");
    openKeys.value = [];
  }
};

const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
  console.log(keys, "keys");
  let keyArr = [];
  if (keys.length > 0) {
    //取最后一项，最后一项才是你当前展开的菜单
    keyArr.push(keys[keys.length - 1]);
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
