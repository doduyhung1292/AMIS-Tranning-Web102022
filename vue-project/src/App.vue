<script setup>
import TheHeader from "./components/layout/TheHeader.vue"
import TheMainEmployee from "./components/layout/employee/TheMainEmployee.vue"
import TheSidebar from "./components/layout/TheSidebar.vue"
</script>

<template>
  <div class="container">
    <TheSidebar />
    <TheHeader />
    <TheMainEmployee />
  </div>
</template>

<style>
  @import url(./css/index.css);
  @import url(./css/common.css);
</style>
