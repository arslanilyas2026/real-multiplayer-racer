import { useNavigate } from "@tanstack/react-router";

interface SampleChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  reward: string;
  icon: string;
}

const SAMPLE_CHALLENGES: SampleChallenge[] = [
  {
    id: "collect-100-coins",
    title: "Coin Collector",
    description: "Collect 100 coins in a single race",
    difficulty: "EASY",
    reward: "500 coins",
    icon: "🪙",
  },
  {
    id: "survive-canyon-5min",
    title: "Canyon Survivor",
    description: "Survive 5 minutes on the Canyon map",
    difficulty: "MEDIUM",
    reward: "1,500 coins + 200 XP",
    icon: "⛰️",
  },
  {
    id: "unlock-3-cars",
    title: "Car Enthusiast",
    description: "Unlock 3 different car types",
    difficulty: "HARD",
    reward: "3,000 coins + rare badge",
    icon: "🚗",
  },
];

const DIFF_COLORS = {
  EASY: { color: "#00D4AA", bg: "#00D4AA22", border: "#00D4AA44" },
  MEDIUM: { color: "#FFD700", bg: "#FFD70022", border: "#FFD70044" },
  HARD: { color: "#FF6B2B", bg: "#FF6B2B22", border: "#FF6B2B44" },
};

function ChallengeCard({
  challenge,
  index,
}: {
  challenge: SampleChallenge;
  index: number;
}) {
  const d = DIFF_COLORS[challenge.difficulty];

  return (
    <div
      data-ocid={`challenges.item.${index + 1}`}
      className="relative rounded-2xl p-4 border opacity-60"
      style={{ background: "#111d2e", borderColor: "#1e2d40" }}
    >
      <div className="absolute top-3 right-3 text-lg opacity-40">🔒</div>
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl flex-shrink-0"
          style={{ background: "#1e2d40" }}
        >
          {challenge.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-display font-bold text-sm text-foreground">
              {challenge.title}
            </h3>
            <span
              className="text-xs font-bold font-display px-2 py-0.5 rounded-full"
              style={{
                background: d.bg,
                border: `1px solid ${d.border}`,
                color: d.color,
              }}
            >
              {challenge.difficulty}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-body mb-2">
            {challenge.description}
          </p>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs text-muted-foreground">🎁 Reward:</span>
            <span
              className="text-xs font-bold font-display"
              style={{ color: "#FFD700" }}
            >
              {challenge.reward}
            </span>
          </div>
          {/* Progress 0% */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">0%</span>
            </div>
            <div
              className="w-full h-2 rounded-full"
              style={{ background: "#1e2d40" }}
            >
              <div
                className="h-full w-0 rounded-full"
                style={{ background: d.color }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChallengesScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{ background: "#0D1B2A" }}
      data-ocid="challenges.page"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ background: "#111d2e", borderColor: "#1e2d40" }}
      >
        <button
          type="button"
          data-ocid="challenges.back_button"
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
          ⚡ CHALLENGES
        </h1>
        <div className="w-10" />
      </div>

      {/* Coming Soon banner */}
      <div
        data-ocid="challenges.coming_soon_banner"
        className="mx-4 mt-6 rounded-2xl p-5 text-center relative overflow-hidden border"
        style={{
          background: "linear-gradient(135deg, #FF6B2B22, #B44FFF22)",
          borderColor: "#FF6B2B55",
          boxShadow: "0 0 30px #FF6B2B33, 0 0 60px #B44FFF22",
        }}
      >
        <div
          className="absolute -top-8 -left-8 w-24 h-24 rounded-full opacity-30 blur-xl"
          style={{ background: "#FF6B2B" }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-xl"
          style={{ background: "#B44FFF" }}
        />
        <p
          className="relative font-display font-black text-3xl tracking-widest"
          style={{ color: "#FF6B2B", textShadow: "0 0 20px #FF6B2B88" }}
        >
          COMING SOON
        </p>
        <p className="relative text-muted-foreground text-sm font-body mt-2 leading-relaxed">
          Bet coins, challenge friends, earn exclusive rewards — all coming in
          the next big update!
        </p>
        <div
          className="relative mt-4 inline-block px-5 py-2 rounded-full font-display font-bold text-sm border"
          style={{
            borderColor: "#00D4AA55",
            color: "#00D4AA",
            background: "#00D4AA11",
          }}
        >
          🔔 Check back soon
        </div>
      </div>

      {/* Preview heading */}
      <p className="text-muted-foreground text-xs font-display uppercase tracking-widest text-center px-4 mt-6 mb-3">
        Preview — Upcoming Challenges
      </p>

      {/* Locked challenge cards */}
      <div
        data-ocid="challenges.preview_list"
        className="flex-1 px-4 flex flex-col gap-3"
      >
        {SAMPLE_CHALLENGES.map((c, i) => (
          <ChallengeCard key={c.id} challenge={c} index={i} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-4 mt-6 border-t"
        style={{ borderColor: "#1e2d40" }}
      >
        <button
          type="button"
          data-ocid="challenges.back_to_menu_button"
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
