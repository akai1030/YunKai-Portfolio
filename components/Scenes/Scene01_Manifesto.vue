<template>
  <section class="scene scene-01">
    <div class="content">
      <h2>01. Manifesto</h2>
      <div class="main-text">
        <p class="highlight">別讓你的靈魂，<br>塞進別人的罐頭裡。</p>
        <p class="sub-text">嘲諷僵硬的模版工具，<br>宣示客製化的絕對主權。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scene {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Left aligned for negative space */
  padding-left: 15vw;
  background-color: var(--color-accent-warm);
  color: #1a1a1a; /* Dark text for contrast */
  border-right: 1px solid rgba(0,0,0,0.1);
}

.content {
  max-width: 60vw;
}

h2 {
  font-family: var(--font-mono);
  font-size: 1rem;
  opacity: 0.6;
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
  color: #4a4a4a;
}

.main-text {
  font-family: var(--font-primary);
}

.highlight {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.sub-text {
  font-size: 1.25rem;
  font-weight: 400;
  opacity: 0.8;
  line-height: 1.6;
}
</style>
