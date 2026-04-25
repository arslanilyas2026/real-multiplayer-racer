import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaderboardEntry {
    playerId: Principal;
    rank: bigint;
    score: bigint;
    timestamp: bigint;
    carType: CarType;
}
export interface CarInfo {
    unlockCost: bigint;
    stats: CarStats;
    carType: CarType;
}
export interface SubmitRaceInput {
    mode: GameMode;
    coinsCollected: bigint;
    distanceTravelled: bigint;
    score: bigint;
    mapTheme: MapTheme;
    carType: CarType;
}
export interface CarStats {
    speed: bigint;
    acceleration: bigint;
    handling: bigint;
}
export interface PlayerProfilePublic {
    xp: bigint;
    selectedCar: CarType;
    playerId: Principal;
    coins: bigint;
    highScore: bigint;
    unlockedCars: Array<CarType>;
    powerUpLevels: Array<[PowerUpType, bigint]>;
    totalRaces: bigint;
}
export enum CarType {
    JET = "JET",
    BASIC = "BASIC",
    RACE = "RACE",
    HYPER = "HYPER",
    STREET = "STREET",
    LIGHTNING = "LIGHTNING",
    SPORT = "SPORT"
}
export enum GameMode {
    TIMED = "TIMED",
    SCORE = "SCORE"
}
export enum MapTheme {
    CITY = "CITY",
    CANYON = "CANYON",
    HIGHWAY = "HIGHWAY"
}
export enum PowerUpType {
    FUEL_PACK = "FUEL_PACK",
    SPEED_BOOST = "SPEED_BOOST",
    DOUBLE_COINS = "DOUBLE_COINS",
    COIN_MAGNET = "COIN_MAGNET",
    TIME_SLOW = "TIME_SLOW",
    INVINCIBILITY = "INVINCIBILITY",
    SHIELD = "SHIELD"
}
export interface backendInterface {
    getCarCatalog(): Promise<Array<CarInfo>>;
    getLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getOrCreateProfile(): Promise<PlayerProfilePublic>;
    getProfile(): Promise<PlayerProfilePublic | null>;
    getTopScores(): Promise<Array<LeaderboardEntry>>;
    getTotalPlayers(): Promise<bigint>;
    getTotalRaces(): Promise<bigint>;
    selectCar(carType: CarType): Promise<boolean>;
    submitRaceResult(input: SubmitRaceInput): Promise<PlayerProfilePublic>;
    unlockCar(carType: CarType): Promise<boolean>;
    upgradePowerUp(ptype: PowerUpType): Promise<boolean>;
}
