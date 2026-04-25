/**
 * Backend API wrapper.
 *
 * The backend.d.ts currently has an empty backendInterface (no methods
 * generated yet). We expose typed wrappers that will call the real actor
 * once bindings are regenerated. Until then they fall back to local stubs
 * so the frontend remains functional.
 */

import { CarType } from "../types/game";

export interface BackendCarCatalogItem {
  carType: string;
  speed: number;
  handling: number;
  acceleration: number;
  maxFuel: number;
  unlockCost: bigint;
}

export interface BackendProfile {
  xp: bigint;
  totalCoins: bigint;
  selectedCar: string;
  unlockedCars: string[];
  powerUpLevels: Array<[string, number]>;
  highScore: bigint;
  totalRaces: bigint;
}

export interface BackendRaceResult {
  score: bigint;
  coins: bigint;
  distance: bigint;
  duration: bigint;
  carType: string;
  mapTheme: string;
  gameMode: string;
}

export interface BackendLeaderboardEntry {
  rank: bigint;
  playerName: string;
  score: bigint;
  carType: string;
}

// ── Stub implementations ──────────────────────────────────────────────────────
// These return sensible defaults. When `pnpm bindgen` regenerates the actor
// with real methods, replace the stub bodies with `actor.methodName(...)`.

export async function apiGetCarCatalog(): Promise<BackendCarCatalogItem[]> {
  // TODO: return actor.getCarCatalog() once bindings exist
  return [
    {
      carType: CarType.BASIC,
      speed: 4,
      handling: 5,
      acceleration: 5,
      maxFuel: 100,
      unlockCost: 0n,
    },
    {
      carType: CarType.SPORT,
      speed: 6,
      handling: 7,
      acceleration: 7,
      maxFuel: 90,
      unlockCost: 500n,
    },
    {
      carType: CarType.STREET,
      speed: 7,
      handling: 6,
      acceleration: 8,
      maxFuel: 85,
      unlockCost: 1000n,
    },
    {
      carType: CarType.JET,
      speed: 8,
      handling: 5,
      acceleration: 9,
      maxFuel: 80,
      unlockCost: 2500n,
    },
    {
      carType: CarType.RACE,
      speed: 9,
      handling: 8,
      acceleration: 8,
      maxFuel: 75,
      unlockCost: 5000n,
    },
    {
      carType: CarType.HYPER,
      speed: 10,
      handling: 7,
      acceleration: 9,
      maxFuel: 70,
      unlockCost: 10000n,
    },
    {
      carType: CarType.LIGHTNING,
      speed: 10,
      handling: 10,
      acceleration: 10,
      maxFuel: 65,
      unlockCost: 25000n,
    },
  ];
}

export async function apiGetOrCreateProfile(): Promise<BackendProfile> {
  // TODO: return actor.getOrCreateProfile()
  return {
    xp: 0n,
    totalCoins: 0n,
    selectedCar: CarType.BASIC,
    unlockedCars: [CarType.BASIC],
    powerUpLevels: [],
    highScore: 0n,
    totalRaces: 0n,
  };
}

export async function apiGetProfile(): Promise<BackendProfile | null> {
  // TODO: return actor.getProfile()
  return null;
}

export async function apiSubmitRaceResult(
  result: BackendRaceResult,
): Promise<void> {
  // TODO: actor.submitRaceResult(result)
  console.log("[API] submitRaceResult", result);
}

export async function apiGetLeaderboard(): Promise<BackendLeaderboardEntry[]> {
  // TODO: return actor.getLeaderboard()
  return [
    {
      rank: 1n,
      playerName: "SPEEDY_ACE",
      score: 98450n,
      carType: CarType.LIGHTNING,
    },
    {
      rank: 2n,
      playerName: "NEON_DRIFT",
      score: 87200n,
      carType: CarType.HYPER,
    },
    { rank: 3n, playerName: "TURBO_X", score: 75600n, carType: CarType.RACE },
    { rank: 4n, playerName: "BLAZE_99", score: 63100n, carType: CarType.JET },
    {
      rank: 5n,
      playerName: "STREET_KID",
      score: 51800n,
      carType: CarType.STREET,
    },
  ];
}

export async function apiGetTopScores(
  limit: number,
): Promise<BackendLeaderboardEntry[]> {
  const all = await apiGetLeaderboard();
  return all.slice(0, limit);
}

export async function apiGetTotalPlayers(): Promise<bigint> {
  // TODO: return actor.getTotalPlayers()
  return 1284n;
}

export async function apiGetTotalRaces(): Promise<bigint> {
  // TODO: return actor.getTotalRaces()
  return 9823n;
}
