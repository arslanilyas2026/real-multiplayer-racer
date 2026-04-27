import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MAP_CATALOG, type MapThemeData } from "../data/maps";
import { useGameStore } from "../store/gameStore";
import { GameMode, MapTheme } from "../types/game";

const TIMED_OPTIONS = [
  { mins: 1, label: "1 MIN" },
  { mins: 3, label: "3 MIN" },
  { mins: 5, label: "5 MIN" },
  { mins: 10, label: "10 MIN" },
];

const MAP_CARD_THEMES: Partial<
  Record<MapTheme, { bg: string; border: string }>
> = {
  [MapTheme.SUNSET_BOULEVARD]: {
    bg: "linear-gradient(135deg,#2a1200 0%,#3d1800 40%,#1a0800 100%)",
    border: "#FF8C00",
  },
  [MapTheme.RAINY_NIGHT_CITY]: {
    bg: "linear-gradient(135deg,#050b18 0%,#0a1224 40%,#060c1a 100%)",
    border: "#4FC3F7",
  },
  [MapTheme.MOUNTAIN_PASS]: {
    bg: "linear-gradient(135deg,#0e1410 0%,#182018 40%,#0e1410 100%)",
    border: "#90A0A0",
  },
};

interface MapCardProps {
  map: MapThemeData;
  isSelected: boolean;
  isUnlocked: boolean;
  playerLevel: number;
  justUnlocked: boolean;
  onSelect: () => void;
  onUnlock: () => void;
}

function MapCard({
  map,
  isSelected,
  isUnlocked,
  playerLevel,
  justUnlocked,
  onSelect,
  onUnlock,
}: MapCardProps) {
  const isPremium = map.unlockLevel > 0;
  const theme = MAP_CARD_THEMES[map.theme];
  const canUnlock = isPremium && !isUnlocked && playerLevel >= map.unlockLevel;
  const cardBg = isSelected
    ? `${map.ambientColor}18`
    : theme
      ? theme.bg
      : "#131E2E";
  const borderColor = isSelected
    ? map.ambientColor
    : isUnlocked && isPremium
      ? `${map.ambientColor}88`
      : isPremium
        ? (theme?.border ?? map.ambientColor)
        : "#1E2D40";
  const glow = isSelected ? `0 0 16px ${map.ambientColor}66` : "none";

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: cardBg,
        border: `2px solid ${borderColor}`,
        boxShadow: justUnlocked ? `0 0 24px ${map.ambientColor}88` : glow,
        opacity: !isUnlocked && !canUnlock ? 0.62 : 1,
      }}
      data-ocid={`game_mode.map_card_${map.theme.toLowerCase()}`}
    >
      {!isUnlocked && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(135deg,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.18) 100%)",
          }}
        />
      )}
      {justUnlocked && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-xl"
          style={{
            background: `radial-gradient(ellipse at center,${map.ambientColor}33 0%,transparent 70%)`,
            animation: "unlock-flash 0.6s ease-out forwards",
          }}
        />
      )}

      <button
        type="button"
        className="relative z-[5] w-full flex items-center gap-3 px-3 py-2.5 text-left"
        onClick={isUnlocked ? onSelect : undefined}
        disabled={!isUnlocked}
        data-ocid={`game_mode.map_${map.theme.toLowerCase()}`}
      >
        <span className="text-2xl leading-none shrink-0">{map.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p
              className="font-display font-black text-xs tracking-wider uppercase leading-none"
              style={{ color: isSelected ? map.ambientColor : "#FFFFFF" }}
            >
              {map.displayName}
            </p>
            {isUnlocked && isPremium && !justUnlocked && (
              <span className="text-xs">⭐</span>
            )}
            {justUnlocked && (
              <span
                className="font-display font-bold uppercase px-1.5 py-0.5 rounded"
                style={{
                  background: "#FFD70033",
                  color: "#FFD700",
                  border: "1px solid #FFD70066",
                  fontSize: "0.55rem",
                }}
              >
                NEW!
              </span>
            )}
          </div>
          <p
            className="text-xs leading-tight"
            style={{ color: "#7A9BB5", fontSize: "0.65rem" }}
          >
            {map.description}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          {isUnlocked ? (
            isSelected ? (
              <span
                className="font-display font-bold text-sm"
                style={{ color: map.ambientColor }}
              >
                ✓
              </span>
            ) : (
              <span
                className="font-display font-bold uppercase px-1.5 py-0.5 rounded-lg"
                style={{
                  background: `${map.ambientColor}22`,
                  color: map.ambientColor,
                  border: `1px solid ${map.ambientColor}44`,
                  fontSize: "0.6rem",
                }}
              >
                {map.trafficDensity}
              </span>
            )
          ) : (
            <div className="flex flex-col items-end gap-0.5">
              <span style={{ fontSize: "1.1rem" }}>🔒</span>
              <span
                className="font-display font-bold"
                style={{ color: "#FFD700", fontSize: "0.6rem" }}
              >
                Lvl {map.unlockLevel}
              </span>
            </div>
          )}
        </div>
      </button>

      {canUnlock && (
        <div
          className="relative z-[15] px-3 pb-2.5"
          style={{ borderTop: `1px solid ${borderColor}44` }}
        >
          <button
            type="button"
            className="w-full py-2 rounded-xl font-display font-black text-xs tracking-wider uppercase active:scale-95 flex items-center justify-center gap-1.5 mt-2"
            style={{
              background: "linear-gradient(135deg,#00D4AA 0%,#00AA88 100%)",
              color: "#0D1B2A",
              boxShadow: "0 0 14px #00D4AA55",
            }}
            onClick={onUnlock}
            data-ocid={`game_mode.unlock_button_${map.theme.toLowerCase()}`}
          >
            🔓 UNLOCK (Level {map.unlockLevel} reached!)
          </button>
        </div>
      )}
      {isPremium && !isUnlocked && !canUnlock && (
        <div
          className="relative z-[15] px-3 pb-1.5 flex items-center justify-center"
          style={{ borderTop: `1px solid ${borderColor}33` }}
        >
          <p
            className="font-display font-bold text-center py-1"
            style={{ color: "#FFFFFF44", fontSize: "0.6rem" }}
          >
            Reach Level {map.unlockLevel} to unlock
          </p>
        </div>
      )}
    </div>
  );
}

