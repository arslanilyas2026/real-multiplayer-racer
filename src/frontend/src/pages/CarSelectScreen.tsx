import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CAR_CATALOG } from "../data/cars";
import { useGameStore } from "../store/gameStore";
import { CarColor, type CarType } from "../types/game";

// ── Car visual config ─────────────────────────────────────────────────────────

const CAR_EMOJIS: Record<string, string> = {
  BASIC: "🚗",
  SPORT: "🏎️",
  STREET: "🚙",
  JET: "✈️",
  RACE: "🏁",
  HYPER: "⚡",
  LIGHTNING: "🌩️",
};

// Each car has a unique accent neon color for its stat bars & glow
const CAR_ACCENT: Record<string, string> = {
  BASIC: "#00D4AA",
  SPORT: "#FF6B2B",
  STREET: "#B44FFF",
  JET: "#00BFFF",
  RACE: "#FF3EA5",
  HYPER: "#FFD700",
  LIGHTNING: "#7DF9FF",
};

const NEON_COLORS: { value: CarColor; label: string; hex: string }[] = [
  { value: CarColor.NEON_ORANGE, label: "Blaze", hex: "#FF6B2B" },
  { value: CarColor.NEON_CYAN, label: "Teal", hex: "#00D4AA" },
  { value: CarColor.NEON_PURPLE, label: "Volt", hex: "#B44FFF" },
  { value: CarColor.NEON_YELLOW, label: "Gold", hex: "#FFD700" },
];

