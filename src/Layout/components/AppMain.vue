<template>
  <section class="h-[calc(100vh-80px)] w-full relative overflow-hidden">
    <router-view v-slot="{ Component, route }">
      <transition>
        <keep-alive>
          <component
            :is="Component"
            :key="route.path"
          />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
