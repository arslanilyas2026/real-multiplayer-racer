import { useNavigate } from "@tanstack/react-router";
import { POWER_UP_CATALOG } from "../data/powerups";
import { useGameStore } from "../store/gameStore";
import type { PowerUpType } from "../types/game";

const MAX_LEVEL = 5;

function PowerUpCard({ type }: { type: PowerUpType }) {
  const { profile, spendCoins, upgradePowerUp } = useGameStore();
  const data = POWER_UP_CATALOG.find((p) => p.type === type)!;
  const currentLevel = profile.powerUpLevels[type] ?? 0;
  const isMaxed = currentLevel >= MAX_LEVEL;
  const costIndex = Math.min(currentLevel, data.upgradeCost.length - 1);
  const cost = isMaxed ? 0 : data.upgradeCost[costIndex];
  const canAfford = profile.totalCoins >= cost;

  function handleUpgrade() {
    if (isMaxed || !canAfford) return;
    const spent = spendCoins(cost);
    if (spent) upgradePowerUp(type);
  }

  return (
    <div
      data-ocid={`upgrade.card.${type.toLowerCase()}`}
      className="relative rounded-2xl p-4 flex flex-col gap-3 border"
      style={{ background: `${data.color}18`, borderColor: `${data.color}44` }}
    >
      {/* Icon + Name row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: `${data.color}22`,
              boxShadow: `0 0 12px ${data.color}55`,
            }}
          >
            {data.icon}
          </div>
          <div>
            <p className="font-display font-bold text-foreground text-sm leading-tight">
              {data.displayName}
            </p>
            <span
              className="text-xs font-bold font-display tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: `${data.color}33`, color: data.color }}
            >
              {isMaxed ? "✓ MAXED" : `LVL ${currentLevel} / ${MAX_LEVEL}`}
            </span>
          </div>
        </div>

        {!isMaxed ? (
          <button
            type="button"
            data-ocid={`upgrade.upgrade_button.${type.toLowerCase()}`}
            onClick={handleUpgrade}
            disabled={!canAfford}
            className="flex items-center gap-1 px-3 py-2 rounded-xl font-display font-bold text-xs transition-smooth disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            style={{
              background: canAfford ? data.color : "#1e2d40",
              color: canAfford ? "#0D1B2A" : "#4a6080",
              boxShadow: canAfford ? `0 0 12px ${data.color}66` : "none",
            }}
          >
            🪙 {cost.toLocaleString()}
          </button>
        ) : (
          <span
            className="px-3 py-2 rounded-xl text-xs font-display font-bold flex-shrink-0"
            style={{ background: `${data.color}44`, color: data.color }}
          >
            MAX
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs leading-snug font-body">
        {data.description}
      </p>

      {/* Progress pips */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].slice(0, MAX_LEVEL).map((pip) => (
          <div
            key={`${type}-pip-${pip}`}
            className="h-2 rounded-full flex-1 transition-smooth"
            style={{
              background: pip <= currentLevel ? data.color : `${data.color}22`,
              boxShadow:
                pip <= currentLevel ? `0 0 6px ${data.color}88` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function UpgradesScreen() {
  const navigate = useNavigate();
  const { profile } = useGameStore();

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "#0D1B2A" }}
      data-ocid="upgrades.page"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ background: "#111d2e", borderColor: "#1e2d40" }}
      >
        <button
          type="button"
          data-ocid="upgrades.back_button"
          onClick={() => navigate({ to: "/menu" })}
          className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg transition-smooth"
          style={{ color: "#7a9bb5" }}
          aria-label="Back"
        >
          ←
        </button>
        <h1
          className="font-display font-black text-lg tracking-widest uppercase"
          style={{ color: "#FF6B2B", textShadow: "0 0 16px #FF6B2B66" }}
        >
          ⚡ UPGRADES
        </h1>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
          style={{ background: "#FFD70022", borderColor: "#FFD70055" }}
        >
          <span>🪙</span>
          <span
            className="font-display font-bold text-sm"
            style={{ color: "#FFD700" }}
          >
            {profile.totalCoins.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-muted-foreground text-xs font-body text-center px-4 pt-4 pb-2">
        Upgrade power-ups with coins to gain the edge in every race
      </p>

      {/* Cards */}
      <div
        data-ocid="upgrades.list"
        className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3 mt-2"
      >
        {POWER_UP_CATALOG.map((pu) => (
          <PowerUpCard key={pu.type} type={pu.type} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "#1e2d40" }}>
        <button
          type="button"
          data-ocid="upgrades.back_to_menu_button"
          onClick={() => navigate({ to: "/menu" })}
          className="w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth"
          style={{
            background: "transparent",
            borderColor: "#FF6B2B66",
            color: "#FF6B2B",
          }}
        >
          ← BACK TO MENU
        </button>
      </div>
    </div>
  );
}
