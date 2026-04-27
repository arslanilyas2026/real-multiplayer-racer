import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-B6JfqekL.js";
import { A as AI_PERSONALITIES } from "./aiOpponents-DxngDPPo.js";
import { a as apiSubmitRaceResult } from "./api-DxCNr74K.js";
import { u as useGameStore, a as CarType } from "./gameStore-sCxKMV8R.js";
const CAR_EMOJI = {
  [CarType.BASIC]: "🚗",
  [CarType.SPORT]: "🏎️",
  [CarType.STREET]: "🚙",
  [CarType.JET]: "✈️",
  [CarType.RACE]: "🏁",
  [CarType.SUPER]: "🚀",
  [CarType.HYPER]: "⚡",
  [CarType.LIGHTNING]: "🌩️"
};
const DIFFICULTY_COLORS = {
  ROOKIE: "#00D4AA",
  RACER: "#FFD700",
  PRO: "#FF6B2B",
  ELITE: "#B44FFF",
  LEGEND: "#FF2D78"
};
function WinBurst() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute rounded-full",
        style: {
          width: 320,
          height: 320,
          background: "radial-gradient(circle, #FFD70055 0%, #FF6B2B33 35%, transparent 70%)",
          filter: "blur(8px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute",
        style: {
          width: 340,
          height: 340,
          background: "conic-gradient(from 0deg, transparent 0deg, #FFD70018 10deg, transparent 20deg, transparent 30deg, #FF6B2B15 40deg, transparent 50deg, transparent 60deg, #FFD70018 70deg, transparent 80deg, transparent 90deg, #FF6B2B15 100deg, transparent 110deg, transparent 120deg, #FFD70018 130deg, transparent 140deg, transparent 150deg, #FF6B2B15 160deg, transparent 170deg, transparent 180deg, #FFD70018 190deg, transparent 200deg, transparent 210deg, #FF6B2B15 220deg, transparent 230deg, transparent 240deg, #FFD70018 250deg, transparent 260deg, transparent 270deg, #FF6B2B15 280deg, transparent 290deg, transparent 300deg, #FFD70018 310deg, transparent 320deg, transparent 330deg, #FF6B2B15 340deg, transparent 350deg, transparent 360deg)",
          borderRadius: "50%",
          animation: "burst-spin 12s linear infinite"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute",
        style: {
          width: 280,
          height: 280,
          background: "conic-gradient(from 15deg, transparent 0deg, #FFD70022 6deg, transparent 12deg, transparent 42deg, #FFD70022 48deg, transparent 54deg, transparent 84deg, #FFD70022 90deg, transparent 96deg, transparent 126deg, #FFD70022 132deg, transparent 138deg, transparent 168deg, #FFD70022 174deg, transparent 180deg, transparent 210deg, #FFD70022 216deg, transparent 222deg, transparent 252deg, #FFD70022 258deg, transparent 264deg, transparent 294deg, #FFD70022 300deg, transparent 306deg, transparent 336deg, #FFD70022 342deg, transparent 348deg)",
          borderRadius: "50%"
        }
      }
    )
  ] });
}
function RaceParticipantList({
  playerName,
  playerWon,
  playerScore,
  xpGained,
  aiName,
  aiGlowColor,
  aiScore,
  carEmoji
}) {
  const [rank1, rank2] = playerWon ? ["1st", "2nd"] : ["2nd", "1st"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-4 mb-4 rounded-2xl overflow-hidden border",
      style: { borderColor: "#1e2d40", background: "#0e1a28" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-4 py-3",
            style: {
              background: playerWon ? "linear-gradient(90deg, #FF6B2B22, #FFD70014)" : "#111d2e",
              borderBottom: "1px solid #1e2d40"
            },
            "data-ocid": "results.player_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 flex items-center justify-center rounded-xl font-display font-black text-sm flex-shrink-0",
                  style: {
                    background: playerWon ? "linear-gradient(135deg, #FFD700, #FF6B2B)" : "#1e2d40",
                    color: playerWon ? "#0D1B2A" : "#556678",
                    boxShadow: playerWon ? "0 0 12px #FFD70066" : "none"
                  },
                  children: rank1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-black flex-shrink-0",
                  style: {
                    background: "linear-gradient(135deg, #FF6B2B, #FFD700)",
                    color: "#0D1B2A"
                  },
                  children: (playerName || "Y").charAt(0).toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold text-sm truncate",
                    style: { color: "#ffffff" },
                    children: playerName || "YOU"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs font-display font-bold",
                    style: { color: "#00D4AA" },
                    children: [
                      "+",
                      xpGained,
                      " XP"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-black text-base",
                    style: { color: "#FF6B2B" },
                    children: playerScore.toLocaleString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#667788" }, children: "pts" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-4 py-3",
            style: { background: "#0e1a28" },
            "data-ocid": "results.ai_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 flex items-center justify-center rounded-xl font-display font-black text-sm flex-shrink-0",
                  style: { background: "#1e2d40", color: "#556678" },
                  children: rank2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0",
                  style: {
                    background: `${aiGlowColor}22`,
                    border: `1px solid ${aiGlowColor}55`
                  },
                  children: carEmoji
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold text-sm truncate",
                    style: {
                      color: aiGlowColor,
                      textShadow: `0 0 8px ${aiGlowColor}66`
                    },
                    children: aiName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#445566" }, children: "AI Opponent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-black text-base",
                    style: { color: aiGlowColor },
                    children: aiScore.toLocaleString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#445566" }, children: "pts" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function AIRivalSection({
  aiRaceResult,
  playerScore,
  xpGained
}) {
  const {
    playerWon,
    aiName,
    aiCarType,
    aiDifficulty,
    aiScore,
    positionSwaps,
    finalMargin
  } = aiRaceResult;
  const personality = AI_PERSONALITIES[aiName];
  const aiGlowColor = (personality == null ? void 0 : personality.glowColor) ?? "#FF6B2B";
  const diffColor = DIFFICULTY_COLORS[aiDifficulty];
  const carEmoji = CAR_EMOJI[aiCarType] ?? "🚗";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "results.ai_rival_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center py-6 mb-2 overflow-hidden", children: [
      playerWon && /* @__PURE__ */ jsxRuntimeExports.jsx(WinBurst, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 text-center", children: playerWon ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display font-black tracking-widest uppercase",
            style: {
              fontSize: "clamp(2rem, 10vw, 3rem)",
              color: "#FFD700",
              textShadow: "0 0 30px #FFD700, 0 0 60px #FFD70088, 0 0 100px #FF6B2B44",
              animation: "win-bounce 0.6s cubic-bezier(0.36,0.07,0.19,0.97) both"
            },
            children: "🏆 YOU WIN!"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "font-body text-sm mt-1",
            style: { color: "#FFD700AA" },
            children: [
              "You outscored ",
              aiName,
              "!"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display font-black text-3xl tracking-widest uppercase",
            style: { color: "#ffffff", textShadow: "0 0 20px #ffffff44" },
            children: "BETTER LUCK NEXT TIME"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "font-body text-sm mt-1",
            style: { color: `${aiGlowColor}BB` },
            children: [
              aiName,
              " wins this round"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RaceParticipantList,
      {
        playerName: "YOU",
        playerWon,
        playerScore,
        xpGained,
        aiName,
        aiGlowColor,
        aiScore,
        carEmoji
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-body px-3 py-1 rounded-full",
          style: { background: "#1e2d40", color: "#8899aa" },
          children: [
            "🔄 Lead changed ",
            positionSwaps,
            " ",
            positionSwaps === 1 ? "time" : "times"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-body px-3 py-1 rounded-full",
          style: { background: "#1e2d40", color: "#8899aa" },
          children: [
            "📏 Margin: ",
            finalMargin.toLocaleString()
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-body px-3 py-1 rounded-full",
          style: {
            background: `${diffColor}18`,
            border: `1px solid ${diffColor}44`,
            color: diffColor
          },
          children: [
            "🎯 ",
            aiDifficulty
          ]
        }
      )
    ] })
  ] });
}
const PARTICLE_COLORS = ["#FF6B2B", "#00D4AA", "#FFD700", "#B44FFF", "#4FC3F7"];
function ConfettiParticle({ index }) {
  const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];
  const left = `${(index * 7 + 3) % 100}%`;
  const size = index % 3 === 0 ? 8 : 5;
  const delay = `${index * 0.15 % 2}s`;
  const dur = `${1.4 + index % 4 * 0.3}s`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "absolute top-0 rounded-sm animate-bounce",
      style: {
        left,
        width: size,
        height: size,
        background: color,
        animationDelay: delay,
        animationDuration: dur,
        opacity: 0.75,
        transform: `rotate(${index * 23}deg)`
      }
    }
  );
}
function StarRating({ stars }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 my-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "text-4xl select-none",
      style: {
        opacity: n <= stars ? 1 : 0.2,
        filter: n <= stars ? "drop-shadow(0 0 10px #FFD700)" : "none",
        transform: n <= stars ? "scale(1.15)" : "scale(0.85)",
        transition: "all 0.3s ease"
      },
      children: "⭐"
    },
    n
  )) });
}
function XPBar({
  xpGained,
  currentXP
}) {
  const [barWidth, setBarWidth] = reactExports.useState(0);
  const targetPct = Math.min(100, currentXP % 1e3 / 10);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setBarWidth(targetPct), 500);
    return () => clearTimeout(t);
  }, [targetPct]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-4 border",
      style: { background: "#111d2e", borderColor: "#B44FFF55" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: "XP GAINED" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-display font-bold text-base",
              style: { color: "#B44FFF" },
              children: [
                "+",
                xpGained,
                " XP"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full h-3 rounded-full overflow-hidden",
            style: { background: "#1e2d40" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full",
                style: {
                  width: `${barWidth}%`,
                  background: "linear-gradient(90deg, #B44FFF, #00D4AA)",
                  boxShadow: "0 0 10px #B44FFF88",
                  transition: "width 1s cubic-bezier(0.4,0,0.2,1)"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right mt-1", children: [
          currentXP % 1e3,
          " / 1000 — Level ",
          Math.floor(currentXP / 1e3) + 1
        ] })
      ]
    }
  );
}
function ResultsScreen() {
  const navigate = useNavigate();
  const { gameState, profile, startGame } = useGameStore();
  const aiRaceResult = useGameStore((s) => s.aiRaceResult);
  const submitted = reactExports.useRef(false);
  const score = gameState.score;
  const coins = gameState.coins;
  const distanceKm = (gameState.distance / 1e3).toFixed(2);
  const duration = gameState.gameMode === "TIMED" ? gameState.timedDuration * 60 - gameState.timeLeft : gameState.distance > 0 ? Math.floor(gameState.distance / 5) : 0;
  const stars = score >= 5e4 ? 3 : score >= 15e3 ? 2 : 1;
  const xpGained = Math.floor(score / 10);
  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }
  const snapshotRef = reactExports.useRef({
    score,
    coins,
    distance: gameState.distance,
    duration,
    carType: gameState.carType,
    mapTheme: gameState.mapTheme,
    gameMode: gameState.gameMode
  });
  reactExports.useEffect(() => {
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
      gameMode: s.gameMode
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
      large: true
    },
    {
      label: "COINS",
      value: coins.toLocaleString(),
      color: "#FFD700",
      icon: "🪙"
    },
    {
      label: "DISTANCE",
      value: `${distanceKm} km`,
      color: "#00D4AA",
      icon: "📍"
    },
    { label: "TIME", value: formatTime(duration), color: "#4FC3F7", icon: "⏱️" },
    { label: "CAR", value: gameState.carType, color: "#B44FFF", icon: "🚗" },
    { label: "MAP", value: gameState.mapTheme, color: "#69F0AE", icon: "🗺️" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col relative overflow-hidden",
      style: { background: "#0D1B2A" },
      "data-ocid": "results.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConfettiParticle, { index: i }, `confetti-${i + 1}`)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 overflow-y-auto flex flex-col", children: [
          !aiRaceResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-10 pb-2 px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display font-black text-3xl tracking-wider uppercase",
                style: {
                  color: "#FF6B2B",
                  textShadow: "0 0 24px #FF6B2B88, 0 0 48px #FF6B2B44"
                },
                children: "RACE COMPLETE!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body mt-1", children: [
              gameState.gameMode === "TIMED" ? "Timed Mode" : "Score Mode",
              " ·",
              " ",
              gameState.mapTheme
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { stars })
          ] }),
          aiRaceResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-6 pb-0 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body", children: [
                gameState.gameMode === "TIMED" ? "Timed Mode" : "Score Mode",
                " ·",
                " ",
                gameState.mapTheme
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { stars })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AIRivalSection,
              {
                aiRaceResult,
                playerScore: score,
                xpGained
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-4 rounded-2xl border p-5 flex flex-col gap-3 mb-4",
              style: {
                background: "#111d2e",
                borderColor: "#FF6B2B44",
                boxShadow: "0 0 24px #FF6B2B22"
              },
              children: stats.map(({ label, value, color, icon, large }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between border-b pb-3 last:border-0 last:pb-0",
                  style: { borderColor: "#1e2d40" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-body", children: label })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-black",
                        style: {
                          color,
                          fontSize: large ? "1.6rem" : "1rem",
                          textShadow: large ? `0 0 14px ${color}88` : "none"
                        },
                        children: value
                      }
                    )
                  ]
                },
                label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(XPBar, { xpGained, currentXP: profile.xp }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-4 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "results.race_again_button",
                onClick: handleRaceAgain,
                className: "w-full py-4 rounded-2xl font-display font-black text-base tracking-widest uppercase transition-smooth",
                style: {
                  background: "linear-gradient(135deg, #FF6B2B, #FF8C4A)",
                  color: "#0D1B2A",
                  boxShadow: "0 0 24px #FF6B2B66, 0 4px 16px #FF6B2B44"
                },
                children: "🏎️ RACE AGAIN"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "results.share_button",
                onClick: () => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Lane Racer: Car Racing Clash",
                      text: `I scored ${score.toLocaleString()} pts in Lane Racer: Car Racing Clash! 🏎️🔥`
                    });
                  }
                },
                className: "w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth",
                style: {
                  background: "transparent",
                  borderColor: "#ffffff44",
                  color: "#ffffff"
                },
                children: "📤 SHARE RESULT"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "results.change_car_button",
                onClick: () => navigate({ to: "/car-select" }),
                className: "w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth",
                style: {
                  background: "#00D4AA22",
                  borderColor: "#00D4AA66",
                  color: "#00D4AA"
                },
                children: "🚗 CHANGE CAR"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "results.leaderboard_button",
                onClick: () => navigate({ to: "/leaderboard" }),
                className: "w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth",
                style: {
                  background: "#FFD70011",
                  borderColor: "#FFD70044",
                  color: "#FFD700"
                },
                children: "🏆 LEADERBOARD"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "results.main_menu_button",
                onClick: () => navigate({ to: "/menu" }),
                className: "w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth",
                style: {
                  background: "transparent",
                  borderColor: "#445566",
                  color: "#667788"
                },
                children: "← MAIN MENU"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ResultsScreen as default
};
