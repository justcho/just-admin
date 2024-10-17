<template>
  <div
    class="bg-[#1677ff] shadow-md overflow-hidden p-2 relative flex justify-between items-center"
  >
    <div class="text-white font-bold text-2xl ml-5">Just-admin</div>
    <div class="flex items-center">
      <div
        class="text-white font-medium text-lg pr-2 flex flex-col justify-center items-end mr-5"
      >
        {{ datetime.split(" ")[0] }} {{ week[day] }}
        <span class="block pt-2">{{ datetime.split(" ")[1] }}</span>
      </div>
      <div class="text-white cursor-pointer pr-2">
        <svg-icon icon-class="logout" color="white" @click="handleLogout" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const timer = ref<ReturnType<typeof setInterval> | undefined>(undefined);
const datetime = ref<string>("");
const week: string[] = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
const day: number = new Date().getDay();

function formatDate(cellValue: Date | string): string {
  if (cellValue == null || cellValue === "") return "";
  const date = new Date(cellValue);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

const handleLogout = () => {
  router.push("/login");
};

onMounted(() => {
  datetime.value = formatDate(new Date());
  timer.value = setInterval(() => {
    datetime.value = formatDate(new Date());
  }, 1000);
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped>
/* Tailwind CSS is used, so no custom styles are needed here */
</style>
