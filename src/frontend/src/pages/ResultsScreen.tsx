import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AI_PERSONALITIES } from "../data/aiOpponents";
import { apiSubmitRaceResult } from "../lib/api";
import { useGameStore } from "../store/gameStore";
import {
  type AIDifficulty,
  type AIName,
  type AIRaceResult,
  CarType,
} from "../types/game";

// ── Car emoji lookup ──────────────────────────────────────────────────────────
const CAR_EMOJI: Record<CarType, string> = {
  [CarType.BASIC]: "🚗",
  [CarType.SPORT]: "🏎️",
  [CarType.STREET]: "🚙",
  [CarType.JET]: "✈️",
  [CarType.RACE]: "🏁",
  [CarType.SUPER]: "🚀",
  [CarType.HYPER]: "⚡",
  [CarType.LIGHTNING]: "🌩️",
};

// ── Difficulty badge colors ───────────────────────────────────────────────────
const DIFFICULTY_COLORS: Record<AIDifficulty, string> = {
  ROOKIE: "#00D4AA",
  RACER: "#FFD700",
  PRO: "#FF6B2B",
  ELITE: "#B44FFF",
  LEGEND: "#FF2D78",
};

// ── Tubik-style radial burst for WIN ─────────────────────────────────────────
function WinBurst() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, #FFD70055 0%, #FF6B2B33 35%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Conic starburst rays */}
      <div
        className="absolute"
        style={{
          width: 340,
          height: 340,
          background:
            "conic-gradient(from 0deg, transparent 0deg, #FFD70018 10deg, transparent 20deg, transparent 30deg, #FF6B2B15 40deg, transparent 50deg, transparent 60deg, #FFD70018 70deg, transparent 80deg, transparent 90deg, #FF6B2B15 100deg, transparent 110deg, transparent 120deg, #FFD70018 130deg, transparent 140deg, transparent 150deg, #FF6B2B15 160deg, transparent 170deg, transparent 180deg, #FFD70018 190deg, transparent 200deg, transparent 210deg, #FF6B2B15 220deg, transparent 230deg, transparent 240deg, #FFD70018 250deg, transparent 260deg, transparent 270deg, #FF6B2B15 280deg, transparent 290deg, transparent 300deg, #FFD70018 310deg, transparent 320deg, transparent 330deg, #FF6B2B15 340deg, transparent 350deg, transparent 360deg)",
          borderRadius: "50%",
          animation: "burst-spin 12s linear infinite",
        }}
      />
      {/* Sharp rays layer */}
      <div
        className="absolute"
        style={{
          width: 280,
          height: 280,
          background:
            "conic-gradient(from 15deg, transparent 0deg, #FFD70022 6deg, transparent 12deg, transparent 42deg, #FFD70022 48deg, transparent 54deg, transparent 84deg, #FFD70022 90deg, transparent 96deg, transparent 126deg, #FFD70022 132deg, transparent 138deg, transparent 168deg, #FFD70022 174deg, transparent 180deg, transparent 210deg, #FFD70022 216deg, transparent 222deg, transparent 252deg, #FFD70022 258deg, transparent 264deg, transparent 294deg, #FFD70022 300deg, transparent 306deg, transparent 336deg, #FFD70022 342deg, transparent 348deg)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

// ── Race participant list row (Tubik-style) ────────────────────────────────────
function RaceParticipantList({
  playerName,
  playerWon,
  playerScore,
  xpGained,
  aiName,
  aiGlowColor,
  aiScore,
  carEmoji,
}: {
  playerName: string;
  playerWon: boolean;
  playerScore: number;
  xpGained: number;
  aiName: string;
  aiGlowColor: string;
  aiScore: number;
  carEmoji: string;
}) {
  const [rank1, rank2] = playerWon
    ? (["1st", "2nd"] as const)
    : (["2nd", "1st"] as const);

  return (
    <div
      className="mx-4 mb-4 rounded-2xl overflow-hidden border"
      style={{ borderColor: "#1e2d40", background: "#0e1a28" }}
    >
      {/* Player row — highlighted */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: playerWon
            ? "linear-gradient(90deg, #FF6B2B22, #FFD70014)"
            : "#111d2e",
          borderBottom: "1px solid #1e2d40",
        }}
        data-ocid="results.player_row"
      >
        {/* Rank badge */}
        <div
          className="w-9 h-9 flex items-center justify-center rounded-xl font-display font-black text-sm flex-shrink-0"
          style={{
            background: playerWon
              ? "linear-gradient(135deg, #FFD700, #FF6B2B)"
              : "#1e2d40",
            color: playerWon ? "#0D1B2A" : "#556678",
            boxShadow: playerWon ? "0 0 12px #FFD70066" : "none",
          }}
        >
          {rank1}
        </div>
        {/* Avatar circle */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-black flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #FF6B2B, #FFD700)",
            color: "#0D1B2A",
          }}
        >
          {(playerName || "Y").charAt(0).toUpperCase()}
        </div>
        {/* Name + XP */}
        <div className="flex-1 min-w-0">
          <p
            className="font-display font-bold text-sm truncate"
            style={{ color: "#ffffff" }}
          >
            {playerName || "YOU"}
          </p>
          <p
            className="text-xs font-display font-bold"
            style={{ color: "#00D4AA" }}
          >
            +{xpGained} XP
          </p>
        </div>
        {/* Score */}
        <div className="text-right flex-shrink-0">
          <p
            className="font-display font-black text-base"
            style={{ color: "#FF6B2B" }}
          >
            {playerScore.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: "#667788" }}>
            pts
          </p>
        </div>
      </div>

      {/* AI row */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#0e1a28" }}
        data-ocid="results.ai_row"
      >
        {/* Rank badge */}
        <div
          className="w-9 h-9 flex items-center justify-center rounded-xl font-display font-black text-sm flex-shrink-0"
          style={{ background: "#1e2d40", color: "#556678" }}
        >
          {rank2}
        </div>
        {/* AI icon */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
          style={{
            background: `${aiGlowColor}22`,
            border: `1px solid ${aiGlowColor}55`,
          }}
        >
          {carEmoji}
        </div>
        {/* Name */}
        <div className="flex-1 min-w-0">
          <p
            className="font-display font-bold text-sm truncate"
            style={{
              color: aiGlowColor,
              textShadow: `0 0 8px ${aiGlowColor}66`,
            }}
          >
            {aiName}
          </p>
          <p className="text-xs" style={{ color: "#445566" }}>
            AI Opponent
          </p>
        </div>
        {/* Score */}
        <div className="text-right flex-shrink-0">
          <p
            className="font-display font-black text-base"
            style={{ color: aiGlowColor }}
          >
            {aiScore.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: "#445566" }}>
            pts
          </p>
        </div>
      </div>
    </div>
  );
}

