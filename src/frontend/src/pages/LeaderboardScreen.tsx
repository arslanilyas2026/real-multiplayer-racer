import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  type BackendLeaderboardEntry,
  apiGetLeaderboard,
  apiGetTotalPlayers,
  apiGetTotalRaces,
} from "../lib/api";
import { useGameStore } from "../store/gameStore";

// ── Rank title badge by score ─────────────────────────────────────────────────
function getRankTitle(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 30000)
    return { label: "LEGEND", color: "#FFD700", bg: "#FFD70022" };
  if (score >= 15000)
    return { label: "PRO", color: "#B44FFF", bg: "#B44FFF22" };
  if (score >= 5000)
    return { label: "RACER", color: "#00D4AA", bg: "#00D4AA22" };
  if (score >= 1000)
    return { label: "STREET", color: "#4FC3F7", bg: "#4FC3F722" };
  return { label: "NEWCOMER", color: "#7a8a9a", bg: "#7a8a9a22" };
}

// ── Medal badge for top 3 ─────────────────────────────────────────────────────
const TOP3_META: Record<
  number,
  { gradient: string; glow: string; textColor: string }
> = {
  1: {
    gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    glow: "0 0 18px #FFD70066",
    textColor: "#0D1B2A",
  },
  2: {
    gradient: "linear-gradient(135deg, #C0C0C0, #9e9e9e)",
    glow: "0 0 14px #C0C0C044",
    textColor: "#0D1B2A",
  },
  3: {
    gradient: "linear-gradient(135deg, #CD7F32, #a0522d)",
    glow: "0 0 14px #CD7F3244",
    textColor: "#ffffff",
  },
};

// ── Score row ─────────────────────────────────────────────────────────────────
function ScoreRow({
  entry,
  index,
  isPlayer,
}: {
  entry: BackendLeaderboardEntry;
  index: number;
  isPlayer?: boolean;
}) {
  const rank = Number(entry.rank);
  const isTop3 = rank <= 3;
  const top3Meta = TOP3_META[rank];
  const scoreNum = Number(entry.score);
  const rankTitle = getRankTitle(scoreNum);

  // Avatar color from car type hash
  const avatarColors = [
    "#FF6B2B",
    "#00D4AA",
    "#FFD700",
    "#B44FFF",
    "#4FC3F7",
    "#FF2D78",
    "#69F0AE",
  ];
  const avatarColor =
    avatarColors[entry.playerName.charCodeAt(0) % avatarColors.length];

  return (
    <div
      data-ocid={`leaderboard.item.${index + 1}`}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition-smooth"
      style={{
        background: isPlayer
          ? "linear-gradient(90deg, #FF6B2B22, #FFD70014)"
          : isTop3
            ? `${avatarColor}10`
            : "#111d2e",
        borderColor: isPlayer
          ? "#FF6B2B55"
          : isTop3
            ? `${avatarColor}33`
            : "#1e2d40",
        boxShadow: isTop3
          ? top3Meta.glow
          : isPlayer
            ? "0 0 16px #FF6B2B22"
            : "none",
      }}
    >
      {/* Rank badge */}
      {isTop3 ? (
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full font-display font-black text-base flex-shrink-0"
          style={{
            background: top3Meta.gradient,
            boxShadow: top3Meta.glow,
            color: top3Meta.textColor,
            fontSize: "1.2rem",
          }}
        >
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
        </div>
      ) : (
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl font-display font-black text-sm flex-shrink-0"
          style={{
            background: isPlayer ? "#FF6B2B22" : "#1e2d40",
            color: isPlayer ? "#FF6B2B" : "#556678",
            border: isPlayer ? "1px solid #FF6B2B44" : "none",
          }}
        >
          #{rank}
        </div>
      )}

      {/* Avatar circle */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm flex-shrink-0"
        style={{
          background: `${avatarColor}33`,
          border: `1px solid ${avatarColor}66`,
          color: avatarColor,
        }}
      >
        {entry.playerName.charAt(0).toUpperCase()}
      </div>

      {/* Name + car + rank title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className="font-display font-bold text-sm truncate"
            style={{ color: isTop3 ? "#ffffff" : "#ccddee" }}
          >
            {entry.playerName.length > 12
              ? `${entry.playerName.slice(0, 12)}…`
              : entry.playerName}
          </p>
          {/* Rank title badge */}
          <span
            className="text-xs font-display font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: rankTitle.bg,
              color: rankTitle.color,
              border: `1px solid ${rankTitle.color}44`,
              fontSize: "0.6rem",
              letterSpacing: "0.05em",
            }}
          >
            {rankTitle.label}
          </span>
        </div>
        <p className="text-xs font-mono" style={{ color: "#445566" }}>
          {entry.carType}
        </p>
      </div>

      {/* Score */}
      <div className="text-right flex-shrink-0">
        <p
          className="font-display font-black text-base"
          style={{
            color: isTop3
              ? TOP3_META[rank].textColor === "#0D1B2A"
                ? "#FFD700"
                : "#CD7F32"
              : "#FF6B2B",
          }}
        >
          {scoreNum.toLocaleString()}
        </p>
        <p className="text-xs" style={{ color: "#445566" }}>
          pts
        </p>
      </div>
    </div>
  );
}

