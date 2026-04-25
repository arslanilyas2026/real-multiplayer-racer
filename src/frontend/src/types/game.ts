// ── Enums ────────────────────────────────────────────────────────────────────

export enum CarType {
  BASIC = "BASIC",
  SPORT = "SPORT",
  STREET = "STREET",
  JET = "JET",
  RACE = "RACE",
  HYPER = "HYPER",
  LIGHTNING = "LIGHTNING",
}

export enum MapTheme {
  HIGHWAY = "HIGHWAY",
  CITY = "CITY",
  CANYON = "CANYON",
  SUNSET_BOULEVARD = "SUNSET_BOULEVARD",
  RAINY_NIGHT_CITY = "RAINY_NIGHT_CITY",
  MOUNTAIN_PASS = "MOUNTAIN_PASS",
}

export enum GameMode {
  SCORE = "SCORE",
  TIMED = "TIMED",
}

export enum PowerUpType {
  SHIELD = "SHIELD",
  SPEED_BOOST = "SPEED_BOOST",
  COIN_MAGNET = "COIN_MAGNET",
  INVINCIBILITY = "INVINCIBILITY",
  TIME_SLOW = "TIME_SLOW",
  FUEL_PACK = "FUEL_PACK",
  DOUBLE_COINS = "DOUBLE_COINS",
}

export enum CarColor {
  NEON_ORANGE = "#FF6B2B",
  NEON_CYAN = "#00D4AA",
  NEON_PURPLE = "#B44FFF",
  NEON_YELLOW = "#FFD700",
}

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface CarStats {
  speed: number; // 1–10
  handling: number; // 1–10
  acceleration: number; // 1–10
  maxFuel: number; // fuel capacity units
}

export interface PowerUpEffect {
  type: PowerUpType;
  duration: number; // seconds
  magnitude: number; // multiplier or flat value
  startedAt: number; // timestamp ms
}

export interface GameState {
  score: number;
  coins: number;
  fuel: number;
  distance: number;
  timeLeft: number;
  activePowerUps: PowerUpEffect[];
  carType: CarType;
  carColor: CarColor;
  mapTheme: MapTheme;
  gameMode: GameMode;
  timedDuration: number; // minutes — 1 | 3 | 5 | 10
  isGameOver: boolean;
  isPaused: boolean;
  lane: number; // 0 | 1 | 2 (left | center | right)
  speed: number; // current road speed px/s
  isShielded: boolean;
  isInvincible: boolean;
  multiplier: number;
}

export interface PlayerProfile {
  xp: number;
  level: number;
  totalCoins: number;
  selectedCar: CarType;
  selectedColor: CarColor;
  unlockedCars: CarType[];
  unlockedMaps: MapTheme[];
  powerUpLevels: Record<PowerUpType, number>; // level 0–3
  highScore: number;
  totalRaces: number;
}

export interface RaceResult {
  score: number;
  coins: number;
  distance: number;
  duration: number; // seconds
  carType: CarType;
  mapTheme: MapTheme;
  gameMode: GameMode;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  carType: CarType;
}

export type AppScreen =
  | "splash"
  | "menu"
  | "car-select"
  | "game-mode"
  | "upgrades"
  | "game"
  | "crash"
  | "results"
  | "leaderboard"
  | "challenges";

// ── AI Opponent Types ─────────────────────────────────────────────────────────

// AI personality names — randomly chosen each race
export type AIName = "NOVA" | "BLAZE" | "VIPER" | "RYZE" | "KIRA";

// AI difficulty tier — scales with player XP level
export type AIDifficulty = "ROOKIE" | "RACER" | "PRO" | "ELITE" | "LEGEND";

// AI state during a race
export interface AIOpponent {
  name: AIName;
  carType: CarType;
  carColor: string; // hex color — distinct neon, one of 5 AI-exclusive colors
  glowColor: string; // hex glow color matching carColor
  difficulty: AIDifficulty;
  score: number; // AI's simulated score, updated each frame
  lane: number; // AI's current visual lane (0-4)
  positionY: number; // AI's Y position on canvas (0 = top, canvas.height = bottom)
  lastPowerUpGrab: string | null; // power-up icon string for visual effect, null if none
  powerUpGrabTimer: number; // countdown ms for showing powerup grab effect
  isLeading: boolean; // whether AI is currently ahead of player
}

// Extended race result to include AI data
export interface AIRaceResult {
  playerWon: boolean;
  aiName: AIName;
  aiCarType: CarType;
  aiDifficulty: AIDifficulty;
  aiScore: number;
  positionSwaps: number; // how many times the lead changed
  finalMargin: number; // absolute score difference at end
}