const STAT_COLORS = ["#FF6B2B", "#00D4AA", "#B44FFF"];
const STAT_LABELS = ["SPEED", "HANDLING", "ACCELERATION"];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatBar({
  label,
  value,
  color,
  max = 10,
}: {
  label: string;
  value: number;
  color: string;
  max?: number;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-display font-bold tracking-widest uppercase w-28 shrink-0"
        style={{ color: "#7A9BB5" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
      <span
        className="text-sm font-display font-black w-6 text-right shrink-0"
        style={{ color }}
      >
        {value * 10}
      </span>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function CarSelectScreen() {
  const navigate = useNavigate();
  const { profile, selectCar, selectColor, spendCoins, unlockCar } =
    useGameStore();

  // Find initial index based on equipped car
  const initialIdx = CAR_CATALOG.findIndex(
    (c) => c.type === profile.selectedCar,
  );
  const [carIdx, setCarIdx] = useState(initialIdx >= 0 ? initialIdx : 0);
  const [shaking, setShaking] = useState(false);
  const [insufficientCoins, setInsufficientCoins] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const car = CAR_CATALOG[carIdx];
  const accentColor = CAR_ACCENT[car.type] ?? "#00D4AA";
  const isUnlocked = profile.unlockedCars.includes(car.type as CarType);
  const isEquipped = profile.selectedCar === car.type;
  const totalCars = CAR_CATALOG.length;

  function navigate_car(dir: "prev" | "next") {
    const newIdx =
      dir === "next"
        ? (carIdx + 1) % totalCars
        : (carIdx - 1 + totalCars) % totalCars;
    setSlideDir(dir === "next" ? "left" : "right");
    setAnimKey((k) => k + 1);
    setCarIdx(newIdx);
  }

  function handleUnlock() {
    if (isUnlocked) return;
    if (!spendCoins(car.unlockCost)) {
      setShaking(true);
      setInsufficientCoins(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setInsufficientCoins(false), 1500);
      return;
    }
    unlockCar(car.type as CarType);
    selectCar(car.type as CarType);
  }

  function handleConfirm() {
    if (isUnlocked) {
      selectCar(car.type as CarType);
      navigate({ to: "/menu" });
    } else {
      handleUnlock();
    }
  }

  // Button style based on state
  const btnStyle: React.CSSProperties = isEquipped
    ? {
        background: "linear-gradient(135deg, #00D4AA, #00AA88)",
        color: "#0D1B2A",
        boxShadow: "0 0 28px #00D4AA66, 0 4px 16px #00000088",
      }
    : isUnlocked
      ? {
          background: "linear-gradient(135deg, #FF6B2B, #FF9F1C)",
          color: "#0D1B2A",
          boxShadow: "0 0 28px #FF6B2B66, 0 4px 16px #00000088",
        }
      : {
          background: "linear-gradient(135deg, #1A2740, #1F3050)",
          color: "#4A6A8A",
          boxShadow: "none",
          border: "1.5px solid #243050",
        };

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: "#0D1B2A" }}
      data-ocid="car_select.page"
    >
      {/* Diagonal stripe texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 28px)",
          zIndex: 0,
        }}
      />

      {/* Radial glow behind car area */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500"
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
          zIndex: 0,
          top: "60px",
        }}
      />

      <style>{`
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(60px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-60px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%  { transform: translateX(-10px); }
          30%  { transform: translateX(10px); }
          50%  { transform: translateX(-7px); }
          70%  { transform: translateX(7px); }
          90%  { transform: translateX(-3px); }
        }
        @keyframes badge-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.12); }
          100% { transform: scale(1); opacity: 1; }
        }
        .car-enter-left  { animation: slide-left  0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .car-enter-right { animation: slide-right 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .shake-anim      { animation: shake 0.45s cubic-bezier(0.36,0.07,0.19,0.97); }
        .badge-pop       { animation: badge-pop 0.3s cubic-bezier(0.22,1,0.36,1) both; }
        .arrow-btn:active { transform: scale(0.88); }
      `}</style>

      {/* ── TOP NAV BAR ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-5 py-4 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(10,15,26,0.7)",
        }}
      >
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-xl font-display font-bold text-sm uppercase tracking-wider active:scale-95 transition-smooth"
          style={{
            color: "#7A9BB5",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onClick={() => navigate({ to: "/menu" })}
          data-ocid="car_select.back_button"
        >
          ← Back
        </button>

        <h1
          className="font-display font-black text-sm tracking-[0.2em] uppercase"
          style={{ color: "#FFFFFF" }}
        >
          SELECT YOUR CAR
        </h1>

        {/* Coin display */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(255,215,0,0.08)",
            border: `1px solid ${insufficientCoins ? "#FF4444" : "rgba(255,215,0,0.2)"}`,
            transition: "border-color 0.2s",
          }}
        >
          <span style={{ color: "#FFD700", fontSize: "14px" }}>🪙</span>
          <span
            className="font-display font-black text-sm"
            style={{ color: "#FFD700" }}
          >
            {profile.totalCoins.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── INSUFFICIENT COINS TOAST ──────────────────────────────────────── */}
      {insufficientCoins && (
        <div
          className="relative z-20 mx-5 mt-2 px-4 py-2 rounded-xl text-center font-display font-bold text-xs uppercase tracking-wider badge-pop"
          style={{
            background: "rgba(255,68,68,0.15)",
            color: "#FF6666",
            border: "1px solid rgba(255,68,68,0.3)",
          }}
        >
          ⚠️ Not enough coins to unlock!
        </div>
      )}

      {/* ── MAIN CONTENT: scrollable to handle small screens ─────────────── */}
      <div className="relative z-10 flex flex-col flex-1 overflow-y-auto px-5 pt-4 pb-2">
        {/* ── CAR DISPLAY AREA ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Left arrow */}
          <button
            type="button"
            className="arrow-btn shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg active:scale-90 transition-smooth"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `2px solid ${accentColor}55`,
              color: accentColor,
              boxShadow: `0 0 12px ${accentColor}22`,
              transition: "all 0.2s",
            }}
            onClick={() => navigate_car("prev")}
            data-ocid="car_select.prev_button"
            aria-label="Previous car"
          >
            ◀
          </button>

          {/* Car panel */}
          <div
            key={`car-panel-${animKey}`}
            className={`flex-1 flex flex-col items-center justify-center rounded-3xl py-7 px-4 relative overflow-hidden ${
              slideDir === "left" ? "car-enter-left" : "car-enter-right"
            } ${shaking ? "shake-anim" : ""}`}
            style={{
              background: `linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(${hexToRgb(accentColor)},0.08) 100%)`,
              border: `1.5px solid ${accentColor}44`,
              boxShadow: `0 0 40px ${accentColor}1A, inset 0 0 30px ${accentColor}0A`,
              minHeight: "220px",
            }}
          >
            {/* Status badge */}
            {isEquipped && (
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg font-display font-black text-xs tracking-widest uppercase badge-pop"
                style={{
                  background: "linear-gradient(135deg, #00D4AA, #00AA88)",
                  color: "#0D1B2A",
                  boxShadow: "0 0 12px #00D4AA66",
                }}
              >
                EQUIPPED
              </div>
            )}
            {!isEquipped && isUnlocked && (
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg font-display font-bold text-xs tracking-widest uppercase badge-pop"
                style={{
                  background: "rgba(0,212,170,0.12)",
                  color: "#00D4AA",
                  border: "1px solid rgba(0,212,170,0.35)",
                }}
              >
                ✓ OWNED
              </div>
            )}
            {!isUnlocked && (
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg font-display font-bold text-xs tracking-widest uppercase badge-pop"
                style={{
                  background: "rgba(255,68,68,0.12)",
                  color: "#FF6666",
                  border: "1px solid rgba(255,68,68,0.3)",
                }}
              >
                🔒 LOCKED
              </div>
            )}

            {/* Lock overlay on car */}
            {!isUnlocked && (
              <div
                className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-2"
                style={{
                  background: "rgba(5,10,20,0.55)",
                  backdropFilter: "blur(1px)",
                  zIndex: 2,
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>🔒</span>
                <span
                  className="font-display font-black text-sm tracking-wider"
                  style={{ color: "#FFD700" }}
                >
                  🪙 {car.unlockCost.toLocaleString()} to unlock
                </span>
              </div>
            )}

            {/* Car emoji — large, centered */}
            <div
              className="flex items-center justify-center"
              style={{
                fontSize: "clamp(5rem, 18vw, 7.5rem)",
                filter: isUnlocked
                  ? `drop-shadow(0 0 18px ${accentColor}) drop-shadow(0 0 36px ${accentColor}88)`
                  : "grayscale(0.5) opacity(0.5)",
                transition: "filter 0.4s",
                lineHeight: 1,
              }}
            >
              {CAR_EMOJIS[car.type] ?? car.emoji}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            className="arrow-btn shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg active:scale-90 transition-smooth"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `2px solid ${accentColor}55`,
              color: accentColor,
              boxShadow: `0 0 12px ${accentColor}22`,
              transition: "all 0.2s",
            }}
            onClick={() => navigate_car("next")}
            data-ocid="car_select.next_button"
            aria-label="Next car"
          >
            ▶
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {CAR_CATALOG.map((c, i) => (
            <button
              key={c.type}
              type="button"
              className="transition-all duration-300"
              style={{
                width: i === carIdx ? "20px" : "7px",
                height: "7px",
                borderRadius: "4px",
                background:
                  i === carIdx ? accentColor : "rgba(255,255,255,0.18)",
                boxShadow: i === carIdx ? `0 0 8px ${accentColor}` : "none",
              }}
              onClick={() => {
                setSlideDir(i > carIdx ? "left" : "right");
                setAnimKey((k) => k + 1);
                setCarIdx(i);
              }}
              data-ocid={`car_select.dot.${i + 1}`}
              aria-label={`Car ${i + 1}`}
            />
          ))}
        </div>

        {/* ── CAR INFO ──────────────────────────────────────────────────────── */}
        <div className="mb-5 text-center">
          <h2
            className="font-display font-black text-2xl tracking-[0.12em] uppercase mb-1"
            style={{
              color: isUnlocked ? accentColor : "#4A6A8A",
              textShadow: isUnlocked ? `0 0 20px ${accentColor}66` : "none",
              transition: "color 0.3s, text-shadow 0.3s",
            }}
          >
            {car.displayName}
          </h2>
          <p className="text-sm" style={{ color: "#5A7A99" }}>
            {car.description}
          </p>
        </div>

        {/* ── STAT BARS ──────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl px-5 py-4 mb-5 flex flex-col gap-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[car.stats.speed, car.stats.handling, car.stats.acceleration].map(
            (val, i) => (
              <StatBar
                key={STAT_LABELS[i]}
                label={STAT_LABELS[i]}
                value={val}
                color={STAT_COLORS[i]}
              />
            ),
          )}
        </div>

        {/* ── COLOR PICKER ──────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl px-5 py-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="font-display font-bold text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "#5A7A99" }}
          >
            PICK COLOR
          </p>
          <div className="flex items-center justify-around">
            {NEON_COLORS.map((c) => {
              const isActive = profile.selectedColor === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  className="flex flex-col items-center gap-1.5 active:scale-90 transition-smooth"
                  onClick={() => selectColor(c.value)}
                  data-ocid={`car_select.color_${c.label.toLowerCase()}`}
                  aria-label={c.label}
                >
                  <div
                    className="w-10 h-10 rounded-full relative"
                    style={{
                      background: c.hex,
                      border: isActive
                        ? "3px solid #FFFFFF"
                        : "3px solid transparent",
                      boxShadow: isActive
                        ? `0 0 0 3px ${c.hex}44, 0 0 18px ${c.hex}`
                        : `0 0 8px ${c.hex}55`,
                      transition: "all 0.2s",
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 flex items-center justify-center text-sm font-black"
                        style={{ color: "#0D1B2A" }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <span
                    className="font-display font-bold text-xs uppercase tracking-wider"
                    style={{ color: isActive ? c.hex : "#3A5A78" }}
                  >
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTON — sticky at bottom ──────────────────────────────── */}
      <div
        className="relative z-10 px-5 pb-6 pt-3 shrink-0"
        style={{
          paddingBottom: "max(24px, env(safe-area-inset-bottom))",
          background: "linear-gradient(to top, #0D1B2A 80%, transparent)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          type="button"
          className="w-full py-5 rounded-2xl font-display font-black text-lg tracking-[0.15em] uppercase active:scale-95 transition-smooth"
          style={{
            ...btnStyle,
            fontSize: "1.1rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.1s",
          }}
          onClick={handleConfirm}
          data-ocid="car_select.confirm_button"
        >
          {isEquipped
            ? "✓ EQUIPPED"
            : isUnlocked
              ? "SELECT CAR →"
              : `🔒 UNLOCK — 🪙 ${car.unlockCost.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}

// ── Utils ─────────────────────────────────────────────────────────────────────
function hexToRgb(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
