import { type AIDifficulty, type AIName, CarType } from "../types/game";

// ── AI Personality ────────────────────────────────────────────────────────────

export interface AIPersonality {
  name: AIName;
  color: string; // car fill color
  glowColor: string; // glow/trail color
  tauntWhenLeading: string[]; // messages when AI is ahead
  tauntWhenBehind: string[]; // messages when AI is catching up
  tauntOnPowerUp: string[]; // messages when AI grabs a power-up
}

export const AI_PERSONALITIES: Record<AIName, AIPersonality> = {
  NOVA: {
    name: "NOVA",
    color: "#FF2D78", // hot pink — unique, not in player palette
    glowColor: "#FF2D78",
    tauntWhenLeading: [
      "NOVA pulls ahead!",
      "Can't catch NOVA!",
      "NOVA is unstoppable!",
      "Too slow for NOVA!",
    ],
    tauntWhenBehind: [
      "NOVA is right behind you!",
      "NOVA's catching up fast!",
      "Watch your back — NOVA!",
      "Don't get comfortable...",
    ],
    tauntOnPowerUp: ["NOVA grabs a boost!", "NOVA powered up!"],
  },
  BLAZE: {
    name: "BLAZE",
    color: "#FF8C00", // deep orange — not in player palette
    glowColor: "#FFA500",
    tauntWhenLeading: [
      "BLAZE takes the lead!",
      "BLAZE is on fire!",
      "You can't handle BLAZE!",
      "BLAZE lights it up!",
    ],
    tauntWhenBehind: [
      "BLAZE is closing in!",
      "Feel the heat — BLAZE is near!",
      "BLAZE won't quit!",
      "BLAZE is surging!",
    ],
    tauntOnPowerUp: ["BLAZE grabs power!", "BLAZE ignites!"],
  },
  VIPER: {
    name: "VIPER",
    color: "#39FF14", // neon green — not in player palette
    glowColor: "#39FF14",
    tauntWhenLeading: [
      "VIPER strikes first!",
      "VIPER leads the pack!",
      "Nobody beats VIPER!",
      "VIPER is venomous!",
    ],
    tauntWhenBehind: [
      "VIPER coiling up...",
      "VIPER's ready to strike!",
      "VIPER is gaining fast!",
      "Don't underestimate VIPER!",
    ],
    tauntOnPowerUp: ["VIPER strikes!", "VIPER powered up!"],
  },
  RYZE: {
    name: "RYZE",
    color: "#00BFFF", // deep sky blue — not in player palette
    glowColor: "#00BFFF",
    tauntWhenLeading: [
      "RYZE to the top!",
      "RYZE can't be stopped!",
      "RYZE dominates!",
      "RYZE is rising!",
    ],
    tauntWhenBehind: [
      "RYZE is surging!",
      "RYZE refuses to lose!",
      "Watch out — RYZE is coming!",
      "RYZE won't give up!",
    ],
    tauntOnPowerUp: ["RYZE powers up!", "RYZE boosts!"],
  },
  KIRA: {
    name: "KIRA",
    color: "#DA70D6", // orchid purple — distinct from player purple
    glowColor: "#DA70D6",
    tauntWhenLeading: [
      "KIRA leads!",
      "KIRA's in a class alone!",
      "Pure skill — that's KIRA!",
      "KIRA dominates the road!",
    ],
    tauntWhenBehind: [
      "KIRA's not done yet!",
      "KIRA is pushing hard!",
      "Don't count out KIRA!",
      "KIRA is on your tail!",
    ],
    tauntOnPowerUp: ["KIRA grabs it!", "KIRA powers up!"],
  },
};

// ── Difficulty Scaling ────────────────────────────────────────────────────────

// Difficulty tier based on player level
export function getAIDifficulty(playerLevel: number): AIDifficulty {
  if (playerLevel <= 2) return "ROOKIE";
  if (playerLevel <= 5) return "RACER";
  if (playerLevel <= 10) return "PRO";
  if (playerLevel <= 18) return "ELITE";
  return "LEGEND";
}

// Speed multiplier per difficulty — affects how fast AI score grows
// Rubber-band: AI score targets 85-95% of player score (close races always)
export const AI_SPEED_MULTIPLIERS: Record<
  AIDifficulty,
  { base: number; rubberBandFactor: number }
> = {
  ROOKIE: { base: 0.75, rubberBandFactor: 0.85 },
  RACER: { base: 0.85, rubberBandFactor: 0.88 },
  PRO: { base: 0.92, rubberBandFactor: 0.91 },
  ELITE: { base: 0.97, rubberBandFactor: 0.95 },
  LEGEND: { base: 1.02, rubberBandFactor: 0.98 }, // can win!
};

// ── Random Helpers ────────────────────────────────────────────────────────────

// Pick a random AI personality name
export function randomAIName(): AIName {
  const names: AIName[] = ["NOVA", "BLAZE", "VIPER", "RYZE", "KIRA"];
  return names[Math.floor(Math.random() * names.length)];
}

// Pick a random car type for AI (can be any type)
export function randomAICarType(): CarType {
  const types: CarType[] = [
    CarType.BASIC,
    CarType.SPORT,
    CarType.STREET,
    CarType.JET,
    CarType.RACE,
    CarType.HYPER,
    CarType.LIGHTNING,
  ];
  return types[Math.floor(Math.random() * types.length)];
}

// Get a random taunt message for a scenario
export function getAITaunt(
  personality: AIPersonality,
  scenario: "leading" | "behind" | "powerup",
): string {
  const list =
    scenario === "leading"
      ? personality.tauntWhenLeading
      : scenario === "behind"
        ? personality.tauntWhenBehind
        : personality.tauntOnPowerUp;
  return list[Math.floor(Math.random() * list.length)];
}
