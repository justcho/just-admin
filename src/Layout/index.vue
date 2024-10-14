<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
</script>