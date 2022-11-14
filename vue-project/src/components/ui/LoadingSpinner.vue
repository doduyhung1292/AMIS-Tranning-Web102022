<template>
    <div class="container">
        <ring-loader :loading="loading" :color="color1" :size="size"></ring-loader>
    </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/RingLoader.vue'

export default {
    name: "LoadingSpinner",
    data () {
    return {
      color: '#cc181e',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px'
    }
  },
  components: {RingLoader}
}
</script>

<style scoped>
    .container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 255, 136, 0.473);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>