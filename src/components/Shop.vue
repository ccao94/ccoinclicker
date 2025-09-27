<template>
  <aside class="shop-area">
    <h2 class="shop-title">Shop</h2>
    <div class="shop-list">
      <div
        v-for="item in store.upgrades"
        :key="item.key"
        class="shop-card"
        :class="{ highlight: store.emeralds >= item.cost }"
        @click="store.buyUpgrade(item.key)"
      >
        <div class="card-left">
          <img :src="item.img" alt="" class="card-img"/>
        </div>
        <div class="card-right">
          <div class="card-title">
            {{ item.title }}
            <span class="owned-count">x{{ item.count.toString() }}</span>
          </div>
          <div class="card-desc">{{ item.desc }} points/sec</div>
          <div class="card-cost">
            <img src="/emerald.png" class="emerald-icon-small"/>
            {{ formatBigInt(item.cost) }}
          </div>
        </div>
      </div>
    </div>
  </aside>
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
.shop-area {
  width: 550px;
  max-height: 75vh;
  background: rgba(0,0,0,0.35);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.shop-title {
  text-align: center;
  background: rgba(0,0,0,0.5);
  padding: 12px 0;
  border-radius: 8px 8px 0 0;
  color: #ffd;
  font-size: 1.3rem;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 5;
}
.shop-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  overflow-y: auto;
  max-height: calc(75vh - 60px);
}
.shop-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  padding: 12px;
  border: 2px solid rgba(255,215,0,0.5);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}
.shop-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(0,0,0,0.5);
}
.highlight {
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); border-color: #ffd700; }
  50% { transform: scale(1.05); border-color: #ffea00; }
  100% { transform: scale(1); border-color: #ffd700; }
}
.card-left {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
}
.card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card-title {
  text-align: center;
  font-weight: 700;
  position: relative;
}
.card-desc {
  text-align: center;
  font-size: 0.9rem;
}
.card-cost {
  text-align: center;
  font-weight: 700;
  background: rgba(0,0,0,0.45);
  padding: 4px 6px;
  border-radius: 6px;
  margin-top: 4px;
}
.emerald-icon-small {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
</style>