// ── Pinned player row ─────────────────────────────────────────────────────────
function PinnedPlayerRow({
  playerName,
  playerScore,
  playerCar,
  playerRank,
}: {
  playerName: string;
  playerScore: number;
  playerCar: string;
  playerRank: number | null;
}) {
  const rankTitle = getRankTitle(playerScore);

  return (
    <div
      className="px-4 pt-2 pb-4 border-t"
      style={{ borderColor: "#1e2d40", background: "#0D1B2A" }}
    >
      <p
        className="text-xs font-display font-bold tracking-widest uppercase mb-2"
        style={{ color: "#FF6B2B88" }}
      >
        YOUR RANK
      </p>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
        style={{
          background: "linear-gradient(90deg, #FF6B2B22, #FFD70014)",
          borderColor: "#FF6B2B55",
          boxShadow: "0 0 20px #FF6B2B22",
        }}
        data-ocid="leaderboard.pinned_player_row"
      >
        {/* Rank badge */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl font-display font-black text-sm flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #FF6B2B, #FFD700)",
            color: "#0D1B2A",
            boxShadow: "0 0 10px #FF6B2B66",
          }}
        >
          {playerRank ? `#${playerRank}` : "?"}
        </div>
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm flex-shrink-0"
          style={{
            background: "#FF6B2B33",
            border: "1px solid #FF6B2B66",
            color: "#FF6B2B",
          }}
        >
          {(playerName || "Y").charAt(0).toUpperCase()}
        </div>
        {/* Name + title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p
              className="font-display font-bold text-sm truncate"
              style={{ color: "#ffffff" }}
            >
              {playerName || "YOU"}
            </p>
            <span
              className="text-xs font-display font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: rankTitle.bg,
                color: rankTitle.color,
                border: `1px solid ${rankTitle.color}44`,
                fontSize: "0.6rem",
              }}
            >
              {rankTitle.label}
            </span>
          </div>
          <p className="text-xs font-mono" style={{ color: "#667788" }}>
            {playerCar}
          </p>
        </div>
        {/* Score + invite */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <p
            className="font-display font-black text-base"
            style={{ color: "#FF6B2B" }}
          >
            {playerScore.toLocaleString()}
          </p>
          <button
            type="button"
            data-ocid="leaderboard.invite_button"
            className="text-xs font-display font-bold px-2 py-0.5 rounded-lg border transition-smooth"
            style={{
              borderColor: "#00D4AA66",
              color: "#00D4AA",
              background: "#00D4AA11",
              letterSpacing: "0.03em",
            }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Real Multiplayer Racer",
                  text: `Challenge me in Real Multiplayer Racer! I'm ranked #${playerRank ?? "?"} 🏎️`,
                });
              }
            }}
          >
            INVITE TO PLAY
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardScreen() {
  const navigate = useNavigate();
  const { profile } = useGameStore();
  const [tab, setTab] = useState<"scores" | "stats">("scores");
  const [entries, setEntries] = useState<BackendLeaderboardEntry[]>([]);
  const [totalPlayers, setTotalPlayers] = useState<bigint>(0n);
  const [totalRaces, setTotalRaces] = useState<bigint>(0n);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [lb, players, races] = await Promise.all([
        apiGetLeaderboard(),
        apiGetTotalPlayers(),
        apiGetTotalRaces(),
      ]);
      setEntries(lb);
      setTotalPlayers(players);
      setTotalRaces(races);
      setLoading(false);
    }
    load();
  }, []);

  // Find the player's rank in the leaderboard (match by "YOU" placeholder)
  const playerEntry = entries.find((e) => e.playerName === "YOU");
  const playerRank = playerEntry ? Number(playerEntry.rank) : null;

  const statItems = [
    {
      label: "Total Races",
      value: profile.totalRaces.toLocaleString(),
      icon: "🏎️",
      color: "#fff",
    },
    {
      label: "Best Score",
      value: profile.highScore.toLocaleString(),
      icon: "🔥",
      color: "#FF6B2B",
    },
    {
      label: "Total Coins",
      value: profile.totalCoins.toLocaleString(),
      icon: "🪙",
      color: "#FFD700",
    },
    {
      label: "Level",
      value: `LVL ${profile.level}`,
      icon: "⭐",
      color: "#B44FFF",
    },
    {
      label: "Current Car",
      value: profile.selectedCar,
      icon: "🚗",
      color: "#00D4AA",
    },
    {
      label: "Cars Unlocked",
      value: `${profile.unlockedCars.length} / 7`,
      icon: "🔓",
      color: "#4FC3F7",
    },
    {
      label: "Global Players",
      value: totalPlayers.toLocaleString(),
      icon: "🌍",
      color: "#00D4AA",
    },
    {
      label: "Total Races (Global)",
      value: totalRaces.toLocaleString(),
      icon: "🏁",
      color: "#FF6B2B",
    },
  ];

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "#0D1B2A" }}
      data-ocid="leaderboard.page"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
        style={{ background: "#111d2e", borderColor: "#1e2d40" }}
      >
        <button
          type="button"
          data-ocid="leaderboard.back_button"
          onClick={() => navigate({ to: "/menu" })}
          className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg transition-smooth"
          style={{ color: "#7a9bb5" }}
          aria-label="Back"
        >
          ←
        </button>
        <h1
          className="font-display font-black text-lg tracking-widest uppercase"
          style={{ color: "#FFD700", textShadow: "0 0 16px #FFD70066" }}
        >
          🏆 LEADERBOARD
        </h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div
        className="flex border-b flex-shrink-0"
        style={{ background: "#111d2e", borderColor: "#1e2d40" }}
      >
        {(["scores", "stats"] as const).map((t) => (
          <button
            key={t}
            type="button"
            data-ocid={`leaderboard.${t}_tab`}
            onClick={() => setTab(t)}
            className="flex-1 py-3 font-display font-bold text-sm tracking-widest uppercase relative transition-smooth"
            style={{ color: tab === t ? "#00D4AA" : "#556678" }}
          >
            {t === "scores" ? "HIGH SCORES" : "MY STATS"}
            {tab === t && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "#00D4AA", boxShadow: "0 0 8px #00D4AA" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content — scrollable, leaves room for pinned row */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {tab === "scores" && (
          <div
            data-ocid="leaderboard.scores_list"
            className="flex flex-col gap-2"
          >
            {loading ? (
              <div
                data-ocid="leaderboard.loading_state"
                className="flex flex-col gap-2"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`skel-${i + 1}`}
                    className="h-16 rounded-2xl animate-pulse"
                    style={{ background: "#1e2d40" }}
                  />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div
                data-ocid="leaderboard.empty_state"
                className="flex flex-col items-center gap-4 py-16"
              >
                <span className="text-5xl">🏁</span>
                <p className="text-muted-foreground font-body text-center text-sm">
                  No races recorded yet.
                  <br />
                  Be the first on the board!
                </p>
              </div>
            ) : (
              entries.map((e, i) => (
                <ScoreRow
                  key={e.playerName}
                  entry={e}
                  index={i}
                  isPlayer={e.playerName === "YOU"}
                />
              ))
            )}
          </div>
        )}

        {tab === "stats" && (
          <div
            data-ocid="leaderboard.stats_panel"
            className="flex flex-col gap-3"
          >
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "#1e2d40" }}
            >
              {statItems.map(({ label, value, icon, color }, i) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-3 border-b last:border-0"
                  style={{
                    background: i % 2 === 0 ? "#111d2e" : "#0d1826",
                    borderColor: "#1e2d40",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span className="text-muted-foreground text-sm font-body">
                      {label}
                    </span>
                  </div>
                  <span
                    className="font-display font-bold text-sm"
                    style={{ color }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* XP bar */}
            <div
              className="rounded-2xl p-4 border"
              style={{ background: "#111d2e", borderColor: "#B44FFF44" }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-display font-bold text-sm text-foreground">
                  XP Progress
                </span>
                <span className="text-muted-foreground text-sm">
                  {profile.xp % 1000} / 1000
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full overflow-hidden"
                style={{ background: "#1e2d40" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(profile.xp % 1000) / 10}%`,
                    background: "linear-gradient(90deg, #B44FFF, #00D4AA)",
                    boxShadow: "0 0 10px #B44FFF88",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right mt-1">
                Level {profile.level} → {profile.level + 1}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pinned player row — always visible above footer */}
      {tab === "scores" && (
        <PinnedPlayerRow
          playerName="YOU"
          playerScore={profile.highScore}
          playerCar={profile.selectedCar}
          playerRank={playerRank}
        />
      )}

      {/* Footer nav */}
      <div className="px-4 pb-4 border-t" style={{ borderColor: "#1e2d40" }}>
        <button
          type="button"
          data-ocid="leaderboard.back_to_menu_button"
          onClick={() => navigate({ to: "/menu" })}
          className="w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth"
          style={{
            background: "transparent",
            borderColor: "#FFD70066",
            color: "#FFD700",
          }}
        >
          ← BACK TO MENU
        </button>
      </div>
    </div>
  );
}
