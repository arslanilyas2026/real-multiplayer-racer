import { CarColor, CarType } from "../types/game";

export interface CarColorOption {
  color: CarColor;
  label: string;
  glowColor: string;
}

export interface CarData {
  type: CarType;
  displayName: string;
  description: string;
  stats: {
    speed: number; // 1–10
    handling: number; // 1–10
    acceleration: number; // 1–10
    maxFuel: number;
  };
  /** Level required to unlock. Level 1 = free (BASIC). */
  unlockLevel: number;
  emoji: string; // placeholder icon
  colors: CarColorOption[];
}

const SHARED_COLORS: CarColorOption[] = [
  { color: CarColor.NEON_ORANGE, label: "Blaze", glowColor: "#FF6B2B" },
  { color: CarColor.NEON_CYAN, label: "Teal", glowColor: "#00D4AA" },
  { color: CarColor.NEON_PURPLE, label: "Volt", glowColor: "#B44FFF" },
  { color: CarColor.NEON_YELLOW, label: "Gold", glowColor: "#FFD700" },
];

export const CAR_CATALOG: CarData[] = [
  {
    type: CarType.BASIC,
    displayName: "BASIC",
    description: "Reliable starter. Easy to handle.",
    stats: { speed: 4, handling: 5, acceleration: 5, maxFuel: 100 },
    unlockLevel: 1, // default — always unlocked
    emoji: "🚗",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.SPORT,
    displayName: "SPORT",
    description: "Nimble and quick. Great for tight lanes.",
    stats: { speed: 6, handling: 7, acceleration: 7, maxFuel: 90 },
    unlockLevel: 2, // XP 1,000
    emoji: "🏎️",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.STREET,
    displayName: "STREET",
    description: "Low and wide. Powerful acceleration.",
    stats: { speed: 7, handling: 6, acceleration: 8, maxFuel: 85 },
    unlockLevel: 3, // XP 2,000
    emoji: "🚙",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.JET,
    displayName: "JET",
    description: "Turbocharged beast. Hard to tame.",
    stats: { speed: 8, handling: 5, acceleration: 9, maxFuel: 80 },
    unlockLevel: 4, // XP 3,500
    emoji: "✈️",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.RACE,
    displayName: "RACE",
    description: "Track-tuned precision machine.",
    stats: { speed: 9, handling: 8, acceleration: 8, maxFuel: 75 },
    unlockLevel: 5, // XP 5,000
    emoji: "🏁",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.SUPER,
    displayName: "SUPER",
    description: "Supercar pedigree. Raw, relentless power.",
    stats: { speed: 9, handling: 9, acceleration: 9, maxFuel: 72 },
    unlockLevel: 6, // XP 7,000
    emoji: "🚀",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.HYPER,
    displayName: "HYPER",
    description: "Blistering top speed. Elite pilot only.",
    stats: { speed: 10, handling: 7, acceleration: 9, maxFuel: 70 },
    unlockLevel: 7, // XP 9,500
    emoji: "⚡",
    colors: SHARED_COLORS,
  },
  {
    type: CarType.LIGHTNING,
    displayName: "LIGHTNING",
    description: "The apex. Fastest machine on the road.",
    stats: { speed: 10, handling: 10, acceleration: 10, maxFuel: 65 },
    unlockLevel: 8, // XP 12,500
    emoji: "🌩️",
    colors: SHARED_COLORS,
  },
];

export function getCarData(type: CarType): CarData {
  return CAR_CATALOG.find((c) => c.type === type) ?? CAR_CATALOG[0];
}
