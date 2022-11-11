<script setup>
import TheHeader from "./components/layout/TheHeader.vue"
import TheMain from "./components/layout/TheMain.vue"
import TheSidebar from "./components/layout/TheSidebar.vue"
</script>

<template>
  <div class="container">
    <TheSidebar />
    <TheHeader />
    <TheMain />
  </div>
</template>

<style>
  @import url(./css/index.css);
</style>
