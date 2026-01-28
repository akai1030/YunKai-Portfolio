<template>
  <div class="app-container">
    <!-- Scene 00: Digital Rain (Intro) -->
    <Transition name="fade">
      <div v-if="!isIntroComplete" class="intro-layer active" :class="{ 'intro-white': !isStormOrBlackout, 'intro-black': isBlackout }">
        <ClientOnly>
          <TresCanvas window-size clear-color="#ffffff" v-if="!isBlackout">
            <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
            <TheRain :intensity="rainIntensity" :color="particleColor" />
          </TresCanvas>
        </ClientOnly>
        
        <div class="intro-text" :class="{ 'text-invert': isStormOrBlackout }">
          <p>數據的虛空深處，<br/>尋找秩序的詩篇。</p>
        </div>
      </div>
    </Transition>

    <!-- Scene 01-05: The Horizon (Main Site) -->
    <div class="main-layer" v-show="isIntroComplete">
      <TheNovelWrapper />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMachine } from '@xstate/vue'
import { introMachine } from '~/stores/machines/introMachine'
import TheRain from '~/components/TheRain/index.vue'
import TheNovelWrapper from '~/components/TheNovelWrapper.vue'

const { snapshot, send } = useMachine(introMachine)

const isIntroComplete = computed(() => snapshot.value.matches('complete'))
const isStorm = computed(() => snapshot.value.matches('storm'))
const isBlackout = computed(() => snapshot.value.matches('blackout'))
const isStormOrBlackout = computed(() => isStorm.value || isBlackout.value)

const rainIntensity = computed(() => isStorm.value ? 'storm' : 'sparse')
const particleColor = computed(() => isStormOrBlackout.value ? '#ffffff' : '#000000')

onMounted(() => {
  // Sequence Logic
  setTimeout(() => {
    send({ type: 'START_RAIN' }) // Start gentle rain
  }, 500)

  setTimeout(() => {
    send({ type: 'INTENSIFY_RAIN' }) // Heavy rain + Dark Mode
  }, 3500)

  setTimeout(() => {
    send({ type: 'BLACKOUT' }) // Blackout
  }, 7500) // Extended time to read text
})

</script>

<style lang="scss">
.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.intro-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: background-color 1s ease;
  pointer-events: none; /* Let clicks pass through if opacity is 0 (though v-if removes it, Transition keeps it for a bit) */
  &.active {
    pointer-events: auto;
  }
  

  &.intro-white {
    background-color: #ffffff;
  }
  
  &.intro-black {
    background-color: #000000;
  }
}

.intro-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 400;
  color: #000; // Default (White bg)
  transition: color 1s ease;
  z-index: 1001;
  pointer-events: none;
  
  &.text-invert {
    color: #fff; // Invert (Black bg)
  }

  p {
    margin: 0;
    letter-spacing: 0.1em;
  }
}

.main-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
