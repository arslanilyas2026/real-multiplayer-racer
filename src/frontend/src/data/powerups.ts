import { PowerUpType } from "../types/game";

export interface PowerUpData {
  type: PowerUpType;
  displayName: string;
  description: string;
  icon: string; // emoji
  duration: number; // seconds (0 = instant)
  upgradeCost: number[]; // cost per level [L1, L2, L3, L4, L5]
  color: string; // accent color hex
}

export const POWER_UP_CATALOG: PowerUpData[] = [
  {
    type: PowerUpType.SHIELD,
    displayName: "Shield",
    description:
      "Absorbs one crash. Protects your car from a single collision.",
    icon: "🛡️",
    duration: 8,
    upgradeCost: [200, 500, 1200, 2500, 5000],
    color: "#00D4AA",
  },
  {
    type: PowerUpType.SPEED_BOOST,
    displayName: "Speed Boost",
    description: "Temporarily max out your speed for a surge of pure velocity.",
    icon: "🚀",
    duration: 5,
    upgradeCost: [150, 400, 1000, 2000, 4000],
    color: "#FF6B2B",
  },
  {
    type: PowerUpType.COIN_MAGNET,
    displayName: "Coin Magnet",
    description: "Automatically attracts all nearby coins to your car.",
    icon: "🧲",
    duration: 10,
    upgradeCost: [200, 500, 1200, 2500, 5000],
    color: "#FFD700",
  },
  {
    type: PowerUpType.INVINCIBILITY,
    displayName: "Invincibility",
    description:
      "Full immunity to all crashes and collisions for the duration.",
    icon: "⭐",
    duration: 6,
    upgradeCost: [300, 750, 1800, 3500, 7000],
    color: "#B44FFF",
  },
  {
    type: PowerUpType.TIME_SLOW,
    displayName: "Time Slow",
    description:
      "Slows all traffic and obstacles while you race at full speed.",
    icon: "⏱️",
    duration: 7,
    upgradeCost: [250, 600, 1500, 3000, 6000],
    color: "#4FC3F7",
  },
  {
    type: PowerUpType.FUEL_PACK,
    displayName: "Fuel Pack",
    description: "Instantly refills your fuel tank to maximum capacity.",
    icon: "⛽",
    duration: 0,
    upgradeCost: [100, 250, 600, 1200, 2500],
    color: "#69F0AE",
  },
  {
    type: PowerUpType.DOUBLE_COINS,
    displayName: "Double Coins",
    description: "All coins collected are worth double for the duration.",
    icon: "💰",
    duration: 12,
    upgradeCost: [200, 500, 1200, 2500, 5000],
    color: "#FFD700",
  },
];

export function getPowerUpData(type: PowerUpType): PowerUpData {
  return POWER_UP_CATALOG.find((p) => p.type === type) ?? POWER_UP_CATALOG[0];
}
