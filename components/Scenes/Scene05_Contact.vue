<template>
  <section class="scene scene-05">
    <div class="content">
      <h2>05. Contact</h2>
      <h1>謝幕。</h1>
      <p class="subtitle">現在，把你的願景交給專業的工匠。</p>
      
      <button class="cta-btn" @click="showForm = true" v-if="!showForm">
        開始諮詢
      </button>

      <div class="contact-form" v-if="showForm">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" placeholder="你的稱呼" required />
          </div>
          <div class="form-group">
            <input type="email" placeholder="聯絡信箱" required />
          </div>
          <div class="form-group">
            <select>
              <option disabled selected>預算範圍</option>
              <option>NT$ 50,000 - 100,000</option>
              <option>NT$ 100,000 - 300,000</option>
              <option>NT$ 300,000 +</option>
            </select>
          </div>
          <div class="form-group">
            <textarea placeholder="專案簡述"></textarea>
          </div>
          <button type="submit" class="submit-btn" :disabled="submitted">
            {{ submitted ? '已發送' : '發送訊號' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showForm = ref(false)
const submitted = ref(false)

const submitForm = () => {
  submitted.value = true
  // Mock submission logic
  setTimeout(() => {
    alert('訊號已接收。我們將在 24 小時內回覆。')
  }, 1000)
}
</script>

<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  box-sizing: border-box;
}

.content {
  text-align: center;
  max-width: 500px;
  width: 100%;
  padding: 2rem;
}

h2 { font-family: var(--font-mono); color: #444; font-size: 1rem; margin-bottom: 2rem; }

h1 { font-size: 4rem; margin-bottom: 1rem; letter-spacing: 0.2em; font-weight: 300; }

.subtitle { color: #888; margin-bottom: 3rem; font-size: 1.2rem; }

.cta-btn {
  background: #fff;
  color: #000;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background: #ccc;
  }
}

.contact-form {
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from { opacity: 0; margin-top: 20px; }
  to { opacity: 1; margin-top: 0; }
}

.form-group {
  margin-bottom: 1rem;
  
  input, select, textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid #333;
    padding: 1rem;
    color: #fff;
    font-family: var(--font-mono);
    outline: none;
    transition: border-color 0.3s;
    
    &:focus {
      border-color: #fff;
    }
  }
}

.submit-btn {
  margin-top: 2rem;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 1rem 4rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background: #fff;
    color: #000;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
