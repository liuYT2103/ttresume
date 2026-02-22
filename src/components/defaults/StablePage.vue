<template>
  <div class="fixed top-0 left-0 w-full h-full bg-theme-bg text-theme-tx">
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-theme-bg-anime1/30 blur-[120px] animate-blob mix-blend-screen"></div>
      <div class="absolute top-[20%] right-[-10%] w-[35vw] h-[40vw] rounded-full bg-theme-bg-anime2/30 blur-[120px] animate-blob animation-delay-2000 mix-blend-screen"></div>
      <div class="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-theme-bg-anime3/30 blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.2); }
  66% { transform: translate(-20px, 20px) scale(0.8); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 15s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>