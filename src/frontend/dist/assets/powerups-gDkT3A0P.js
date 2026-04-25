import { P as PowerUpType } from "./gameStore-5oklP8TG.js";
const POWER_UP_CATALOG = [
  {
    type: PowerUpType.SHIELD,
    displayName: "Shield",
    description: "Absorbs one crash. Protects your car from a single collision.",
    icon: "🛡️",
    duration: 8,
    upgradeCost: [200, 500, 1200, 2500, 5e3],
    color: "#00D4AA"
  },
  {
    type: PowerUpType.SPEED_BOOST,
    displayName: "Speed Boost",
    description: "Temporarily max out your speed for a surge of pure velocity.",
    icon: "🚀",
    duration: 5,
    upgradeCost: [150, 400, 1e3, 2e3, 4e3],
    color: "#FF6B2B"
  },
  {
    type: PowerUpType.COIN_MAGNET,
    displayName: "Coin Magnet",
    description: "Automatically attracts all nearby coins to your car.",
    icon: "🧲",
    duration: 10,
    upgradeCost: [200, 500, 1200, 2500, 5e3],
    color: "#FFD700"
  },
  {
    type: PowerUpType.INVINCIBILITY,
    displayName: "Invincibility",
    description: "Full immunity to all crashes and collisions for the duration.",
    icon: "⭐",
    duration: 6,
    upgradeCost: [300, 750, 1800, 3500, 7e3],
    color: "#B44FFF"
  },
  {
    type: PowerUpType.TIME_SLOW,
    displayName: "Time Slow",
    description: "Slows all traffic and obstacles while you race at full speed.",
    icon: "⏱️",
    duration: 7,
    upgradeCost: [250, 600, 1500, 3e3, 6e3],
    color: "#4FC3F7"
  },
  {
    type: PowerUpType.FUEL_PACK,
    displayName: "Fuel Pack",
    description: "Instantly refills your fuel tank to maximum capacity.",
    icon: "⛽",
    duration: 0,
    upgradeCost: [100, 250, 600, 1200, 2500],
    color: "#69F0AE"
  },
  {
    type: PowerUpType.DOUBLE_COINS,
    displayName: "Double Coins",
    description: "All coins collected are worth double for the duration.",
    icon: "💰",
    duration: 12,
    upgradeCost: [200, 500, 1200, 2500, 5e3],
    color: "#FFD700"
  }
];
function getPowerUpData(type) {
  return POWER_UP_CATALOG.find((p) => p.type === type) ?? POWER_UP_CATALOG[0];
}
export {
  POWER_UP_CATALOG as P,
  getPowerUpData as g
};
