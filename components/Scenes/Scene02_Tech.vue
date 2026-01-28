<template>
  <section class="scene scene-02">
    <!-- Abstract SQL Background -->
    <div class="sql-bg">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <!-- Floating Nodes Animation (Simplified CSS/SVG) -->
        <g class="nodes">
          <circle cx="20%" cy="30%" r="4" fill="#555">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="70%" r="4" fill="#555">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="5s" repeatCount="indefinite" />
          </circle>
          <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#333" stroke-width="1" stroke-dasharray="5,5" />
        </g>
      </svg>
    </div>

    <div class="content">
      <h2>02. Core Technology</h2>
      <h1>Directus + SQL：<br>你的資料不該被關在別人的籠子裡。</h1>
      
      <button class="expand-btn" @click="isOpen = !isOpen">
        {{ isOpen ? '[-] 收起技術細節' : '[+] 技術白皮書 / API 對比' }}
      </button>

      <div class="details" v-if="isOpen">
        <div class="detail-block">
          <h3>No Vendor Lock-in</h3>
          <p>資料庫歸你所有，隨時可以遷移，不被平台綁架。</p>
        </div>
        <div class="detail-block">
          <h3>Pure SQL Power</h3>
          <p>直接操作資料庫的強大，同時享受 Headless CMS 的便利。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050505;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.sql-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 2rem;
}

h2 {
  font-family: var(--font-mono);
  color: #666;
  font-size: 1rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.expand-btn {
  background: transparent;
  border: 1px solid #444;
  color: #888;
  padding: 1rem 2rem;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #fff;
    color: #fff;
  }
}

.details {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #222;
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-block h3 {
  font-size: 1.2rem;
  color: #aaa;
}
</style>