// ── AI Race Rival Section ─────────────────────────────────────────────────────
function AIRivalSection({
  aiRaceResult,
  playerScore,
  xpGained,
}: {
  aiRaceResult: AIRaceResult;
  playerScore: number;
  xpGained: number;
}) {
  const {
    playerWon,
    aiName,
    aiCarType,
    aiDifficulty,
    aiScore,
    positionSwaps,
    finalMargin,
  } = aiRaceResult;
  const personality = AI_PERSONALITIES[aiName as AIName];
  const aiGlowColor = personality?.glowColor ?? "#FF6B2B";
  const diffColor = DIFFICULTY_COLORS[aiDifficulty];
  const carEmoji = CAR_EMOJI[aiCarType] ?? "🚗";

  return (
    <div data-ocid="results.ai_rival_section">
      {/* WIN / LOSE header with burst */}
      <div className="relative flex flex-col items-center py-6 mb-2 overflow-hidden">
        {playerWon && <WinBurst />}
        <div className="relative z-10 text-center">
          {playerWon ? (
            <>
              <p
                className="font-display font-black tracking-widest uppercase"
                style={{
                  fontSize: "clamp(2rem, 10vw, 3rem)",
                  color: "#FFD700",
                  textShadow:
                    "0 0 30px #FFD700, 0 0 60px #FFD70088, 0 0 100px #FF6B2B44",
                  animation:
                    "win-bounce 0.6s cubic-bezier(0.36,0.07,0.19,0.97) both",
                }}
              >
                🏆 YOU WIN!
              </p>
              <p
                className="font-body text-sm mt-1"
                style={{ color: "#FFD700AA" }}
              >
                You outscored {aiName}!
              </p>
            </>
          ) : (
            <>
              <p
                className="font-display font-black text-3xl tracking-widest uppercase"
                style={{ color: "#ffffff", textShadow: "0 0 20px #ffffff44" }}
              >
                BETTER LUCK NEXT TIME
              </p>
              <p
                className="font-body text-sm mt-1"
                style={{ color: `${aiGlowColor}BB` }}
              >
                {aiName} wins this round
              </p>
            </>
          )}
        </div>
      </div>

      {/* Participant list */}
      <RaceParticipantList
        playerName="YOU"
        playerWon={playerWon}
        playerScore={playerScore}
        xpGained={xpGained}
        aiName={aiName}
        aiGlowColor={aiGlowColor}
        aiScore={aiScore}
        carEmoji={carEmoji}
      />

      {/* Race stats */}
      <div className="mx-4 mb-4 flex flex-wrap gap-2">
        <span
          className="text-xs font-body px-3 py-1 rounded-full"
          style={{ background: "#1e2d40", color: "#8899aa" }}
        >
          🔄 Lead changed {positionSwaps}{" "}
          {positionSwaps === 1 ? "time" : "times"}
        </span>
        <span
          className="text-xs font-body px-3 py-1 rounded-full"
          style={{ background: "#1e2d40", color: "#8899aa" }}
        >
          📏 Margin: {finalMargin.toLocaleString()}
        </span>
        <span
          className="text-xs font-body px-3 py-1 rounded-full"
          style={{
            background: `${diffColor}18`,
            border: `1px solid ${diffColor}44`,
            color: diffColor,
          }}
        >
          🎯 {aiDifficulty}
        </span>
      </div>
    </div>
  );
}

