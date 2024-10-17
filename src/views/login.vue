<template>
  <div
    class="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <svg-icon icon-class="dog" class="mx-auto !w-40 !h-20" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Welcome to login JustAdmin
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <a-form :model="form">
        <a-form-item label="Username">
          <a-input v-model:value="form.account" disabled />
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model:value="form.password" type="password" disabled />
        </a-form-item>
      </a-form>
      <div class="w-full mt-4 flex justify-center">
        <a-button class="w-full" type="primary" @click="handleSubmit">
          Login
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const form = ref({
  account: "admin",
  password: "123456",
});

const handleSubmit = () => {
  router.push({ name: "dashboard" });
};
</script>
