import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    chickenCoins: 0n,
    emeralds: 0n,
    multiplier: 1,
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
      { key: 9, title: "Netherite Sword", desc: "+1000", cost: 1000000n, perSecond: 1000n, count: 0n, img: "/items/sword_netherite.gif" },
      { key: 10, title: "Click Multiplier", desc: "×2 click", cost: 50000n, perSecond: 0n, count: 0n, img: "/goldenegg.png" }
    ],
    villagers: [
      { key: 0, title: "Villager 1", desc: "Generates 1000 emeralds/sec", cost: 100000n, count: 0n, img: "/villagers/villager1.png", emeraldsPerSec: 1000n },
      { key: 1, title: "Villager 2", desc: "Generates 6000 emeralds/sec", cost: 500000n, count: 0n, img: "/villagers/villager2.png", emeraldsPerSec: 6000n },
      { key: 2, title: "Villager 3", desc: "Generates 30000 emeralds/sec", cost: 2000000n, count: 0n, img: "/villagers/villager3.png", emeraldsPerSec: 30000n }
    ],
    cps: 0n,
    clickCounter: 0n,
    achievements: [],
    activeAchievements: [],
    clickGoals: [
      { id: 0, name: "Golden Beginner", goal: 100n, completed: false },
      { id: 1, name: "Egg Collector", goal: 500n, completed: false },
      { id: 2, name: "Golden Farmer", goal: 2000n, completed: false },
      { id: 3, name: "Egg Master", goal: 10000n, completed: false },
      { id: 4, name: "Legendary Jockey", goal: 50000n, completed: false }
    ]
  }),

  actions: {
    clickChicken(x = null, y = null) {
      let gain = 1n;
      const multiplierUpgrade = this.upgrades.find(u => u.key === 10);
      if (multiplierUpgrade && multiplierUpgrade.count > 0) gain *= BigInt(2 ** multiplierUpgrade.count);

      this.chickenCoins += gain;
      this.clickCounter += gain;

      if (this.clickCounter >= 10n) {
        const emeraldsEarned = 10n * (this.clickCounter / 10n);
        this.emeralds += emeraldsEarned;
        this.clickCounter %= 10n;
      }

      if (x !== null && y !== null) {
        this.addFloatingNumberAt(x, y, `+${gain}`);
      }

      this.updateClickGoals();
      this.checkAchievements();
    },

    addFloatingNumberAt(x, y, text = '+1') {
      const id = Date.now() + Math.random();
      const translateX = Math.random() > 0.5 ? 30 + Math.random()*30 : -30 - Math.random()*30;
      const rotate = Math.random() * 40 - 20;
      this.floatingNumbers.push({ id, x, y, translateX, translateY: 80, rotate, text });
      setTimeout(() => {
        this.floatingNumbers = this.floatingNumbers.filter(f => f.id !== id);
      }, 1000);
    },

    buyUpgrade(key) {
      const item = this.upgrades.find(u => u.key === key);
      if (this.emeralds >= item.cost) {
        this.emeralds -= item.cost;
        item.count++;
        if (item.key === 10) {
          item.cost *= 3n;
          item.desc = `×${2 ** item.count} click`;
        }
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
      this.clickCounter += gainPoints;

      if (this.clickCounter >= 10n) {
        const emeraldsEarned = 10n * (this.clickCounter / 10n);
        this.emeralds += emeraldsEarned;
        this.clickCounter %= 10n;
      }

      this.updateClickGoals();
      this.checkAchievements();
    },

    updateClickGoals() {
      for (let i = 0; i < this.clickGoals.length; i++) {
        const goal = this.clickGoals[i];
        if (i === 0 || this.clickGoals[i-1].completed) {
          if (this.chickenCoins >= goal.goal) goal.completed = true;
        } else break;
      }
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
          setTimeout(() => { this.activeAchievements = this.activeAchievements.filter(act => act.id !== a.id); }, 2000);
        }
      });
    },

    loadGame() {
      const saved = localStorage.getItem("gameData");
      if (saved) this.$patch(JSON.parse(saved));
    }
  }
});