const PARTICLE_COLORS = ["#FF6B2B", "#00D4AA", "#FFD700", "#B44FFF", "#4FC3F7"];

function ConfettiParticle({ index }: { index: number }) {
  const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];
  const left = `${(index * 7 + 3) % 100}%`;
  const size = index % 3 === 0 ? 8 : 5;
  const delay = `${(index * 0.15) % 2}s`;
  const dur = `${1.4 + (index % 4) * 0.3}s`;

  return (
    <span
      className="absolute top-0 rounded-sm animate-bounce"
      style={{
        left,
        width: size,
        height: size,
        background: color,
        animationDelay: delay,
        animationDuration: dur,
        opacity: 0.75,
        transform: `rotate(${index * 23}deg)`,
      }}
    />
  );
}

// ── Star rating ───────────────────────────────────────────────────────────────
function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className="text-4xl select-none"
          style={{
            opacity: n <= stars ? 1 : 0.2,
            filter: n <= stars ? "drop-shadow(0 0 10px #FFD700)" : "none",
            transform: n <= stars ? "scale(1.15)" : "scale(0.85)",
            transition: "all 0.3s ease",
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

// ── Animated XP bar ───────────────────────────────────────────────────────────
function XPBar({
  xpGained,
  currentXP,
}: { xpGained: number; currentXP: number }) {
  const [barWidth, setBarWidth] = useState(0);
  const targetPct = Math.min(100, (currentXP % 1000) / 10);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(targetPct), 500);
    return () => clearTimeout(t);
  }, [targetPct]);

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{ background: "#111d2e", borderColor: "#B44FFF55" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-sm text-foreground">
          XP GAINED
        </span>
        <span
          className="font-display font-bold text-base"
          style={{ color: "#B44FFF" }}
        >
          +{xpGained} XP
        </span>
      </div>
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: "#1e2d40" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${barWidth}%`,
            background: "linear-gradient(90deg, #B44FFF, #00D4AA)",
            boxShadow: "0 0 10px #B44FFF88",
            transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-right mt-1">
        {currentXP % 1000} / 1000 — Level {Math.floor(currentXP / 1000) + 1}
      </p>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function ResultsScreen() {
  const navigate = useNavigate();
  const { gameState, profile, startGame } = useGameStore();
  const aiRaceResult = useGameStore((s) => s.aiRaceResult);
  const submitted = useRef(false);

  const score = gameState.score;
  const coins = gameState.coins;
  const distanceKm = (gameState.distance / 1000).toFixed(2);
  const duration =
    gameState.gameMode === "TIMED"
      ? gameState.timedDuration * 60 - gameState.timeLeft
      : gameState.distance > 0
        ? Math.floor(gameState.distance / 5)
        : 0;

  const stars = score >= 50000 ? 3 : score >= 15000 ? 2 : 1;
  const xpGained = Math.floor(score / 10);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const snapshotRef = useRef({
    score,
    coins,
    distance: gameState.distance,
    duration,
    carType: gameState.carType,
    mapTheme: gameState.mapTheme,
    gameMode: gameState.gameMode,
  });
  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;
    const s = snapshotRef.current;
    apiSubmitRaceResult({
      score: BigInt(s.score),
      coins: BigInt(s.coins),
      distance: BigInt(Math.round(s.distance)),
      duration: BigInt(Math.round(s.duration)),
      carType: s.carType,
      mapTheme: s.mapTheme,
      gameMode: s.gameMode,
    });
  }, []);

  function handleRaceAgain() {
    startGame();
    navigate({ to: "/game-mode" });
  }

  const stats = [
    {
      label: "SCORE",
      value: score.toLocaleString(),
      color: "#FF6B2B",
      icon: "🔥",
      large: true,
    },
    {
      label: "COINS",
      value: coins.toLocaleString(),
      color: "#FFD700",
      icon: "🪙",
    },
    {
      label: "DISTANCE",
      value: `${distanceKm} km`,
      color: "#00D4AA",
      icon: "📍",
    },
    { label: "TIME", value: formatTime(duration), color: "#4FC3F7", icon: "⏱️" },
    { label: "CAR", value: gameState.carType, color: "#B44FFF", icon: "🚗" },
    { label: "MAP", value: gameState.mapTheme, color: "#69F0AE", icon: "🗺️" },
  ];

  return (
    <div
      className="fixed inset-0 flex flex-col relative overflow-hidden"
      style={{ background: "#0D1B2A" }}
      data-ocid="results.page"
    >
      <style>{`
        @keyframes win-bounce {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.12); }
          80% { transform: scale(0.96); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes burst-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <ConfettiParticle key={`confetti-${i + 1}`} index={i} />
        ))}
      </div>

      <div className="relative flex-1 overflow-y-auto flex flex-col">
        {/* Title — only shown when no AI result (solo race) */}
        {!aiRaceResult && (
          <div className="text-center pt-10 pb-2 px-4">
            <h1
              className="font-display font-black text-3xl tracking-wider uppercase"
              style={{
                color: "#FF6B2B",
                textShadow: "0 0 24px #FF6B2B88, 0 0 48px #FF6B2B44",
              }}
            >
              RACE COMPLETE!
            </h1>
            <p className="text-muted-foreground text-sm font-body mt-1">
              {gameState.gameMode === "TIMED" ? "Timed Mode" : "Score Mode"} ·{" "}
              {gameState.mapTheme}
            </p>
            <StarRating stars={stars} />
          </div>
        )}

        {/* AI Rival Section (with Tubik-style burst + participant list) */}
        {aiRaceResult && (
          <>
            <div className="text-center pt-6 pb-0 px-4">
              <p className="text-muted-foreground text-sm font-body">
                {gameState.gameMode === "TIMED" ? "Timed Mode" : "Score Mode"} ·{" "}
                {gameState.mapTheme}
              </p>
              <StarRating stars={stars} />
            </div>
            <AIRivalSection
              aiRaceResult={aiRaceResult}
              playerScore={score}
              xpGained={xpGained}
            />
          </>
        )}

        {/* Score card */}
        <div
          className="mx-4 rounded-2xl border p-5 flex flex-col gap-3 mb-4"
          style={{
            background: "#111d2e",
            borderColor: "#FF6B2B44",
            boxShadow: "0 0 24px #FF6B2B22",
          }}
        >
          {stats.map(({ label, value, color, icon, large }) => (
            <div
              key={label}
              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              style={{ borderColor: "#1e2d40" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{icon}</span>
                <span className="text-muted-foreground text-sm font-body">
                  {label}
                </span>
              </div>
              <span
                className="font-display font-black"
                style={{
                  color,
                  fontSize: large ? "1.6rem" : "1rem",
                  textShadow: large ? `0 0 14px ${color}88` : "none",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* XP bar */}
        <div className="mx-4 mb-4">
          <XPBar xpGained={xpGained} currentXP={profile.xp} />
        </div>

        {/* Action buttons */}
        <div className="mx-4 mb-4 flex flex-col gap-3">
          <button
            type="button"
            data-ocid="results.race_again_button"
            onClick={handleRaceAgain}
            className="w-full py-4 rounded-2xl font-display font-black text-base tracking-widest uppercase transition-smooth"
            style={{
              background: "linear-gradient(135deg, #FF6B2B, #FF8C4A)",
              color: "#0D1B2A",
              boxShadow: "0 0 24px #FF6B2B66, 0 4px 16px #FF6B2B44",
            }}
          >
            🏎️ RACE AGAIN
          </button>

          <button
            type="button"
            data-ocid="results.share_button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Lane Racer: Car Racing Clash",
                  text: `I scored ${score.toLocaleString()} pts in Lane Racer: Car Racing Clash! 🏎️🔥`,
                });
              }
            }}
            className="w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth"
            style={{
              background: "transparent",
              borderColor: "#ffffff44",
              color: "#ffffff",
            }}
          >
            📤 SHARE RESULT
          </button>

          <button
            type="button"
            data-ocid="results.change_car_button"
            onClick={() => navigate({ to: "/car-select" })}
            className="w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth"
            style={{
              background: "#00D4AA22",
              borderColor: "#00D4AA66",
              color: "#00D4AA",
            }}
          >
            🚗 CHANGE CAR
          </button>

          <button
            type="button"
            data-ocid="results.leaderboard_button"
            onClick={() => navigate({ to: "/leaderboard" })}
            className="w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth"
            style={{
              background: "#FFD70011",
              borderColor: "#FFD70044",
              color: "#FFD700",
            }}
          >
            🏆 LEADERBOARD
          </button>

          <button
            type="button"
            data-ocid="results.main_menu_button"
            onClick={() => navigate({ to: "/menu" })}
            className="w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth"
            style={{
              background: "transparent",
              borderColor: "#445566",
              color: "#667788",
            }}
          >
            ← MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
}
