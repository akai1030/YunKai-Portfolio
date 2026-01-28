<template>
  <div class="novel-container">
    <div class="paper-texture"></div>
    
    <div class="scroll-track" ref="scrollTrack">
      <div class="content-wrapper">
        <!-- Title Section -->
        <header class="novel-header">
          <h1 class="main-title">數位遊牧者的<br>虛空手記</h1>
          <div class="meta-info">
            <span class="date">2026.01.28</span>
            <span class="author">YunKai</span>
          </div>
        </header>

        <!-- Main Novel Content -->
        <article class="novel-content">
          <section v-for="chapter in chapters" :key="chapter.id" class="chapter">
            <h2 class="chapter-title">{{ chapter.title }}</h2>
            <div class="chapter-text" v-html="chapter.content" @click="handleInteraction"></div>
            <div class="divider"></div>
          </section>
        </article>
      </div>
    </div>

    <!-- Modal Overlay -->
    <Transition name="modal-fade">
      <div v-if="activeSection" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">✕ 關閉</button>
          <div class="modal-inner">
            <component :is="activeComponent" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { novelChapters } from '~/utils/novelContent'
import Scene01 from '~/components/Scenes/Scene01_Manifesto.vue'
import Scene02 from '~/components/Scenes/Scene02_Tech.vue'
import Scene03 from '~/components/Scenes/Scene03_Gallery.vue'
import Scene04 from '~/components/Scenes/Scene04_Contrast.vue'
import Scene05 from '~/components/Scenes/Scene05_Contact.vue'

const chapters = novelChapters
const activeSection = ref<string | null>(null)

// Map targets to components
const componentMap: Record<string, any> = {
  'manifesto': Scene01,
  'tech': Scene02,
  'gallery': Scene03,
  'contrast': Scene04,
  'contact': Scene05
}

const activeComponent = computed(() => {
  return activeSection.value ? componentMap[activeSection.value] : null
})

const handleInteraction = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains('interactive-link')) {
    const section = target.getAttribute('data-target')
    if (section) {
      activeSection.value = section
    }
  }
}

const closeModal = () => {
  activeSection.value = null
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;500;700&display=swap');

.novel-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f2eb; // Warm paper color
  color: #2b2b2b;
  font-family: 'Noto Serif TC', serif;
  overflow-x: auto;
  overflow-y: hidden;
  writing-mode: vertical-rl;
  cursor: default;

  /* Custom Scrollbar for horizontal scrolling */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
}

.paper-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
  z-index: 0;
}

.scroll-track {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 4rem 10vw 4rem 10vw; // Top/Bottom padding becomes Right/Left in vertical-rl? No, it respects physical directions usually, but let's test.
  // In vertical-rl: 
  // block-start is Right, block-end is Left.
  // inline-start is Top, inline-end is Bottom.
  padding-block-start: 10vw; // Right padding
  padding-block-end: 10vw;   // Left padding
  padding-inline-start: 5vh; // Top padding
  padding-inline-end: 5vh;   // Bottom padding
}

.content-wrapper {
  display: flex;
  flex-direction: column; // Becomes row-like in current writing mode?
  // In vertical-rl, flex-direction column stacks items horizontally/left-wards.
  gap: 6rem;
}

.novel-header {
  margin-left: 4rem; // Physical margin to separate from content
  border-left: 1px solid rgba(0,0,0,0.1); // Looks like a bottom border
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  .main-title {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.1em;
    margin-bottom: 2rem;
  }

  .meta-info {
    font-family: var(--font-mono, monospace);
    font-size: 0.9rem;
    color: #666;
    display: flex;
    gap: 1rem;
  }
}

.novel-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.chapter {
  position: relative;
  
  .chapter-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #8c8c8c;
    margin-bottom: 1.5rem;
    position: absolute;
    top: -3rem; // Floating above/right
  }

  .chapter-text {
    font-size: 1.15rem;
    line-height: 2;
    letter-spacing: 0.15em;
    text-align: justify;
    max-height: 70vh; // Ensure it doesn't overflow vertically too much
    
    // Deep selector for v-html content
    :deep(p) {
      margin-left: 1em; // Paragraph indentation
    }

    :deep(.interactive-link) {
      border-bottom: 1px solid transparent; // In vertical mode, this might be right or left border.
      // Actually text-decoration works better
      text-decoration: underline;
      text-decoration-color: #d4a373;
      text-underline-offset: 4px;
      color: #a44c4c;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap; // Keep link text together

      &:hover {
        background-color: rgba(164, 76, 76, 0.1);
        text-decoration-color: #a44c4c;
      }
    }
  }
}

.divider {
  width: 1px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #ccc, transparent);
  margin-top: 2rem;
  margin-left: 50%;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(245, 242, 235, 0.95); // Same paper color but high opacity
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: horizontal-tb; // Reset to horizontal for modal content
}

.modal-content {
  width: 90vw;
  height: 85vh;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 100;
  background: none;
  border: none;
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    background: #000;
    color: #fff;
  }
}

.modal-inner {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  
  // Reset child components styles if needed
  :deep(section) {
    min-height: 100%;
    // Ensure scenes fit
  }
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
