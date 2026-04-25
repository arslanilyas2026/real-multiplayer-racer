import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MAP_CATALOG, type MapThemeData } from "../data/maps";
import { useGameStore } from "../store/gameStore";
import { GameMode, MapTheme } from "../types/game";

// ── Constants ─────────────────────────────────────────────────────────────────

const TIMED_OPTIONS = [
  { mins: 1, label: "1 MIN" },
  { mins: 3, label: "3 MIN" },
  { mins: 5, label: "5 MIN" },
  { mins: 10, label: "10 MIN" },
];

// Card background themes for premium maps
const MAP_CARD_THEMES: Partial<
  Record<MapTheme, { bg: string; border: string; glow: string }>
> = {
  [MapTheme.SUNSET_BOULEVARD]: {
    bg: "linear-gradient(135deg, #2a1200 0%, #3d1800 40%, #1a0800 100%)",
    border: "#FF8C00",
    glow: "#FF8C0044",
  },
  [MapTheme.RAINY_NIGHT_CITY]: {
    bg: "linear-gradient(135deg, #050b18 0%, #0a1224 40%, #060c1a 100%)",
    border: "#4FC3F7",
    glow: "#4FC3F744",
  },
  [MapTheme.MOUNTAIN_PASS]: {
    bg: "linear-gradient(135deg, #0e1410 0%, #182018 40%, #0e1410 100%)",
    border: "#90A0A0",
    glow: "#90A0A044",
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface MapCardProps {
  map: MapThemeData;
  isSelected: boolean;
  isUnlocked: boolean;
  canAfford: boolean;
  totalCoins: number;
  justUnlocked: boolean;
  onSelect: () => void;
  onUnlock: () => void;
}

function MapCard({
  map,
  isSelected,
  isUnlocked,
  canAfford,
  totalCoins,
  justUnlocked,
  onSelect,
  onUnlock,
}: MapCardProps) {
  const isPremium = map.unlockThreshold > 0;
  const theme = MAP_CARD_THEMES[map.theme];
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
  const glow = isSelected ? `0 0 20px ${map.ambientColor}66` : "none";

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-smooth"
      style={{
        background: cardBg,
        border: `2px solid ${borderColor}`,
        boxShadow: justUnlocked
          ? `0 0 32px ${map.ambientColor}88, 0 0 64px ${map.ambientColor}44`
          : glow,
        opacity: !isUnlocked && !canAfford ? 0.62 : 1,
      }}
      data-ocid={`game_mode.map_card_${map.theme.toLowerCase()}`}
    >
      {/* Locked overlay shimmer */}
      {!isUnlocked && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      )}

      {/* Just-unlocked flash */}
      {justUnlocked && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at center, ${map.ambientColor}33 0%, transparent 70%)`,
            animation: "unlock-flash 0.6s ease-out forwards",
          }}
        />
      )}

      {/* Card content */}
      <button
        type="button"
        className="relative z-[5] w-full flex items-start gap-3 px-4 py-4 text-left"
        onClick={isUnlocked ? onSelect : undefined}
        disabled={!isUnlocked}
        data-ocid={`game_mode.map_${map.theme.toLowerCase()}`}
      >
        {/* Icon + Name */}
        <div className="flex flex-col items-center gap-1 shrink-0 w-12 mt-0.5">
          <span className="text-3xl leading-none">{map.icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p
              className="font-display font-black text-sm tracking-wider uppercase leading-none"
              style={{ color: isSelected ? map.ambientColor : "#FFFFFF" }}
            >
              {map.displayName}
            </p>
            {/* Unlocked badge for premium maps */}
            {isUnlocked && isPremium && !justUnlocked && (
              <span className="text-xs" title="Unlocked">
                ⭐
              </span>
            )}
            {justUnlocked && (
              <span
                className="text-xs font-display font-bold uppercase px-1.5 py-0.5 rounded"
                style={{
                  background: "#FFD70033",
                  color: "#FFD700",
                  border: "1px solid #FFD70066",
                }}
              >
                NEW!
              </span>
            )}
          </div>

          <p
            className="text-xs leading-tight mb-2"
            style={{ color: "#7A9BB5" }}
          >
            {map.description}
          </p>

          {/* Traffic density badge */}
          <span
            className="text-xs font-display font-bold uppercase px-2 py-0.5 rounded-lg"
            style={{
              background: `${map.ambientColor}22`,
              color: map.ambientColor,
              border: `1px solid ${map.ambientColor}44`,
            }}
          >
            {map.trafficDensity} traffic
          </span>
        </div>

        {/* Right side: selected indicator for unlocked maps */}
        {isUnlocked && (
          <div className="flex flex-col items-end gap-1 shrink-0 ml-1">
            {isSelected ? (
              <span
                className="font-display font-bold text-xs uppercase"
                style={{ color: map.ambientColor }}
              >
                ✓
              </span>
            ) : (
              <span className="w-4" />
            )}
          </div>
        )}
      </button>

      {/* Lock / Unlock section — shown below the card body */}
      {!isUnlocked && (
        <div
          className="relative z-[15] px-4 pb-4 flex flex-col items-center gap-2"
          style={{ borderTop: `1px solid ${borderColor}44` }}
        >
          <div className="pt-3 flex flex-col items-center gap-1 w-full">
            {canAfford ? (
              /* Gold unlock button */
              <button
                type="button"
                className="w-full py-2.5 rounded-xl font-display font-black text-sm tracking-wider uppercase transition-smooth active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #FFD700 0%, #FF9900 100%)",
                  color: "#0D1B2A",
                  boxShadow: "0 0 20px #FFD70066, 0 4px 12px #FF990044",
                }}
                onClick={onUnlock}
                data-ocid={`game_mode.unlock_button_${map.theme.toLowerCase()}`}
              >
                🔓
                <span>UNLOCK — 🪙 {map.unlockThreshold.toLocaleString()}</span>
              </button>
            ) : (
              /* Lock icon with requirement */
              <div className="flex flex-col items-center gap-1 py-1">
                <span className="text-3xl">🔒</span>
                <p
                  className="font-display font-bold text-xs tracking-wider text-center"
                  style={{ color: "#FFD700" }}
                >
                  🪙 {map.unlockThreshold.toLocaleString()} coins needed
                </p>
                <p
                  className="text-xs text-center"
                  style={{ color: "#FFFFFF88" }}
                >
                  You have:{" "}
                  <span style={{ color: "#FFD700" }}>
                    {totalCoins.toLocaleString()} 🪙
                  </span>{" "}
                  ·{" "}
                  <span style={{ color: "#FF6B6B" }}>
                    need {(map.unlockThreshold - totalCoins).toLocaleString()}{" "}
                    more
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

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
    spendCoins,
    unlockMap,
  } = useGameStore();

  const [justUnlockedMap, setJustUnlockedMap] = useState<MapTheme | null>(null);

  const unlockedMaps: MapTheme[] = profile.unlockedMaps ?? [MapTheme.HIGHWAY];
  const totalCoins = profile.totalCoins;

  function handlePlay() {
    startGame();
    navigate({ to: "/game" });
  }

  function handleUnlock(map: MapThemeData) {
    const success = spendCoins(map.unlockThreshold);
    if (success) {
      unlockMap(map.theme);
      setJustUnlockedMap(map.theme);
      // Auto-select the newly unlocked map
      setSelectedMap(map.theme);
      // Clear the flash after 2 seconds
      setTimeout(() => setJustUnlockedMap(null), 2000);
    }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "#0D1B2A" }}
      data-ocid="game_mode.page"
    >
      <style>{`
        @keyframes start-glow {
          0%, 100% { box-shadow: 0 0 20px #FF6B2B88, 0 0 40px #FF6B2B44, inset 0 1px 0 rgba(255,255,255,0.18); }
          50% { box-shadow: 0 0 36px #FF6B2B, 0 0 64px #FF6B2BAA, inset 0 1px 0 rgba(255,255,255,0.18); }
        }
        .start-glow { animation: start-glow 2s ease-in-out infinite; }

        @keyframes unlock-flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes coin-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .coin-pulse { animation: coin-pulse 1.8s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "#1E2D40", background: "#0A1520" }}
      >
        <button
          type="button"
          className="font-display font-bold text-sm uppercase transition-smooth active:scale-95"
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
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
        {/* Game mode cards */}
        <div>
          <p
            className="font-display font-bold text-xs uppercase tracking-widest mb-3"
            style={{ color: "#7A9BB5" }}
          >
            GAME MODE
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              type="button"
              className="flex flex-col items-center gap-3 rounded-2xl p-5 transition-smooth active:scale-95"
              style={{
                background:
                  selectedGameMode === GameMode.SCORE ? "#00D4AA14" : "#131E2E",
                border: `2px solid ${selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#1E2D40"}`,
                boxShadow:
                  selectedGameMode === GameMode.SCORE
                    ? "0 0 16px #00D4AA44"
                    : "none",
              }}
              onClick={() => setSelectedGameMode(GameMode.SCORE)}
              data-ocid="game_mode.mode_score"
            >
              <span className="text-4xl">∞</span>
              <div className="text-center">
                <p
                  className="font-display font-black text-sm tracking-wider uppercase"
                  style={{
                    color:
                      selectedGameMode === GameMode.SCORE
                        ? "#00D4AA"
                        : "#FFFFFF",
                  }}
                >
                  SCORE
                </p>
                <p
                  className="text-xs mt-1 leading-tight"
                  style={{ color: "#7A9BB5" }}
                >
                  Endless drive — collect coins, avoid crashes
                </p>
              </div>
            </button>

            <button
              type="button"
              className="flex flex-col items-center gap-3 rounded-2xl p-5 transition-smooth active:scale-95"
              style={{
                background:
                  selectedGameMode === GameMode.TIMED ? "#FF6B2B14" : "#131E2E",
                border: `2px solid ${selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#1E2D40"}`,
                boxShadow:
                  selectedGameMode === GameMode.TIMED
                    ? "0 0 16px #FF6B2B44"
                    : "none",
              }}
              onClick={() => setSelectedGameMode(GameMode.TIMED)}
              data-ocid="game_mode.mode_timed"
            >
              <span className="text-4xl">⏱</span>
              <div className="text-center">
                <p
                  className="font-display font-black text-sm tracking-wider uppercase"
                  style={{
                    color:
                      selectedGameMode === GameMode.TIMED
                        ? "#FF6B2B"
                        : "#FFFFFF",
                  }}
                >
                  TIMED
                </p>
                <p
                  className="text-xs mt-1 leading-tight"
                  style={{ color: "#7A9BB5" }}
                >
                  Race against the clock — beat your best
                </p>
              </div>
            </button>
          </div>

          {selectedGameMode === GameMode.TIMED && (
            <div className="flex gap-2">
              {TIMED_OPTIONS.map(({ mins, label }) => (
                <button
                  type="button"
                  key={mins}
                  className="flex-1 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider transition-smooth active:scale-95"
                  style={{
                    background:
                      selectedTimedDuration === mins ? "#FF6B2B" : "#131E2E",
                    color:
                      selectedTimedDuration === mins ? "#0D1B2A" : "#7A9BB5",
                    border: `2px solid ${selectedTimedDuration === mins ? "#FF6B2B" : "#1E2D40"}`,
                    boxShadow:
                      selectedTimedDuration === mins
                        ? "0 0 12px #FF6B2B66"
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

        {/* Map selection */}
        <div>
          {/* Section header with coin balance */}
          <div className="flex items-center justify-between mb-3">
            <p
              className="font-display font-bold text-xs uppercase tracking-widest"
              style={{ color: "#7A9BB5" }}
            >
              SELECT MAP
            </p>
            <div
              className="coin-pulse flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "#FFD70018",
                border: "1px solid #FFD70044",
              }}
              data-ocid="game_mode.coin_balance"
            >
              <span className="text-sm">🪙</span>
              <span
                className="font-display font-bold text-sm tracking-wider"
                style={{ color: "#FFD700" }}
              >
                {totalCoins.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Map cards — 2-column grid */}
          <div className="grid grid-cols-1 gap-3">
            {MAP_CATALOG.map((map) => {
              const isUnlocked = unlockedMaps.includes(map.theme);
              const canAfford =
                !isUnlocked && totalCoins >= map.unlockThreshold;
              return (
                <MapCard
                  key={map.theme}
                  map={map}
                  isSelected={selectedMap === map.theme}
                  isUnlocked={isUnlocked}
                  canAfford={canAfford}
                  totalCoins={totalCoins}
                  justUnlocked={justUnlockedMap === map.theme}
                  onSelect={() => setSelectedMap(map.theme)}
                  onUnlock={() => handleUnlock(map)}
                />
              );
            })}
          </div>

          {/* Unlock progress hint */}
          {(() => {
            const nextLocked = MAP_CATALOG.find(
              (m) => m.unlockThreshold > 0 && !unlockedMaps.includes(m.theme),
            );
            if (!nextLocked) return null;
            const progress = Math.min(
              totalCoins / nextLocked.unlockThreshold,
              1,
            );
            const remaining = Math.max(
              0,
              nextLocked.unlockThreshold - totalCoins,
            );
            return (
              <div
                className="mt-3 rounded-xl px-4 py-3"
                style={{ background: "#132032", border: "1px solid #1E2D4088" }}
                data-ocid="game_mode.unlock_progress"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-display font-bold uppercase"
                    style={{ color: "#7A9BB5" }}
                  >
                    Next unlock: {nextLocked.icon} {nextLocked.displayName}
                  </span>
                  <span
                    className="text-xs font-display font-bold"
                    style={{ color: "#FFD700" }}
                  >
                    {Math.round(progress * 100)}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "#1E2D40" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress * 100}%`,
                      background: `linear-gradient(90deg, #FFD700, ${nextLocked.ambientColor})`,
                    }}
                  />
                </div>
                <p
                  className="text-xs mt-1.5 text-center"
                  style={{ color: "#FFFFFF55" }}
                >
                  Earn {remaining.toLocaleString()} more coins to unlock
                </p>
              </div>
            );
          })()}
        </div>

        {/* Race summary */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center justify-between"
          style={{ background: "#132032", border: "1px solid #1E2D4088" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🏎️</span>
            <span
              className="font-display font-bold text-xs uppercase tracking-wider"
              style={{ color: "#FFFFFF88" }}
            >
              {selectedGameMode === GameMode.SCORE
                ? "Endless Score"
                : `${selectedTimedDuration} Min Race`}
            </span>
          </div>
          <div className="flex items-center gap-2">
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

      {/* Start Race CTA */}
      <div className="px-5 py-5 border-t" style={{ borderColor: "#1E2D40" }}>
        <button
          type="button"
          className="start-glow w-full py-5 rounded-2xl font-display font-black text-2xl tracking-widest uppercase transition-smooth active:scale-95"
          style={{
            background: "linear-gradient(135deg, #FF6B2B 0%, #FF8C4A 100%)",
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
