<template>
  <div class="villagers-area">
    <div
      v-for="villager in store.villagers"
      :key="villager.key"
      class="villager-card"
      @click="store.buyVillager(villager.key)"
    >
      <img :src="villager.img" alt="" class="villager-img"/>
      <div class="villager-title">{{ villager.title }}</div>
      <div class="villager-desc">{{ villager.desc }}</div>
      <div class="villager-cost">
        <img src="/emerald.png" alt="Emerald" class="emerald-icon-small"/>
        {{ formatBigInt(villager.cost) }}
      </div>
      <div class="owned-count">x{{ villager.count.toString() }}</div>
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
.villagers-area {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 12px;
}
.villager-card {
  width: 140px;
  background: rgba(0,0,0,0.45);
  border-radius: 10px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}
.villager-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.villager-img {
  width: 65px;
  height: 65px;
  margin: auto;
}
.villager-title {
  font-weight: 700;
  margin-top: 2px;
  font-size: 0.95rem;
}
.villager-desc {
  font-size: 0.8rem;
  margin-top: 1px;
}
.villager-cost {
  font-weight: 700;
  font-size: 0.85rem;
  margin-top: 1px;
}
.owned-count {
  position: absolute;
  top: 2px;
  right: 4px;
  color: #ffd700;
  font-weight: 700;
  font-size: 0.85rem;
}
.emerald-icon-small {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
</style>
