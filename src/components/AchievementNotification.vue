<template>
  <div class="achievement-notification" v-if="achievement">
    🎉 {{ achievement.title }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  achievement: Object
});
</script>

<style>
.achievement-notification {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #2ecc71;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  font-family: 'Press Start 2P', cursive;
  z-index: 999;
  animation: fadeInOut 2s forwards;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, 20px);}
  10% { opacity: 1; transform: translate(-50%, 0);}
  90% { opacity: 1; transform: translate(-50%, 0);}
  100% { opacity: 0; transform: translate(-50%, -20px);}
}
</style>
