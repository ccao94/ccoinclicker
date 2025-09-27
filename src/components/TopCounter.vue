<template>
  <div class="top-row">
    <div class="total-counter">
      <div class="total-value">{{ formatBigInt(store.chickenCoins) }}</div>
      <div class="per-sec">{{ formatBigInt(store.cps) }} points/sec</div>
      <div class="total-emeralds">
        <img src="/emerald.png" alt="Emerald" class="emerald-icon"/>
        {{ formatBigInt(store.emeralds) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game';

const store = useGameStore();

function formatBigInt(n) {
  return typeof n === 'bigint'
    ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : n;
}
</script>

<style scoped>
.top-row {
  text-align: center;
  margin: 20px 0;
}
.total-counter > div {
  margin: 8px 0;
  font-size: 1.8rem;
}
.emerald-icon {
  width: 28px;
  height: 28px;
  margin-left: 6px;
  vertical-align: middle;
}
</style>
