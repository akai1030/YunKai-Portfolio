<template>
  <TresGroup>
    <!-- Debug Box to ensure scene is rendering -->
    <TresMesh :position="[0,0,0]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    
    <TresPoints v-if="geometry" :frustum-culled="false">
      <primitive :object="geometry" />
      <TresPointsMaterial :size="0.5" :color="color" :size-attenuation="true" />
      <!-- Re-enable shader later once points are confirmed visible -->
      <!-- <TresShaderMaterial ... /> -->
    </TresPoints>
  </TresGroup>
</template>

<script setup lang="ts">
import { shallowRef, watch, onMounted } from 'vue'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from './RainShader'

const props = defineProps<{
  intensity: 'sparse' | 'storm'
  color: string
}>()

const materialRef = shallowRef()
const geometry = shallowRef<THREE.BufferGeometry>()

const count = 10000 // Total particles reservoir

// Uniforms
const uniforms = {
  uTime: { value: 0 },
  uSpeed: { value: 2.0 },
  uOpacity: { value: 1.0 },
  uDensity: { value: 0.0 }
}

onMounted(() => {
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const offsets = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // Spread wide
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40
    // Move slightly further back to ensure they are in front of camera (0,0,10) looking at (0,0,0)
    // Z range: -10 to 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 
    
    speeds[i] = 0.5 + Math.random()
    offsets[i] = Math.random() * Math.PI
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
  geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1))
  
  geometry.value = geo
  console.log('Rain Geometry Created', count)
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (materialRef.value) {
    materialRef.value.uniforms.uTime.value = elapsed
    // console.log('Rain Updating', elapsed) // Comment out to avoid spam, but useful for debug
  }
})

// React to intensity changes
watch(() => props.intensity, (newVal) => {
  console.log('Rain Intensity Changed:', newVal)
  if (newVal === 'storm') {
     if (materialRef.value) {
       materialRef.value.uniforms.uSpeed.value = 20.0 
     }
  } else {
     if (materialRef.value) {
       materialRef.value.uniforms.uSpeed.value = 2.0
     }
  }
}, { immediate: true })

defineExpose({
  uniforms
})
</script>
