<template>
  <div class="flex justify-center items-center h-screen">
    <a-result
      status="403"
      title="403"
      sub-title="对不起，你没有此页面的访问权限。"
    >
      <template #extra>
        <a-button type="primary" @click="handleBackHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleBackHome = () => {
  router.push("/");
};
</script>

