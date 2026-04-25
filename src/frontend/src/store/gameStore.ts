import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type AIOpponent,
  type AIRaceResult,
  type AppScreen,
  CarColor,
  CarType,
  GameMode,
  type GameState,
  MapTheme,
  type PlayerProfile,
  PowerUpType,
} from "../types/game";

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_PROFILE: PlayerProfile = {
  xp: 0,
  level: 1,
  totalCoins: 0,
  selectedCar: CarType.BASIC,
  selectedColor: CarColor.NEON_ORANGE,
  unlockedCars: [CarType.BASIC],
  unlockedMaps: [MapTheme.HIGHWAY, MapTheme.CITY, MapTheme.CANYON],
  powerUpLevels: {
    [PowerUpType.SHIELD]: 0,
    [PowerUpType.SPEED_BOOST]: 0,
    [PowerUpType.COIN_MAGNET]: 0,
    [PowerUpType.INVINCIBILITY]: 0,
    [PowerUpType.TIME_SLOW]: 0,
    [PowerUpType.FUEL_PACK]: 0,
    [PowerUpType.DOUBLE_COINS]: 0,
  },
  highScore: 0,
  totalRaces: 0,
};

const DEFAULT_GAME_STATE: GameState = {
  score: 0,
  coins: 0,
  fuel: 100,
  distance: 0,
  timeLeft: 180,
  activePowerUps: [],
  carType: CarType.BASIC,
  carColor: CarColor.NEON_ORANGE,
  mapTheme: MapTheme.HIGHWAY,
  gameMode: GameMode.SCORE,
  timedDuration: 3,
  isGameOver: false,
  isPaused: false,
  lane: 1,
  speed: 1,
  isShielded: false,
  isInvincible: false,
  multiplier: 1,
};

// ── Store shape ───────────────────────────────────────────────────────────────

interface GameStore {
  // Navigation
  currentScreen: AppScreen;
  navigateTo: (screen: AppScreen) => void;

  // Player profile
  profile: PlayerProfile;
  updateProfile: (updates: Partial<PlayerProfile>) => void;
  spendCoins: (amount: number) => boolean;
  addCoins: (amount: number) => void;
  addXP: (amount: number) => void;
  selectCar: (car: CarType) => void;
  selectColor: (color: CarColor) => void;
  unlockCar: (car: CarType) => void;
  unlockMap: (theme: MapTheme) => void;
  upgradePowerUp: (type: PowerUpType) => void;

  // Game configuration (pre-race selections)
  selectedMap: MapTheme;
  selectedGameMode: GameMode;
  selectedTimedDuration: number;
  setSelectedMap: (map: MapTheme) => void;
  setSelectedGameMode: (mode: GameMode) => void;
  setSelectedTimedDuration: (duration: number) => void;

  // Active game state
  gameState: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateGameState: (updates: Partial<GameState>) => void;
  changeLane: (direction: "left" | "right") => void;
  setLane: (lane: number) => void;

  // AI opponent state
  aiOpponent: AIOpponent | null;
  aiRaceResult: AIRaceResult | null;
  initAIOpponent: (opponent: AIOpponent) => void;
  updateAIOpponent: (updates: Partial<AIOpponent>) => void;
  setAIRaceResult: (result: AIRaceResult) => void;
  clearAIState: () => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Navigation
      currentScreen: "splash",
      navigateTo: (screen) => set({ currentScreen: screen }),

