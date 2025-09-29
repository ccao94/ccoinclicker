<template>
  <div class="app">
    <TopCounter />
    <div class="main-area">
      <ClickGoals />
      <ChickenArea />
      <Shop />
    </div>
    <VillagersArea />
  </div>
</template>

<script setup>
import TopCounter from './components/TopCounter.vue';
import VillagersArea from './components/VillagersArea.vue';
import ChickenArea from './components/ChickenArea.vue';
import Shop from './components/Shop.vue';
import ClickGoals from './components/ClickGoals.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
  margin: 0;
  font-family: 'Press Start 2P', cursive;
  background: url('/bg.jpg') center/cover no-repeat fixed;
  overflow: hidden;
  color: #f2f2f2;
}

.app {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-area {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  height: 75vh;
  padding-bottom: 20px;
}
</style>
