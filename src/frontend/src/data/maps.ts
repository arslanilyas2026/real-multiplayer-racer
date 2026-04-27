import { MapTheme } from "../types/game";

export interface MapThemeData {
  theme: MapTheme;
  displayName: string;
  description: string;
  roadColor: string;
  roadLineColor: string;
  backgroundAccent: string;
  skyColor: string;
  trafficDensity: "low" | "medium" | "high";
  obstacleTypes: string[];
  ambientColor: string;
  icon: string;
  unlockThreshold: number; // 0 = always unlocked (kept for backwards compatibility with coin unlock UI)
  unlockLevel: number; // 0 = always unlocked; level required for new maps
  trafficColors: string[];
  bgLeft: string;
  bgRight: string;
}

export const MAP_CATALOG: MapThemeData[] = [
  {
    theme: MapTheme.HIGHWAY,
    displayName: "Highway",
    description: "Open road, high speeds, and dense fast-lane traffic.",
    roadColor: "#1E2D40",
    roadLineColor: "#FFD700",
    backgroundAccent: "#0D1B2A",
    skyColor: "#0A1628",
    trafficDensity: "medium",
    obstacleTypes: ["truck", "sedan", "van", "motorcycle"],
    ambientColor: "#00D4AA",
    icon: "🛣️",
    unlockThreshold: 0,
    unlockLevel: 0,
    trafficColors: ["#00D4AA", "#FF6B2B", "#B44FFF", "#FFD700", "#4FC3F7"],
    bgLeft: "#0D1B2A",
    bgRight: "#0D1B2A",
  },
  {
    theme: MapTheme.CITY,
    displayName: "City",
    description: "Tight urban streets with intersections and dense obstacles.",
    roadColor: "#243050",
    roadLineColor: "#FFFFFF",
    backgroundAccent: "#1A2240",
    skyColor: "#0F1A30",
    trafficDensity: "high",
    obstacleTypes: ["taxi", "bus", "suv", "bike", "barrier"],
    ambientColor: "#B44FFF",
    icon: "🏙️",
    unlockThreshold: 0,
    unlockLevel: 0,
    trafficColors: ["#B44FFF", "#4FC3F7", "#FF6B2B", "#FFFFFF", "#FFD700"],
    bgLeft: "#1A2240",
    bgRight: "#1A2240",
  },
  {
    theme: MapTheme.CANYON,
    displayName: "Canyon",
    description: "Rocky desert cliffs with sharp turns and sparse traffic.",
    roadColor: "#2A1A0E",
    roadLineColor: "#FF6B2B",
    backgroundAccent: "#1C1208",
    skyColor: "#120C05",
    trafficDensity: "low",
    obstacleTypes: ["boulder", "jeep", "pickup", "barrier"],
    ambientColor: "#FF6B2B",
    icon: "🏜️",
    unlockThreshold: 0,
    unlockLevel: 0,
    trafficColors: ["#FF6B2B", "#CC4400", "#884400", "#FFAA00", "#FF3300"],
    bgLeft: "#1C1208",
    bgRight: "#1C1208",
  },
  {
    theme: MapTheme.SUNSET_BOULEVARD,
    displayName: "Sunset Boulevard",
    description: "Warm sunset vibes — palm trees and neon shops.",
    roadColor: "#1a0e00",
    roadLineColor: "#FFFFFF",
    backgroundAccent: "#2a1200",
    skyColor: "#FF6B35",
    trafficDensity: "medium",
    obstacleTypes: ["sedan", "motorcycle", "delivery-truck", "parked-car"],
    ambientColor: "#FF8C00",
    icon: "🌆",
    unlockThreshold: 1500,
    unlockLevel: 3,
    trafficColors: ["#FF4400", "#FF8800", "#FFAA00", "#FF6633", "#CC3300"],
    bgLeft: "linear-gradient(180deg, #FF6B35 0%, #FF4488 50%, #8B44FF 100%)",
    bgRight: "linear-gradient(180deg, #FF6B35 0%, #FF4488 50%, #8B44FF 100%)",
  },
  {
    theme: MapTheme.RAINY_NIGHT_CITY,
    displayName: "Rainy Night City",
    description: "Heavy rain, neon reflections, city lights at night.",
    roadColor: "#1a1a2e",
    roadLineColor: "#4FC3F7",
    backgroundAccent: "#0f0f1e",
    skyColor: "#0a0a1a",
    trafficDensity: "high",
    obstacleTypes: ["bus", "taxi", "police-car", "delivery-van", "sedan"],
    ambientColor: "#4FC3F7",
    icon: "🌧️",
    unlockThreshold: 3000,
    unlockLevel: 5,
    trafficColors: ["#1a2040", "#111122", "#222244", "#0a0a30", "#1a1a3a"],
    bgLeft: "linear-gradient(180deg, #0a0a1a 0%, #111128 50%, #0d0d20 100%)",
    bgRight: "linear-gradient(180deg, #0a0a1a 0%, #111128 50%, #0d0d20 100%)",
  },
  {
    theme: MapTheme.MOUNTAIN_PASS,
    displayName: "Mountain Pass",
    description: "Narrow winding mountain road — treacherous but beautiful.",
    roadColor: "#2a2a2a",
    roadLineColor: "#CCCCCC",
    backgroundAccent: "#1a1f1a",
    skyColor: "#708090",
    trafficDensity: "low",
    obstacleTypes: ["sports-car", "logging-truck", "mountain-jeep", "rockfall"],
    ambientColor: "#90A0A0",
    icon: "🏔️",
    unlockThreshold: 4500,
    unlockLevel: 7,
    trafficColors: ["#2d5a27", "#5c3d1e", "#6b2d2d", "#3d4a2d", "#4a3520"],
    bgLeft: "linear-gradient(180deg, #708090 0%, #4a5a4a 50%, #3a4a3a 100%)",
    bgRight: "linear-gradient(180deg, #708090 0%, #4a5a4a 50%, #3a4a3a 100%)",
  },
];

export function getMapData(theme: MapTheme): MapThemeData {
  return MAP_CATALOG.find((m) => m.theme === theme) ?? MAP_CATALOG[0];
}
