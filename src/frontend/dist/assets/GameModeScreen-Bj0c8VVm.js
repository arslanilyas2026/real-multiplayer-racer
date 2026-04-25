import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-C9nsfCGx.js";
import { M as MAP_CATALOG } from "./maps-BUrdhEDR.js";
import { u as useGameStore, M as MapTheme, G as GameMode } from "./gameStore-5oklP8TG.js";
const TIMED_OPTIONS = [
  { mins: 1, label: "1 MIN" },
  { mins: 3, label: "3 MIN" },
  { mins: 5, label: "5 MIN" },
  { mins: 10, label: "10 MIN" }
];
const MAP_CARD_THEMES = {
  [MapTheme.SUNSET_BOULEVARD]: {
    bg: "linear-gradient(135deg, #2a1200 0%, #3d1800 40%, #1a0800 100%)",
    border: "#FF8C00",
    glow: "#FF8C0044"
  },
  [MapTheme.RAINY_NIGHT_CITY]: {
    bg: "linear-gradient(135deg, #050b18 0%, #0a1224 40%, #060c1a 100%)",
    border: "#4FC3F7",
    glow: "#4FC3F744"
  },
  [MapTheme.MOUNTAIN_PASS]: {
    bg: "linear-gradient(135deg, #0e1410 0%, #182018 40%, #0e1410 100%)",
    border: "#90A0A0",
    glow: "#90A0A044"
  }
};
function MapCard({
  map,
  isSelected,
  isUnlocked,
  canAfford,
  totalCoins,
  justUnlocked,
  onSelect,
  onUnlock
}) {
  const isPremium = map.unlockThreshold > 0;
  const theme = MAP_CARD_THEMES[map.theme];
  const cardBg = isSelected ? `${map.ambientColor}18` : theme ? theme.bg : "#131E2E";
  const borderColor = isSelected ? map.ambientColor : isUnlocked && isPremium ? `${map.ambientColor}88` : isPremium ? (theme == null ? void 0 : theme.border) ?? map.ambientColor : "#1E2D40";
  const glow = isSelected ? `0 0 20px ${map.ambientColor}66` : "none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-2xl overflow-hidden transition-smooth",
      style: {
        background: cardBg,
        border: `2px solid ${borderColor}`,
        boxShadow: justUnlocked ? `0 0 32px ${map.ambientColor}88, 0 0 64px ${map.ambientColor}44` : glow,
        opacity: !isUnlocked && !canAfford ? 0.62 : 1
      },
      "data-ocid": `game_mode.map_card_${map.theme.toLowerCase()}`,
      children: [
        !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-10",
            style: {
              background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 100%)"
            }
          }
        ),
        justUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-20 rounded-2xl",
            style: {
              background: `radial-gradient(ellipse at center, ${map.ambientColor}33 0%, transparent 70%)`,
              animation: "unlock-flash 0.6s ease-out forwards"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "relative z-[5] w-full flex items-start gap-3 px-4 py-4 text-left",
            onClick: isUnlocked ? onSelect : void 0,
            disabled: !isUnlocked,
            "data-ocid": `game_mode.map_${map.theme.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1 shrink-0 w-12 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl leading-none", children: map.icon }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-black text-sm tracking-wider uppercase leading-none",
                      style: { color: isSelected ? map.ambientColor : "#FFFFFF" },
                      children: map.displayName
                    }
                  ),
                  isUnlocked && isPremium && !justUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", title: "Unlocked", children: "⭐" }),
                  justUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-display font-bold uppercase px-1.5 py-0.5 rounded",
                      style: {
                        background: "#FFD70033",
                        color: "#FFD700",
                        border: "1px solid #FFD70066"
                      },
                      children: "NEW!"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs leading-tight mb-2",
                    style: { color: "#7A9BB5" },
                    children: map.description
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-display font-bold uppercase px-2 py-0.5 rounded-lg",
                    style: {
                      background: `${map.ambientColor}22`,
                      color: map.ambientColor,
                      border: `1px solid ${map.ambientColor}44`
                    },
                    children: [
                      map.trafficDensity,
                      " traffic"
                    ]
                  }
                )
              ] }),
              isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-end gap-1 shrink-0 ml-1", children: isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-bold text-xs uppercase",
                  style: { color: map.ambientColor },
                  children: "✓"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4" }) })
            ]
          }
        ),
        !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative z-[15] px-4 pb-4 flex flex-col items-center gap-2",
            style: { borderTop: `1px solid ${borderColor}44` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 flex flex-col items-center gap-1 w-full", children: canAfford ? (
              /* Gold unlock button */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full py-2.5 rounded-xl font-display font-black text-sm tracking-wider uppercase transition-smooth active:scale-95 flex items-center justify-center gap-2",
                  style: {
                    background: "linear-gradient(135deg, #FFD700 0%, #FF9900 100%)",
                    color: "#0D1B2A",
                    boxShadow: "0 0 20px #FFD70066, 0 4px 12px #FF990044"
                  },
                  onClick: onUnlock,
                  "data-ocid": `game_mode.unlock_button_${map.theme.toLowerCase()}`,
                  children: [
                    "🔓",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "UNLOCK — 🪙 ",
                      map.unlockThreshold.toLocaleString()
                    ] })
                  ]
                }
              )
            ) : (
              /* Lock icon with requirement */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🔒" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-display font-bold text-xs tracking-wider text-center",
                    style: { color: "#FFD700" },
                    children: [
                      "🪙 ",
                      map.unlockThreshold.toLocaleString(),
                      " coins needed"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs text-center",
                    style: { color: "#FFFFFF88" },
                    children: [
                      "You have:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#FFD700" }, children: [
                        totalCoins.toLocaleString(),
                        " 🪙"
                      ] }),
                      " ",
                      "·",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#FF6B6B" }, children: [
                        "need ",
                        (map.unlockThreshold - totalCoins).toLocaleString(),
                        " ",
                        "more"
                      ] })
                    ]
                  }
                )
              ] })
            ) })
          }
        )
      ]
    }
  );
}
function GameModeScreen() {
  var _a, _b;
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
    unlockMap
  } = useGameStore();
  const [justUnlockedMap, setJustUnlockedMap] = reactExports.useState(null);
  const unlockedMaps = profile.unlockedMaps ?? [MapTheme.HIGHWAY];
  const totalCoins = profile.totalCoins;
  function handlePlay() {
    startGame();
    navigate({ to: "/game" });
  }
  function handleUnlock(map) {
    const success = spendCoins(map.unlockThreshold);
    if (success) {
      unlockMap(map.theme);
      setJustUnlockedMap(map.theme);
      setSelectedMap(map.theme);
      setTimeout(() => setJustUnlockedMap(null), 2e3);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col",
      style: { background: "#0D1B2A" },
      "data-ocid": "game_mode.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-4 border-b",
            style: { borderColor: "#1E2D40", background: "#0A1520" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "font-display font-bold text-sm uppercase transition-smooth active:scale-95",
                  style: { color: "#7A9BB5" },
                  onClick: () => navigate({ to: "/menu" }),
                  "data-ocid": "game_mode.back_button",
                  children: "← Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display font-black text-base tracking-wider uppercase",
                  style: { color: "#FFFFFF" },
                  children: "CHOOSE MODE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-bold text-xs uppercase tracking-widest mb-3",
                style: { color: "#7A9BB5" },
                children: "GAME MODE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex flex-col items-center gap-3 rounded-2xl p-5 transition-smooth active:scale-95",
                  style: {
                    background: selectedGameMode === GameMode.SCORE ? "#00D4AA14" : "#131E2E",
                    border: `2px solid ${selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#1E2D40"}`,
                    boxShadow: selectedGameMode === GameMode.SCORE ? "0 0 16px #00D4AA44" : "none"
                  },
                  onClick: () => setSelectedGameMode(GameMode.SCORE),
                  "data-ocid": "game_mode.mode_score",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "∞" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-display font-black text-sm tracking-wider uppercase",
                          style: {
                            color: selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#FFFFFF"
                          },
                          children: "SCORE"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs mt-1 leading-tight",
                          style: { color: "#7A9BB5" },
                          children: "Endless drive — collect coins, avoid crashes"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex flex-col items-center gap-3 rounded-2xl p-5 transition-smooth active:scale-95",
                  style: {
                    background: selectedGameMode === GameMode.TIMED ? "#FF6B2B14" : "#131E2E",
                    border: `2px solid ${selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#1E2D40"}`,
                    boxShadow: selectedGameMode === GameMode.TIMED ? "0 0 16px #FF6B2B44" : "none"
                  },
                  onClick: () => setSelectedGameMode(GameMode.TIMED),
                  "data-ocid": "game_mode.mode_timed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "⏱" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-display font-black text-sm tracking-wider uppercase",
                          style: {
                            color: selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#FFFFFF"
                          },
                          children: "TIMED"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs mt-1 leading-tight",
                          style: { color: "#7A9BB5" },
                          children: "Race against the clock — beat your best"
                        }
                      )
                    ] })
                  ]
                }
              )
            ] }),
            selectedGameMode === GameMode.TIMED && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: TIMED_OPTIONS.map(({ mins, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "flex-1 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider transition-smooth active:scale-95",
                style: {
                  background: selectedTimedDuration === mins ? "#FF6B2B" : "#131E2E",
                  color: selectedTimedDuration === mins ? "#0D1B2A" : "#7A9BB5",
                  border: `2px solid ${selectedTimedDuration === mins ? "#FF6B2B" : "#1E2D40"}`,
                  boxShadow: selectedTimedDuration === mins ? "0 0 12px #FF6B2B66" : "none"
                },
                onClick: () => setSelectedTimedDuration(mins),
                "data-ocid": `game_mode.duration_${mins}min`,
                children: label
              },
              mins
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display font-bold text-xs uppercase tracking-widest",
                  style: { color: "#7A9BB5" },
                  children: "SELECT MAP"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "coin-pulse flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                  style: {
                    background: "#FFD70018",
                    border: "1px solid #FFD70044"
                  },
                  "data-ocid": "game_mode.coin_balance",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🪙" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-bold text-sm tracking-wider",
                        style: { color: "#FFD700" },
                        children: totalCoins.toLocaleString()
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3", children: MAP_CATALOG.map((map) => {
              const isUnlocked = unlockedMaps.includes(map.theme);
              const canAfford = !isUnlocked && totalCoins >= map.unlockThreshold;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapCard,
                {
                  map,
                  isSelected: selectedMap === map.theme,
                  isUnlocked,
                  canAfford,
                  totalCoins,
                  justUnlocked: justUnlockedMap === map.theme,
                  onSelect: () => setSelectedMap(map.theme),
                  onUnlock: () => handleUnlock(map)
                },
                map.theme
              );
            }) }),
            (() => {
              const nextLocked = MAP_CATALOG.find(
                (m) => m.unlockThreshold > 0 && !unlockedMaps.includes(m.theme)
              );
              if (!nextLocked) return null;
              const progress = Math.min(
                totalCoins / nextLocked.unlockThreshold,
                1
              );
              const remaining = Math.max(
                0,
                nextLocked.unlockThreshold - totalCoins
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-3 rounded-xl px-4 py-3",
                  style: { background: "#132032", border: "1px solid #1E2D4088" },
                  "data-ocid": "game_mode.unlock_progress",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs font-display font-bold uppercase",
                          style: { color: "#7A9BB5" },
                          children: [
                            "Next unlock: ",
                            nextLocked.icon,
                            " ",
                            nextLocked.displayName
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs font-display font-bold",
                          style: { color: "#FFD700" },
                          children: [
                            Math.round(progress * 100),
                            "%"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1.5 rounded-full overflow-hidden",
                        style: { background: "#1E2D40" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full transition-all duration-500",
                            style: {
                              width: `${progress * 100}%`,
                              background: `linear-gradient(90deg, #FFD700, ${nextLocked.ambientColor})`
                            }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs mt-1.5 text-center",
                        style: { color: "#FFFFFF55" },
                        children: [
                          "Earn ",
                          remaining.toLocaleString(),
                          " more coins to unlock"
                        ]
                      }
                    )
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl px-4 py-3 flex items-center justify-between",
              style: { background: "#132032", border: "1px solid #1E2D4088" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏎️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-xs uppercase tracking-wider",
                      style: { color: "#FFFFFF88" },
                      children: selectedGameMode === GameMode.SCORE ? "Endless Score" : `${selectedTimedDuration} Min Race`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: (_a = MAP_CATALOG.find((m) => m.theme === selectedMap)) == null ? void 0 : _a.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-xs uppercase",
                      style: { color: "#FFFFFF66" },
                      children: (_b = MAP_CATALOG.find((m) => m.theme === selectedMap)) == null ? void 0 : _b.displayName
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-5 border-t", style: { borderColor: "#1E2D40" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "start-glow w-full py-5 rounded-2xl font-display font-black text-2xl tracking-widest uppercase transition-smooth active:scale-95",
            style: {
              background: "linear-gradient(135deg, #FF6B2B 0%, #FF8C4A 100%)",
              color: "#0D1B2A"
            },
            onClick: handlePlay,
            "data-ocid": "game_mode.start_race_button",
            children: "🏁 START RACE"
          }
        ) })
      ]
    }
  );
}
export {
  GameModeScreen as default
};
