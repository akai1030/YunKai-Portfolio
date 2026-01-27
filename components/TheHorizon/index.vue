<template>
  <div class="horizon-wrapper" ref="wrapper">
    <div class="horizon-track" ref="track">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import Lenis from 'lenis'

const track = ref(null)
const wrapper = ref(null)

onMounted(() => {
  // Initialize Lenis for horizontal scroll on the specific wrapper
  const lenis = new Lenis({
    wrapper: wrapper.value,
    content: track.value,
    orientation: 'horizontal',
    gestureOrientation: 'both',
    smoothWheel: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})
</script>

<style scoped>
.horizon-wrapper {
  overflow-x: auto; /* Allow native scroll for Lenis to correct */
  width: 100vw;
  height: 100vh;
  /* Hide scrollbar */
  scrollbar-width: none; 
  -ms-overflow-style: none;
}
.horizon-wrapper::-webkit-scrollbar { 
  display: none; 
}

.horizon-track {
  display: flex;
  flex-wrap: nowrap;
  width: max-content; /* Allow content to dictate width */
  height: 100%;
}
</style>
