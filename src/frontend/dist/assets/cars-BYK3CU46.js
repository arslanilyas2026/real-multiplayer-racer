import { C as CarColor, a as CarType } from "./gameStore-5oklP8TG.js";
const SHARED_COLORS = [
  { color: CarColor.NEON_ORANGE, label: "Blaze", glowColor: "#FF6B2B" },
  { color: CarColor.NEON_CYAN, label: "Teal", glowColor: "#00D4AA" },
  { color: CarColor.NEON_PURPLE, label: "Volt", glowColor: "#B44FFF" },
  { color: CarColor.NEON_YELLOW, label: "Gold", glowColor: "#FFD700" }
];
const CAR_CATALOG = [
  {
    type: CarType.BASIC,
    displayName: "BASIC",
    description: "Reliable starter. Easy to handle.",
    stats: { speed: 4, handling: 5, acceleration: 5, maxFuel: 100 },
    unlockCost: 0,
    emoji: "🚗",
    colors: SHARED_COLORS
  },
  {
    type: CarType.SPORT,
    displayName: "SPORT",
    description: "Nimble and quick. Great for tight lanes.",
    stats: { speed: 6, handling: 7, acceleration: 7, maxFuel: 90 },
    unlockCost: 500,
    emoji: "🏎️",
    colors: SHARED_COLORS
  },
  {
    type: CarType.STREET,
    displayName: "STREET",
    description: "Low and wide. Powerful acceleration.",
    stats: { speed: 7, handling: 6, acceleration: 8, maxFuel: 85 },
    unlockCost: 1e3,
    emoji: "🚙",
    colors: SHARED_COLORS
  },
  {
    type: CarType.JET,
    displayName: "JET",
    description: "Turbocharged beast. Hard to tame.",
    stats: { speed: 8, handling: 5, acceleration: 9, maxFuel: 80 },
    unlockCost: 2500,
    emoji: "✈️",
    colors: SHARED_COLORS
  },
  {
    type: CarType.RACE,
    displayName: "RACE",
    description: "Track-tuned precision machine.",
    stats: { speed: 9, handling: 8, acceleration: 8, maxFuel: 75 },
    unlockCost: 5e3,
    emoji: "🏁",
    colors: SHARED_COLORS
  },
  {
    type: CarType.HYPER,
    displayName: "HYPER",
    description: "Blistering top speed. Elite pilot only.",
    stats: { speed: 10, handling: 7, acceleration: 9, maxFuel: 70 },
    unlockCost: 1e4,
    emoji: "⚡",
    colors: SHARED_COLORS
  },
  {
    type: CarType.LIGHTNING,
    displayName: "LIGHTNING",
    description: "The apex. Fastest machine on the road.",
    stats: { speed: 10, handling: 10, acceleration: 10, maxFuel: 65 },
    unlockCost: 25e3,
    emoji: "🌩️",
    colors: SHARED_COLORS
  }
];
function getCarData(type) {
  return CAR_CATALOG.find((c) => c.type === type) ?? CAR_CATALOG[0];
}
export {
  CAR_CATALOG as C,
  getCarData as g
};
