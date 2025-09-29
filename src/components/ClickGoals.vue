<template>
  <aside class="click-goals">
    <h2>Click Goals</h2>
    <div v-for="goal in store.clickGoals" :key="goal.id" class="goal-card" :class="{ completed: goal.completed }">
      <div class="goal-title">{{ goal.name }}</div>
      <div class="goal-bar">
        <div class="goal-progress" :style="{ width: progressWidth(goal) + '%' }"></div>
      </div>
      <div class="goal-text">{{ goal.completed ? 'Completed' : goal.goal + ' points' }}</div>
    </div>
  </aside>
</template>

<script setup>
import { useGameStore } from '../stores/game';
const store = useGameStore();

function progressWidth(goal) {
  if (goal.completed) return 100;
  const prevGoal = store.clickGoals[goal.id - 1];
  if (prevGoal && !prevGoal.completed) return 0;
  return Math.min(100, Number((store.chickenCoins * 100n) / goal.goal));
}
</script>

<style scoped>
.click-goals {
  width: 350px;
  height: 600px;
  background: rgba(0,0,0,0.35);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: flex-end;
  margin-top: auto;
}
.goal-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 8px;
}
.goal-title {
  font-weight: bold;
  text-align: center;
}
.goal-bar {
  height: 12px;
  width: 100%;
  background: rgba(255,255,0,0.2);
  border-radius: 6px;
  overflow: hidden;
}
.goal-progress {
  height: 100%;
  background: rgba(255,255,0,0.8);
  border-radius: 6px;
  transition: width 0.3s ease;
}
.completed .goal-progress {
  background: limegreen;
}
.goal-text {
  text-align: center;
  font-size: 0.8rem;
}
</style>