export default function GameModeScreen() {
  const navigate = useNavigate();
  const {
    selectedMap,
    selectedGameMode,
    selectedTimedDuration,
    setSelectedMap,
    setSelectedGameMode,
    setSelectedTimedDuration,
    startGame,
    profile,
    unlockMap,
  } = useGameStore();
  const [justUnlockedMap, setJustUnlockedMap] = useState<MapTheme | null>(null);
  const unlockedMaps: MapTheme[] = profile.unlockedMaps ?? [MapTheme.HIGHWAY];

  function handlePlay() {
    startGame();
    navigate({ to: "/game" });
  }

  function handleUnlock(map: MapThemeData) {
    unlockMap(map.theme);
    setJustUnlockedMap(map.theme);
    setSelectedMap(map.theme);
    setTimeout(() => setJustUnlockedMap(null), 2000);
  }

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "#0D1B2A" }}
      data-ocid="game_mode.page"
    >
      <style>{`
        @keyframes start-glow { 0%,100%{box-shadow:0 0 20px #FF6B2B88,0 0 40px #FF6B2B44;} 50%{box-shadow:0 0 36px #FF6B2B,0 0 64px #FF6B2BAA;} }
        .start-glow { animation: start-glow 2s ease-in-out infinite; }
        @keyframes unlock-flash { 0%{opacity:1;} 100%{opacity:0;} }
      `}</style>

      <div
        className="flex items-center justify-between px-5 py-3 border-b shrink-0"
        style={{ borderColor: "#1E2D40", background: "#0A1520" }}
      >
        <button
          type="button"
          className="font-display font-bold text-sm uppercase active:scale-95"
          style={{ color: "#7A9BB5" }}
          onClick={() => navigate({ to: "/menu" })}
          data-ocid="game_mode.back_button"
        >
          ← Back
        </button>
        <h1
          className="font-display font-black text-base tracking-wider uppercase"
          style={{ color: "#FFFFFF" }}
        >
          CHOOSE MODE
        </h1>
        <div
          className="px-2.5 py-1.5 rounded-xl"
          style={{
            background: "rgba(255,107,43,0.12)",
            border: "1px solid rgba(255,107,43,0.3)",
          }}
        >
          <span
            className="font-display font-black text-xs"
            style={{ color: "#FF6B2B" }}
          >
            LVL {profile.level}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
        {/* Game mode */}
        <div>
          <p
            className="font-display font-bold uppercase tracking-widest mb-2"
            style={{ color: "#7A9BB5", fontSize: "0.65rem" }}
          >
            GAME MODE
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 active:scale-95"
              style={{
                background:
                  selectedGameMode === GameMode.SCORE ? "#00D4AA14" : "#131E2E",
                border: `2px solid ${selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#1E2D40"}`,
                boxShadow:
                  selectedGameMode === GameMode.SCORE
                    ? "0 0 12px #00D4AA44"
                    : "none",
              }}
              onClick={() => setSelectedGameMode(GameMode.SCORE)}
              data-ocid="game_mode.mode_score"
            >
              <span className="text-2xl">∞</span>
              <p
                className="font-display font-black text-xs tracking-wider uppercase"
                style={{
                  color:
                    selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#FFFFFF",
                }}
              >
                SCORE
              </p>
              <p
                className="text-center"
                style={{ color: "#7A9BB5", fontSize: "0.6rem" }}
              >
                Endless drive
              </p>
            </button>
            <button
              type="button"
              className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 active:scale-95"
              style={{
                background:
                  selectedGameMode === GameMode.TIMED ? "#FF6B2B14" : "#131E2E",
                border: `2px solid ${selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#1E2D40"}`,
                boxShadow:
                  selectedGameMode === GameMode.TIMED
                    ? "0 0 12px #FF6B2B44"
                    : "none",
              }}
              onClick={() => setSelectedGameMode(GameMode.TIMED)}
              data-ocid="game_mode.mode_timed"
            >
              <span className="text-2xl">⏱</span>
              <p
                className="font-display font-black text-xs tracking-wider uppercase"
                style={{
                  color:
                    selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#FFFFFF",
                }}
              >
                TIMED
              </p>
              <p
                className="text-center"
                style={{ color: "#7A9BB5", fontSize: "0.6rem" }}
              >
                Beat the clock
              </p>
            </button>
          </div>
          {selectedGameMode === GameMode.TIMED && (
            <div className="flex gap-2 mt-2">
              {TIMED_OPTIONS.map(({ mins, label }) => (
                <button
                  type="button"
                  key={mins}
                  className="flex-1 py-2 rounded-xl font-display font-bold text-xs tracking-wider active:scale-95"
                  style={{
                    background:
                      selectedTimedDuration === mins ? "#FF6B2B" : "#131E2E",
                    color:
                      selectedTimedDuration === mins ? "#0D1B2A" : "#7A9BB5",
                    border: `2px solid ${selectedTimedDuration === mins ? "#FF6B2B" : "#1E2D40"}`,
                    boxShadow:
                      selectedTimedDuration === mins
                        ? "0 0 10px #FF6B2B66"
                        : "none",
                  }}
                  onClick={() => setSelectedTimedDuration(mins)}
                  data-ocid={`game_mode.duration_${mins}min`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1">
          <p
            className="font-display font-bold uppercase tracking-widest mb-2"
            style={{ color: "#7A9BB5", fontSize: "0.65rem" }}
          >
            SELECT MAP
          </p>
          <div className="flex flex-col gap-2">
            {MAP_CATALOG.map((map) => {
              const isUnlocked = unlockedMaps.includes(map.theme);
              return (
                <MapCard
                  key={map.theme}
                  map={map}
                  isSelected={selectedMap === map.theme}
                  isUnlocked={isUnlocked}
                  playerLevel={profile.level}
                  justUnlocked={justUnlockedMap === map.theme}
                  onSelect={() => setSelectedMap(map.theme)}
                  onUnlock={() => handleUnlock(map)}
                />
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div
          className="rounded-xl px-3 py-2 flex items-center justify-between shrink-0"
          style={{ background: "#132032", border: "1px solid #1E2D4088" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🏎️</span>
            <span
              className="font-display font-bold text-xs uppercase tracking-wider"
              style={{ color: "#FFFFFF88" }}
            >
              {selectedGameMode === GameMode.SCORE
                ? "Endless Score"
                : `${selectedTimedDuration} Min Race`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">
              {MAP_CATALOG.find((m) => m.theme === selectedMap)?.icon}
            </span>
            <span
              className="font-display font-bold text-xs uppercase"
              style={{ color: "#FFFFFF66" }}
            >
              {MAP_CATALOG.find((m) => m.theme === selectedMap)?.displayName}
            </span>
          </div>
        </div>
      </div>

      <div
        className="px-4 py-3 border-t shrink-0"
        style={{
          borderColor: "#1E2D40",
          background: "#0A1520",
          paddingBottom: "max(12px,env(safe-area-inset-bottom))",
        }}
      >
        <button
          type="button"
          className="start-glow w-full py-4 rounded-2xl font-display font-black text-xl tracking-widest uppercase active:scale-95"
          style={{
            background: "linear-gradient(135deg,#FF6B2B 0%,#FF8C4A 100%)",
            color: "#0D1B2A",
          }}
          onClick={handlePlay}
          data-ocid="game_mode.start_race_button"
        >
          🏁 START RACE
        </button>
      </div>
    </div>
  );
}
