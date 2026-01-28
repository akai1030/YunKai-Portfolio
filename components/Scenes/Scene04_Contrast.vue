<template>
  <section class="scene scene-04">
    <div class="content split-layout">
      <div class="text-side">
        <h2>04. Contrast</h2>
        <h1>降維打擊</h1>
        <p class="tagline">一站式工具的甜蜜陷阱：<br>看似便宜，實則昂貴。</p>
        <p class="desc">維護成本隨時間指數級上升，<br>而客製化架構的邊際成本趨近於零。</p>
      </div>

      <div class="calc-side">
        <div class="calculator">
          <h3>維護成本計算器</h3>
          
          <div class="input-group">
            <label>專案年限 (年)</label>
            <input type="range" v-model.number="years" min="1" max="5" step="1">
            <span>{{ years }} 年</span>
          </div>

          <div class="comparison">
            <div class="c-col bad">
              <h4>模版工具</h4>
              <div class="cost">NT$ {{ (years * 12 * 3000).toLocaleString() }}</div>
              <p>月費訂閱 + 外掛授權</p>
            </div>
            <div class="c-col good">
              <h4>客製化開發</h4>
              <div class="cost">NT$ {{ (50000 + (years * 1000)).toLocaleString() }}</div>
              <p>一次性開發 + 極低主機費</p>
            </div>
          </div>
          
          <div class="saving">
            五年預省：<span>NT$ {{ ((5 * 12 * 3000) - (50000 + (5*1000))).toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const years = ref(1)
</script>

<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
  color: #fff;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
}

.split-layout {
  display: flex;
  width: 80vw;
  gap: 10vw;
  align-items: center;
}

.text-side {
  flex: 1;
}

h2 { font-family: var(--font-mono); color: #888; font-size: 1rem; }
h1 { font-size: 3.5rem; color: #fff; margin-bottom: 2rem; }

.tagline { font-size: 1.5rem; font-weight: 700; color: #f00; margin-bottom: 1rem; }
.desc { font-size: 1rem; color: #ccc; line-height: 1.6; }

.calc-side {
  flex: 1;
}

.calculator {
  background: #222;
  padding: 2rem;
  border: 1px solid #444;
  border-radius: 4px;
}

.input-group {
  margin-bottom: 2rem;
  label { display: block; margin-bottom: 0.5rem; font-family: var(--font-mono); }
  input { width: 100%; margin-bottom: 0.5rem; }
  span { font-family: var(--font-mono); color: #aaa; float: right; }
}

.comparison {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.c-col {
  flex: 1;
  padding: 1rem;
  background: #1a1a1a;
  text-align: center;
  
  h4 { margin: 0 0 1rem; font-size: 0.9rem; color: #888; }
  .cost { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; font-family: var(--font-mono); }
  p { font-size: 0.8rem; color: #666; margin: 0; }
  
  &.bad .cost { color: #f55; }
  &.good .cost { color: #5f5; }
}

.saving {
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
  padding-top: 1rem;
  border-top: 1px solid #333;
  
  span { color: #fe0; font-weight: 700; font-family: var(--font-mono); }
}
</style>
