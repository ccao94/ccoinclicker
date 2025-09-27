import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    chickenCoins: 0n,
    emeralds: 0n,
    spamGauge: 0,
    maxGauge: 100,
    multiplier: 1,
    gaugeVisible: false,
    multiplierActive: false,
    floatingNumbers: [],
    upgrades: [
      { key: 0, title: "Wooden Axe", desc: "+1", cost: 50n, perSecond: 1n, count: 0n, img: "/items/axe_wood.png" },
      { key: 1, title: "Wooden Sword", desc: "+2", cost: 150n, perSecond: 2n, count: 0n, img: "/items/sword_wood.png" },
      { key: 2, title: "Stone Axe", desc: "+5", cost: 500n, perSecond: 5n, count: 0n, img: "/items/axe_stone.png" },
      { key: 3, title: "Stone Sword", desc: "+10", cost: 2000n, perSecond: 10n, count: 0n, img: "/items/sword_stone.png" },
      { key: 4, title: "Iron Axe", desc: "+25", cost: 10000n, perSecond: 25n, count: 0n, img: "/items/axe_iron.png" },
      { key: 5, title: "Iron Sword", desc: "+50", cost: 50000n, perSecond: 50n, count: 0n, img: "/items/sword_iron.png" },
      { key: 6, title: "Diamond Axe", desc: "+100", cost: 100000n, perSecond: 100n, count: 0n, img: "/items/axe_diamond.gif" },
      { key: 7, title: "Diamond Sword", desc: "+200", cost: 250000n, perSecond: 200n, count: 0n, img: "/items/sword_diamond.gif" },
      { key: 8, title: "Netherite Axe", desc: "+500", cost: 500000n, perSecond: 500n, count: 0n, img: "/items/axe_netherite.gif" },
      { key: 9, title: "Netherite Sword", desc: "+1000", cost: 1000000n, perSecond: 1000n, count: 0n, img: "/items/sword_netherite.gif" }
    ],
    villagers: [
      { key: 0, title: "Villager 1", desc: "Generates 1000 emeralds/sec", cost: 100000n, count: 0n, img: "/villagers/villager1.png", emeraldsPerSec: 1000n },
      { key: 1, title: "Villager 2", desc: "Generates 6000 emeralds/sec", cost: 500000n, count: 0n, img: "/villagers/villager2.png", emeraldsPerSec: 6000n },
      { key: 2, title: "Villager 3", desc: "Generates 30000 emeralds/sec", cost: 2000000n, count: 0n, img: "/villagers/villager3.png", emeraldsPerSec: 30000n }
    ],
    cps: 0n,
    clickCounter: 0n,
    achievements: [],
    activeAchievements: []
  }),

  actions: {
    clickChicken() {
      if (!this.gaugeVisible) this.gaugeVisible = true;
      let gain = 1n * BigInt(this.multiplier);
      this.chickenCoins += gain;
      this.clickCounter += gain;

      if (this.clickCounter >= 10n) {
        const emeraldsEarned = 10n * (this.clickCounter / 10n);
        this.emeralds += emeraldsEarned;
        this.clickCounter %= 10n;
      }

      this.spamGauge = Math.min(this.spamGauge + 5, this.maxGauge);
      if (this.spamGauge >= this.maxGauge) this.multiplierActive = true;

      this.checkAchievements();
    },

    addFloatingNumberAt(x, y) {
      const id = Date.now() + Math.random();
      const translateX = Math.random() > 0.5 ? 30 + Math.random()*30 : -30 - Math.random()*30;
      const rotate = Math.random() * 40 - 20;
      this.floatingNumbers.push({ id, x, y, translateX, translateY: 80, rotate });
      setTimeout(() => {
        this.floatingNumbers = this.floatingNumbers.filter(f => f.id !== id);
      }, 1000);
    },

    buyUpgrade(key) {
      const item = this.upgrades.find(u => u.key === key);
      if (this.emeralds >= item.cost) {
        this.emeralds -= item.cost;
        item.count++;
      }
      this.checkAchievements();
    },

    buyVillager(key) {
      const v = this.villagers.find(v => v.key === key);
      if (this.emeralds >= v.cost) {
        this.emeralds -= v.cost;
        v.count++;
      }
      this.checkAchievements();
    },

    tick() {
      let gainPoints = 0n;
      let emeraldsFromVillagers = 0n;
      this.upgrades.forEach(u => gainPoints += u.perSecond * u.count);
      this.villagers.forEach(v => emeraldsFromVillagers += v.emeraldsPerSec * v.count);

      this.chickenCoins += gainPoints;
      this.cps = gainPoints;
      this.emeralds += emeraldsFromVillagers;

      if (this.chickenCoins >= 10n) {
        const earnedEmeralds = 10n * (this.chickenCoins / 10n);
        this.emeralds += earnedEmeralds;
        this.chickenCoins %= 10n;
      }

      if (this.gaugeVisible && this.spamGauge > 0) {
        this.spamGauge = Math.max(0, this.spamGauge - 5);
        if (this.spamGauge < this.maxGauge) this.multiplierActive = false;
      } else if (this.spamGauge <= 0) {
        this.gaugeVisible = false;
        this.multiplier = 1;
      }

      this.checkAchievements();
    },

    checkAchievements() {
      const achList = [
        { id: 0, title: "Novice Miner", condition: () => this.chickenCoins >= 100n },
        { id: 1, title: "Blacksmith", condition: () => this.upgrades.some(u => u.count > 0) },
        { id: 2, title: "Trading Villager", condition: () => this.villagers.some(v => v.count > 0) },
        { id: 3, title: "Ender Slayer", condition: () => this.chickenCoins >= 1000000n }
      ];

      achList.forEach(a => {
        if (!this.achievements.includes(a.id) && a.condition()) {
          this.achievements.push(a.id);
          this.activeAchievements.push({ id: a.id, title: a.title });
          setTimeout(() => {
            this.activeAchievements = this.activeAchievements.filter(act => act.id !== a.id);
          }, 2000);
        }
      });
    },

    loadGame() {
      const saved = localStorage.getItem("gameData");
      if (saved) this.$patch(JSON.parse(saved));
    }
  }
});
