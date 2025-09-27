<template>
  <div class="chicken-area">
    <img
      src="/chickenjockey.gif"
      alt="Chicken Jockey"
      class="chicken"
      @click="handleClick($event)"
    />

    <div
      v-for="f in store.floatingNumbers"
      :key="f.id"
      class="floating-number"
      :style="{
        left: f.x + 'px',
        top: f.y + 'px',
        transform: `translate(${f.translateX}px, ${f.translateY}px) rotate(${f.rotate}deg)`
      }"
    >
      <span class="floating-text">+1</span>
      <img src="/goldenegg.png" class="floating-egg"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();

function handleClick(event) {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  store.clickChicken();
  store.addFloatingNumberAt(x, y);
}

onMounted(() => {
  store.loadGame();
  setInterval(() => {
    store.tick();
  }, 1000);
});
</script>

<style scoped>
.chicken-area {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: 500px;
}
.chicken {
  width: 700px;
  cursor: pointer;
}
.floating-number {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
  animation: floatFall 1s forwards;
}
.floating-text {
  font-weight: 800;
  color: white;
  font-size: 2rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
}
.floating-egg {
  width: 40px;
  height: 40px;
}
@keyframes floatFall {
  0% { opacity: 1; transform: translate(0,-20px) rotate(0deg); }
  100% { opacity: 0; transform: translate(var(--translateX, 20px), 80px) rotate(45deg); }
}
</style>
