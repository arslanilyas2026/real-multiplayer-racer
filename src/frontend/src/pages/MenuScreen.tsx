import { useNavigate } from "@tanstack/react-router";
import { getCarData } from "../data/cars";
import { useGameStore } from "../store/gameStore";

interface NavCardProps {
  label: string;
  icon: string;
  color: string;
  to: string;
  ocid: string;
}

function NavCard({ label, icon, color, to, ocid }: NavCardProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-2 rounded-2xl py-5 font-display font-bold text-sm tracking-wider uppercase transition-smooth active:scale-95"
      style={{
        background: `${color}14`,
        border: `2px solid ${color}55`,
        color,
        boxShadow: `0 0 10px ${color}22`,
      }}
      onClick={() => navigate({ to })}
      data-ocid={ocid}
    >
      <span className="text-3xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function MenuScreen() {
  const navigate = useNavigate();
  const { profile } = useGameStore();
  const carData = getCarData(profile.selectedCar);
  const xpInLevel = profile.xp % 1000;
  const xpPct = Math.min(100, (xpInLevel / 1000) * 100);

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: "#0D1B2A" }}
      data-ocid="menu.page"
    >
      <style>{`
        @keyframes logo-neon {
          0%, 100% { text-shadow: 0 0 10px #FF6B2B, 0 0 20px #FF6B2B66; }
          50% { text-shadow: 0 0 20px #FF6B2B, 0 0 40px #FF6B2B, 0 0 60px #FF6B2B44; }
        }
        .logo-neon { animation: logo-neon 2.5s ease-in-out infinite; }
        @keyframes play-glow {
          0%, 100% { box-shadow: 0 0 16px #FF6B2B88, 0 0 32px #FF6B2B44, inset 0 1px 0 rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 28px #FF6B2B, 0 0 56px #FF6B2B88, inset 0 1px 0 rgba(255,255,255,0.2); }
        }
        .play-btn-glow { animation: play-glow 2s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col h-full px-5">
        {/* Logo area */}
        <div className="flex flex-col items-center pt-14 pb-3">
          <p
            className="text-xs font-display font-bold tracking-[0.45em] uppercase mb-1"
            style={{ color: "#00D4AA" }}
          >
            ARCADE RACING
          </p>
          <h1
            className="logo-neon font-display font-black text-center leading-tight"
            style={{
              fontSize: "clamp(20px, 5.5vw, 30px)",
              color: "#FF6B2B",
              letterSpacing: "0.04em",
            }}
          >
            LANE RACER: CAR RACING CLASH
          </h1>
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3 mb-5"
          style={{
            background: "#132032",
            border: "1px solid #00D4AA33",
            boxShadow: "0 0 14px #00D4AA11",
          }}
          data-ocid="menu.stats_panel"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{carData.emoji}</span>
            <div>
              <p
                className="font-display font-bold text-xs leading-none mb-0.5"
                style={{ color: "#00D4AA" }}
              >
                {carData.displayName}
              </p>
              <p className="text-xs" style={{ color: "#FFFFFF55" }}>
                Selected Car
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: "16px" }}>🪙</span>
              <span
                className="font-display font-bold text-sm"
                style={{ color: "#FFD700" }}
              >
                {profile.totalCoins.toLocaleString()}
              </span>
            </div>
            <div
              className="px-2.5 py-1 rounded-xl text-xs font-display font-bold"
              style={{
                background: "#FF6B2B22",
                color: "#FF6B2B",
                border: "1px solid #FF6B2B44",
              }}
            >
              LVL {profile.level}
            </div>
          </div>
        </div>

        {/* High score strip */}
        <div
          className="flex items-center justify-center gap-2 py-2 rounded-xl mb-5"
          style={{ background: "#FFD70010", border: "1px solid #FFD70030" }}
        >
          <span style={{ color: "#FFD700", fontSize: "14px" }}>🏆</span>
          <span
            className="font-display font-bold text-xs tracking-wider uppercase"
            style={{ color: "#FFD70099" }}
          >
            Best Score:
          </span>
          <span
            className="font-display font-bold text-sm"
            style={{ color: "#FFD700" }}
          >
            {profile.highScore.toLocaleString()} pts
          </span>
        </div>

        {/* PLAY button */}
        <button
          type="button"
          className="w-full py-5 rounded-2xl font-display font-black text-2xl tracking-widest uppercase mb-5 play-btn-glow transition-smooth active:scale-95"
          style={{
            background: "linear-gradient(135deg, #FF6B2B 0%, #FF8C4A 100%)",
            color: "#0D1B2A",
          }}
          onClick={() => navigate({ to: "/game-mode" })}
          data-ocid="menu.play_button"
        >
          🏁 PLAY
        </button>

        {/* Secondary grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <NavCard
            label="CAR SELECT"
            icon="🚗"
            color="#00D4AA"
            to="/car-select"
            ocid="menu.car_select_button"
          />
          <NavCard
            label="UPGRADES"
            icon="⚡"
            color="#9B59B6"
            to="/upgrades"
            ocid="menu.upgrades_button"
          />
          <NavCard
            label="LEADERBOARD"
            icon="🏆"
            color="#FFD700"
            to="/leaderboard"
            ocid="menu.leaderboard_button"
          />
          <NavCard
            label="CHALLENGES"
            icon="🎯"
            color="#E91E8C"
            to="/challenges"
            ocid="menu.challenges_button"
          />
        </div>

        {/* XP bar */}
        <div className="mb-auto">
          <div
            className="flex justify-between text-xs font-display mb-1.5"
            style={{ color: "#FFFFFF44" }}
          >
            <span>XP LEVEL {profile.level}</span>
            <span>{xpInLevel} / 1000</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "#1E2D40" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${xpPct}%`,
                background: "linear-gradient(to right, #00D4AA, #B44FFF)",
                boxShadow: "0 0 8px #00D4AA88",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-5 flex flex-col items-center gap-1">
          <p
            className="text-xs font-display tracking-widest uppercase"
            style={{ color: "#FFFFFF22" }}
          >
            SINGLE PLAYER · v1.0
          </p>
          <p className="text-xs" style={{ color: "#FFFFFF22" }}>
            © {new Date().getFullYear()}. Developed by Wevo Soft
          </p>
        </div>
      </div>
    </div>
  );
}
