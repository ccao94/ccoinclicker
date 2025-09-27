<template>
  <aside class="left-gauge">
    <div v-if="store.gaugeVisible" class="gauge-wrapper">
      <div
        v-if="store.multiplierActive && store.spamGauge >= store.maxGauge"
        class="mult-label highlight"
      >
        ×2
      </div>
      <div class="gauge-track">
        <div class="gauge-fill" :style="{ height: gaugeHeight + '%' }"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();

const gaugeHeight = computed(() =>
  Math.max(0, Math.min(100, Math.floor((store.spamGauge / store.maxGauge) * 100)))
);
</script>

<style scoped>
.left-gauge {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-left: 30px;
}
.gauge-wrapper {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}
.gauge-track {
  width: 60px;
  height: 300px;
  background: rgba(0,0,0,0.25);
  border: 4px solid #ffd700;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.gauge-fill {
  width: 100%;
  background: linear-gradient(#ffe266,#ffb600);
  transition: height 0.12s linear;
}
.mult-label {
  position: absolute;
  top: -40px;
  font-size: 2rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
}
.highlight {
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
