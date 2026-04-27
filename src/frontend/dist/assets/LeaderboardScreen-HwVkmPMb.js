import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-B6JfqekL.js";
import { b as apiGetLeaderboard, c as apiGetTotalPlayers, d as apiGetTotalRaces } from "./api-DxCNr74K.js";
import { u as useGameStore } from "./gameStore-sCxKMV8R.js";
const XP_LEVEL_THRESHOLDS = [0, 1e3, 2e3, 3500, 5e3, 7e3, 9500, 12500];
const CAR_UNLOCK_AT_LEVEL = {
  2: "SPORT",
  3: "STREET",
  4: "JET",
  5: "RACE",
  6: "SUPER",
  7: "HYPER",
  8: "LIGHTNING"
};
function getRankTitle(score) {
  if (score >= 3e4)
    return { label: "LEGEND", color: "#FFD700", bg: "#FFD70022" };
  if (score >= 15e3)
    return { label: "PRO", color: "#B44FFF", bg: "#B44FFF22" };
  if (score >= 5e3)
    return { label: "RACER", color: "#00D4AA", bg: "#00D4AA22" };
  if (score >= 1e3)
    return { label: "STREET", color: "#4FC3F7", bg: "#4FC3F722" };
  return { label: "NEWCOMER", color: "#7a8a9a", bg: "#7a8a9a22" };
}
const TOP3_META = {
  1: {
    gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    glow: "0 0 14px #FFD70066",
    textColor: "#0D1B2A"
  },
  2: {
    gradient: "linear-gradient(135deg, #C0C0C0, #9e9e9e)",
    glow: "0 0 10px #C0C0C044",
    textColor: "#0D1B2A"
  },
  3: {
    gradient: "linear-gradient(135deg, #CD7F32, #a0522d)",
    glow: "0 0 10px #CD7F3244",
    textColor: "#ffffff"
  }
};
function ScoreRow({
  entry,
  index,
  isPlayer
}) {
  const rank = Number(entry.rank);
  const isTop3 = rank <= 3;
  const top3Meta = TOP3_META[rank];
  const scoreNum = Number(entry.score);
  const rankTitle = getRankTitle(scoreNum);
  const avatarColors = [
    "#FF6B2B",
    "#00D4AA",
    "#FFD700",
    "#B44FFF",
    "#4FC3F7",
    "#FF2D78",
    "#69F0AE"
  ];
  const avatarColor = avatarColors[entry.playerName.charCodeAt(0) % avatarColors.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `leaderboard.item.${index + 1}`,
      className: "flex items-center gap-2 px-3 py-2 rounded-xl border transition-smooth",
      style: {
        background: isPlayer ? "linear-gradient(90deg, #FF6B2B22, #FFD70014)" : isTop3 ? `${avatarColor}10` : "#111d2e",
        borderColor: isPlayer ? "#FF6B2B55" : isTop3 ? `${avatarColor}33` : "#1e2d40",
        boxShadow: isTop3 ? top3Meta.glow : isPlayer ? "0 0 12px #FF6B2B22" : "none"
      },
      children: [
        isTop3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 flex items-center justify-center rounded-full font-display font-black flex-shrink-0",
            style: {
              background: top3Meta.gradient,
              boxShadow: top3Meta.glow,
              color: top3Meta.textColor,
              fontSize: "1rem"
            },
            children: rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-8 h-8 flex items-center justify-center rounded-lg font-display font-black text-xs flex-shrink-0",
            style: {
              background: isPlayer ? "#FF6B2B22" : "#1e2d40",
              color: isPlayer ? "#FF6B2B" : "#556678",
              border: isPlayer ? "1px solid #FF6B2B44" : "none"
            },
            children: [
              "#",
              rank
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-7 h-7 rounded-full flex items-center justify-center font-display font-black text-xs flex-shrink-0",
            style: {
              background: `${avatarColor}33`,
              border: `1px solid ${avatarColor}66`,
              color: avatarColor
            },
            children: entry.playerName.charAt(0).toUpperCase()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-bold text-xs truncate",
                style: { color: isTop3 ? "#ffffff" : "#ccddee" },
                children: entry.playerName.length > 12 ? `${entry.playerName.slice(0, 12)}…` : entry.playerName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                style: {
                  background: rankTitle.bg,
                  color: rankTitle.color,
                  border: `1px solid ${rankTitle.color}44`,
                  fontSize: "0.5rem",
                  letterSpacing: "0.04em"
                },
                children: rankTitle.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono",
              style: { color: "#445566", fontSize: "0.6rem" },
              children: entry.carType
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display font-black text-sm",
              style: {
                color: isTop3 ? TOP3_META[rank].textColor === "#0D1B2A" ? "#FFD700" : "#CD7F32" : "#FF6B2B"
              },
              children: scoreNum.toLocaleString()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#445566", fontSize: "0.6rem" }, children: "pts" })
        ] })
      ]
    }
  );
}
function PinnedPlayerRow({
  playerName,
  playerScore,
  playerCar,
  playerRank
}) {
  const rankTitle = getRankTitle(playerScore);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 pt-2 pb-3 border-t",
      style: { borderColor: "#1e2d40", background: "#0D1B2A" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display font-bold tracking-widest uppercase mb-1.5",
            style: { color: "#FF6B2B88", fontSize: "0.6rem" },
            children: "YOUR RANK"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-2 rounded-xl border",
            style: {
              background: "linear-gradient(90deg, #FF6B2B22, #FFD70014)",
              borderColor: "#FF6B2B55",
              boxShadow: "0 0 16px #FF6B2B22"
            },
            "data-ocid": "leaderboard.pinned_player_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 flex items-center justify-center rounded-xl font-display font-black text-xs flex-shrink-0",
                  style: {
                    background: "linear-gradient(135deg, #FF6B2B, #FFD700)",
                    color: "#0D1B2A",
                    boxShadow: "0 0 8px #FF6B2B66"
                  },
                  children: playerRank ? `#${playerRank}` : "?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-7 h-7 rounded-full flex items-center justify-center font-display font-black text-xs flex-shrink-0",
                  style: {
                    background: "#FF6B2B33",
                    border: "1px solid #FF6B2B66",
                    color: "#FF6B2B"
                  },
                  children: (playerName || "Y").charAt(0).toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-bold text-xs truncate",
                      style: { color: "#ffffff" },
                      children: playerName || "YOU"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                      style: {
                        background: rankTitle.bg,
                        color: rankTitle.color,
                        border: `1px solid ${rankTitle.color}44`,
                        fontSize: "0.5rem"
                      },
                      children: rankTitle.label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-mono",
                    style: { color: "#667788", fontSize: "0.6rem" },
                    children: playerCar
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-black text-sm",
                    style: { color: "#FF6B2B" },
                    children: playerScore.toLocaleString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "leaderboard.invite_button",
                    className: "font-display font-bold px-2 py-0.5 rounded-lg border transition-smooth",
                    style: {
                      borderColor: "#00D4AA66",
                      color: "#00D4AA",
                      background: "#00D4AA11",
                      fontSize: "0.55rem",
                      letterSpacing: "0.03em"
                    },
                    onClick: () => {
                      if (navigator.share) {
                        navigator.share({
                          title: "Lane Racer: Car Racing Clash",
                          text: `Challenge me in Lane Racer: Car Racing Clash! I'm ranked #${playerRank ?? "?"} 🏎️`
                        });
                      }
                    },
                    children: "INVITE"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function LeaderboardScreen() {
  const navigate = useNavigate();
  const { profile } = useGameStore();
  const [tab, setTab] = reactExports.useState("scores");
  const [entries, setEntries] = reactExports.useState([]);
  const [totalPlayers, setTotalPlayers] = reactExports.useState(0n);
  const [totalRaces, setTotalRaces] = reactExports.useState(0n);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function load() {
      setLoading(true);
      const [lb, players, races] = await Promise.all([
        apiGetLeaderboard(),
        apiGetTotalPlayers(),
        apiGetTotalRaces()
      ]);
      setEntries(lb);
      setTotalPlayers(players);
      setTotalRaces(races);
      setLoading(false);
    }
    load();
  }, []);
  const playerEntry = entries.find((e) => e.playerName === "YOU");
  const playerRank = playerEntry ? Number(playerEntry.rank) : null;
  const currentLevel = profile.level;
  const currentXp = profile.xp;
  const currentLevelStart = XP_LEVEL_THRESHOLDS[currentLevel - 1] ?? 0;
  const nextLevelStart = XP_LEVEL_THRESHOLDS[currentLevel] ?? XP_LEVEL_THRESHOLDS[XP_LEVEL_THRESHOLDS.length - 1];
  const xpIntoLevel = currentXp - currentLevelStart;
  const xpNeededForLevel = nextLevelStart - currentLevelStart;
  const xpPct = Math.min(100, xpIntoLevel / xpNeededForLevel * 100);
  const nextCarUnlock = CAR_UNLOCK_AT_LEVEL[currentLevel + 1] ?? null;
  const isMaxLevel = currentLevel >= 8;
  const statItems = [
    {
      label: "Total Races",
      value: profile.totalRaces.toLocaleString(),
      icon: "🏎️",
      color: "#fff"
    },
    {
      label: "Best Score",
      value: profile.highScore.toLocaleString(),
      icon: "🔥",
      color: "#FF6B2B"
    },
    {
      label: "Total Coins",
      value: profile.totalCoins.toLocaleString(),
      icon: "🪙",
      color: "#FFD700"
    },
    {
      label: "Current Car",
      value: profile.selectedCar,
      icon: "🚗",
      color: "#00D4AA"
    },
    {
      label: "Cars Unlocked",
      value: `${profile.unlockedCars.length} / 7`,
      icon: "🔓",
      color: "#4FC3F7"
    },
    {
      label: "Global Players",
      value: totalPlayers.toLocaleString(),
      icon: "🌍",
      color: "#00D4AA"
    },
    {
      label: "Global Races",
      value: totalRaces.toLocaleString(),
      icon: "🏁",
      color: "#FF6B2B"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col",
      style: { background: "#0D1B2A" },
      "data-ocid": "leaderboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3 border-b flex-shrink-0",
            style: { background: "#111d2e", borderColor: "#1e2d40" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "leaderboard.back_button",
                  onClick: () => navigate({ to: "/menu" }),
                  className: "w-9 h-9 flex items-center justify-center rounded-xl font-bold text-lg transition-smooth",
                  style: { color: "#7a9bb5" },
                  "aria-label": "Back",
                  children: "←"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display font-black text-base tracking-widest uppercase",
                  style: { color: "#FFD700", textShadow: "0 0 12px #FFD70066" },
                  children: "🏆 LEADERBOARD"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex border-b flex-shrink-0",
            style: { background: "#111d2e", borderColor: "#1e2d40" },
            children: ["scores", "stats"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `leaderboard.${t}_tab`,
                onClick: () => setTab(t),
                className: "flex-1 py-2.5 font-display font-bold text-xs tracking-widest uppercase relative transition-smooth",
                style: { color: tab === t ? "#00D4AA" : "#556678" },
                children: [
                  t === "scores" ? "HIGH SCORES" : "MY STATS",
                  tab === t && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                      style: { background: "#00D4AA", boxShadow: "0 0 6px #00D4AA" }
                    }
                  )
                ]
              },
              t
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-3 py-3 min-h-0", children: [
          tab === "scores" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "leaderboard.scores_list",
              className: "flex flex-col gap-1.5",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "leaderboard.loading_state",
                  className: "flex flex-col gap-1.5",
                  children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-12 rounded-xl animate-pulse",
                      style: { background: "#1e2d40" }
                    },
                    `skel-${i + 1}`
                  ))
                }
              ) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "leaderboard.empty_state",
                  className: "flex flex-col items-center gap-4 py-12",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🏁" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body text-center text-sm", children: [
                      "No races recorded yet.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Be the first on the board!"
                    ] })
                  ]
                }
              ) : entries.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ScoreRow,
                {
                  entry: e,
                  index: i,
                  isPlayer: e.playerName === "YOU"
                },
                e.playerName
              ))
            }
          ),
          tab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "leaderboard.stats_panel",
              className: "flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-2xl p-4 border",
                    style: {
                      background: "linear-gradient(135deg, #1a0d2e 0%, #111d2e 100%)",
                      borderColor: "#B44FFF44"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-xl",
                              style: {
                                background: "linear-gradient(135deg, #B44FFF, #7B2FBE)",
                                boxShadow: "0 0 20px #B44FFF66",
                                color: "#FFFFFF"
                              },
                              children: currentLevel
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                className: "font-display font-black text-lg tracking-widest uppercase",
                                style: { color: "#B44FFF", lineHeight: 1 },
                                children: [
                                  "LEVEL ",
                                  currentLevel
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "font-display font-bold text-xs",
                                style: { color: "#7A9BB5" },
                                children: isMaxLevel ? "MAX LEVEL REACHED" : `${currentXp.toLocaleString()} XP total`
                              }
                            )
                          ] })
                        ] }),
                        !isMaxLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-display font-black text-base",
                              style: { color: "#FFFFFF" },
                              children: xpIntoLevel.toLocaleString()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "font-display font-bold text-xs",
                              style: { color: "#556678" },
                              children: [
                                "/ ",
                                xpNeededForLevel.toLocaleString(),
                                " XP"
                              ]
                            }
                          )
                        ] })
                      ] }),
                      !isMaxLevel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-full h-3 rounded-full overflow-hidden mb-1.5",
                            style: { background: "#1e2d40" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "h-full rounded-full",
                                style: {
                                  width: `${xpPct}%`,
                                  background: "linear-gradient(90deg, #B44FFF, #00D4AA)",
                                  boxShadow: "0 0 10px #B44FFF88",
                                  transition: "width 0.8s ease"
                                }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-display font-bold text-xs",
                              style: { color: "#B44FFF" },
                              children: [
                                "Level ",
                                currentLevel
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-display font-bold text-xs",
                              style: { color: "#556678" },
                              children: [
                                Math.round(xpPct),
                                "%"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-display font-bold text-xs",
                              style: { color: "#00D4AA" },
                              children: [
                                "Level ",
                                currentLevel + 1
                              ]
                            }
                          )
                        ] }),
                        nextCarUnlock && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-3 px-3 py-2 rounded-xl",
                            style: {
                              background: "rgba(0,212,170,0.08)",
                              border: "1px solid rgba(0,212,170,0.25)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.4rem" }, children: "🚗" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "p",
                                  {
                                    className: "font-display font-black text-xs uppercase tracking-wider",
                                    style: { color: "#00D4AA" },
                                    children: [
                                      "Next: Level ",
                                      currentLevel + 1,
                                      " unlocks ",
                                      nextCarUnlock
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "p",
                                  {
                                    className: "font-display font-bold text-xs",
                                    style: { color: "#445566" },
                                    children: [
                                      (nextLevelStart - currentXp).toLocaleString(),
                                      " XP to go"
                                    ]
                                  }
                                )
                              ] })
                            ]
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-center gap-2 py-2 rounded-xl",
                          style: {
                            background: "rgba(255,215,0,0.08)",
                            border: "1px solid rgba(255,215,0,0.2)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.4rem" }, children: "👑" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "font-display font-black text-sm uppercase",
                                style: { color: "#FFD700" },
                                children: "All cars unlocked!"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-2xl border overflow-hidden",
                    style: { borderColor: "#1e2d40" },
                    children: statItems.map(({ label, value, icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-3 py-2.5 border-b last:border-0",
                        style: {
                          background: i % 2 === 0 ? "#111d2e" : "#0d1826",
                          borderColor: "#1e2d40"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-body text-xs", children: label })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-display font-bold text-xs",
                              style: { color },
                              children: value
                            }
                          )
                        ]
                      },
                      label
                    ))
                  }
                )
              ]
            }
          )
        ] }),
        tab === "scores" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PinnedPlayerRow,
          {
            playerName: "YOU",
            playerScore: profile.highScore,
            playerCar: profile.selectedCar,
            playerRank
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 border-t", style: { borderColor: "#1e2d40" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "leaderboard.back_to_menu_button",
            onClick: () => navigate({ to: "/menu" }),
            className: "w-full py-3 rounded-2xl font-display font-bold text-xs tracking-widest uppercase border transition-smooth",
            style: {
              background: "transparent",
              borderColor: "#FFD70066",
              color: "#FFD700"
            },
            children: "← BACK TO MENU"
          }
        ) })
      ]
    }
  );
}
export {
  LeaderboardScreen as default
};
