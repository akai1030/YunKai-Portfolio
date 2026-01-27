# 專案開發規格書 (SPEC.md) - Platinum Edition
## 1. 核心技術棧
- **Framework**: Nuxt 3 (Stable)
- **Visual Engine**: TresJS (Three.js for Vue) + Custom GLSL Shaders
- **Animation**: GSAP + Lenis
- **State**: XState + @xstate/vue
- **Data**: Directus SDK + TanStack Query
- **Styling**: Vanilla CSS (BEM) + SCSS (Global Injection)
## 2. 關鍵架構
- **Performance**: Strict Parallel Loading
- **No FOUC**: Hero opacity: 0
## 3. 快取策略
- **Dev**: 關閉積極快取。
- **Prod**: 使用 ISR + Strict Headers。
