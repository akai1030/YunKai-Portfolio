<template>
  <section class="scene scene-03">
    <div class="gallery-intro">
      <h2>03. Gallery</h2>
      <h1>混血實力展示</h1>
    </div>
    
    <div class="film-strip">
      <div v-for="(project, index) in projects" :key="index" class="film-frame" @click="activeProject = project">
        <div class="holes top"></div>
        <div class="frame-content">
          <div class="project-preview">
            <span>{{ project.title }}</span>
          </div>
          <div class="project-info">
            <h3>{{ project.name }}</h3>
            <p>{{ project.tech }}</p>
          </div>
        </div>
        <div class="holes bottom"></div>
      </div>
    </div>

    <!-- Project Modal / Overlay -->
    <Transition name="fade">
      <div v-if="activeProject" class="project-overlay" @click.self="activeProject = null">
        <div class="modal">
          <button class="close-btn" @click="activeProject = null">X</button>
          <h2>{{ activeProject.name }}</h2>
          <p class="url-mock">URL: https://{{ activeProject.id }}.demo.com</p>
          <div class="demo-content">
            <p>{{ activeProject.desc }}</p>
            <div class="mock-browser">
              <!-- Placeholder for visual -->
              [Demo Visualization]
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: string
  name: string
  title: string
  tech: string
  desc: string
}

const activeProject = ref<Project | null>(null)

const projects: Project[] = [
  { id: 'cms', name: 'Headless CMS Arc', title: 'BACKEND LOGIC', tech: 'Node.js / PostgreSQL', desc: 'High performance content delivery API.' },
  { id: 'vfx', name: 'WebGL Portfolio', title: 'FRONTEND AESTHETICS', tech: 'Three.js / Vue 3', desc: 'Immersive 3D experiences on the web.' },
  { id: 'saas', name: 'Enterprise Dashboard', title: 'SYSTEM ARCHITECTURE', tech: 'Nuxt / Docker', desc: 'Scalable solution for complex data.' },
]
</script>

<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding-left: 5%;
  overflow-x: auto;
}

.gallery-intro {
  width: 20vw;
  padding-right: 2rem;
}

.gallery-intro h2 { font-family: var(--font-mono); color: #666; font-size: 1rem; }
.gallery-intro h1 { font-size: 2.5rem; line-height: 1.2; }

.film-strip {
  display: flex;
  gap: 2rem;
  padding-right: 5vw;
}

.film-frame {
  width: 300px;
  height: 400px;
  background: #111;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
    border-color: #fff;
  }
}

.holes {
  height: 20px;
  background-image: radial-gradient(#000 4px, transparent 5px);
  background-size: 15px 15px;
  background-position: center;
  background-color: #222;
}

.frame-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background: #0a0a0a;
}

.project-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  margin-bottom: 1rem;
  border: 1px dashed #333;
  
  span {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #555;
  }
}

.project-info h3 { margin: 0; font-size: 1.2rem; }
.project-info p { margin: 0; font-size: 0.8rem; color: #888; font-family: var(--font-mono); }

/* Modal */
.project-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 60vw;
  height: 60vh;
  background: #111;
  border: 1px solid #333;
  padding: 2rem;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
}

.url-mock {
  font-family: var(--font-mono);
  color: #0f0;
  background: #002200;
  padding: 0.5rem;
  display: inline-block;
  margin-bottom: 2rem;
}

.mock-browser {
  width: 100%;
  height: 200px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
}
</style>