      // Profile
      profile: DEFAULT_PROFILE,
      updateProfile: (updates) =>
        set((s) => ({ profile: { ...s.profile, ...updates } })),
      spendCoins: (amount) => {
        const { profile } = get();
        if (profile.totalCoins < amount) return false;
        set((s) => ({
          profile: { ...s.profile, totalCoins: s.profile.totalCoins - amount },
        }));
        return true;
      },
      addCoins: (amount) =>
        set((s) => ({
          profile: { ...s.profile, totalCoins: s.profile.totalCoins + amount },
        })),
      addXP: (amount) => {
        const { profile } = get();
        const newXP = profile.xp + amount;
        const newLevel = Math.floor(newXP / 1000) + 1;
        set((s) => ({ profile: { ...s.profile, xp: newXP, level: newLevel } }));
      },
      selectCar: (car) =>
        set((s) => ({ profile: { ...s.profile, selectedCar: car } })),
      selectColor: (color) =>
        set((s) => ({ profile: { ...s.profile, selectedColor: color } })),
      unlockCar: (car) =>
        set((s) => ({
          profile: {
            ...s.profile,
            unlockedCars: [...new Set([...s.profile.unlockedCars, car])],
          },
        })),
      unlockMap: (theme) =>
        set((s) => ({
          profile: {
            ...s.profile,
            unlockedMaps: [
              ...new Set([
                ...(s.profile.unlockedMaps ?? [MapTheme.HIGHWAY]),
                theme,
              ]),
            ],
          },
        })),
      upgradePowerUp: (type) =>
        set((s) => {
          const current = s.profile.powerUpLevels[type];
          if (current >= 5) return s;
          return {
            profile: {
              ...s.profile,
              powerUpLevels: {
                ...s.profile.powerUpLevels,
                [type]: current + 1,
              },
            },
          };
        }),

      // Game config
      selectedMap: MapTheme.HIGHWAY,
      selectedGameMode: GameMode.SCORE,
      selectedTimedDuration: 3,
      setSelectedMap: (map) => set({ selectedMap: map }),
      setSelectedGameMode: (mode) => set({ selectedGameMode: mode }),
      setSelectedTimedDuration: (duration) =>
        set({ selectedTimedDuration: duration }),

      // Game state
      gameState: DEFAULT_GAME_STATE,
      startGame: () => {
        const {
          profile,
          selectedMap,
          selectedGameMode,
          selectedTimedDuration,
          clearAIState,
        } = get();
        clearAIState();
        set({
          gameState: {
            ...DEFAULT_GAME_STATE,
            carType: profile.selectedCar,
            carColor: profile.selectedColor,
            mapTheme: selectedMap,
            gameMode: selectedGameMode,
            timedDuration: selectedTimedDuration,
            timeLeft: selectedTimedDuration * 60,
            fuel: 100,
          },
        });
      },
      pauseGame: () =>
        set((s) => ({ gameState: { ...s.gameState, isPaused: true } })),
      resumeGame: () =>
        set((s) => ({ gameState: { ...s.gameState, isPaused: false } })),
      endGame: () => {
        const { gameState, profile } = get();
        const newHighScore = Math.max(gameState.score, profile.highScore);
        set((s) => ({
          gameState: { ...s.gameState, isGameOver: true },
          profile: {
            ...s.profile,
            highScore: newHighScore,
            totalCoins: s.profile.totalCoins + gameState.coins,
            totalRaces: s.profile.totalRaces + 1,
            xp: s.profile.xp + Math.floor(gameState.score / 10),
          },
        }));
      },
      updateGameState: (updates) =>
        set((s) => ({ gameState: { ...s.gameState, ...updates } })),
      changeLane: (direction) => {
        const { gameState } = get();
        const newLane =
          direction === "left"
            ? Math.max(0, gameState.lane - 1)
            : Math.min(4, gameState.lane + 1);
        set((s) => ({ gameState: { ...s.gameState, lane: newLane } }));
      },
      setLane: (lane) =>
        set((s) => ({
          gameState: { ...s.gameState, lane: Math.max(0, Math.min(4, lane)) },
        })),

      // AI opponent
      aiOpponent: null,
      aiRaceResult: null,
      initAIOpponent: (opponent) => set({ aiOpponent: opponent }),
      updateAIOpponent: (updates) =>
        set((s) => ({
          aiOpponent: s.aiOpponent ? { ...s.aiOpponent, ...updates } : null,
        })),
      setAIRaceResult: (result) => set({ aiRaceResult: result }),
      clearAIState: () => set({ aiOpponent: null, aiRaceResult: null }),
    }),
    {
      name: "racer-store",
      partialize: (state) => ({
        profile: state.profile,
        selectedMap: state.selectedMap,
        selectedGameMode: state.selectedGameMode,
        selectedTimedDuration: state.selectedTimedDuration,
      }),
    },
  ),
);
