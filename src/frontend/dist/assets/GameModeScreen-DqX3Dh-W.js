import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-B6JfqekL.js";
import { M as MAP_CATALOG } from "./maps-BAIToim9.js";
import { u as useGameStore, M as MapTheme, G as GameMode } from "./gameStore-sCxKMV8R.js";
const TIMED_OPTIONS = [
  { mins: 1, label: "1 MIN" },
  { mins: 3, label: "3 MIN" },
  { mins: 5, label: "5 MIN" },
  { mins: 10, label: "10 MIN" }
];
const MAP_CARD_THEMES = {
  [MapTheme.SUNSET_BOULEVARD]: {
    bg: "linear-gradient(135deg,#2a1200 0%,#3d1800 40%,#1a0800 100%)",
    border: "#FF8C00"
  },
  [MapTheme.RAINY_NIGHT_CITY]: {
    bg: "linear-gradient(135deg,#050b18 0%,#0a1224 40%,#060c1a 100%)",
    border: "#4FC3F7"
  },
  [MapTheme.MOUNTAIN_PASS]: {
    bg: "linear-gradient(135deg,#0e1410 0%,#182018 40%,#0e1410 100%)",
    border: "#90A0A0"
  }
};
function MapCard({
  map,
  isSelected,
  isUnlocked,
  playerLevel,
  justUnlocked,
  onSelect,
  onUnlock
}) {
  const isPremium = map.unlockLevel > 0;
  const theme = MAP_CARD_THEMES[map.theme];
  const canUnlock = isPremium && !isUnlocked && playerLevel >= map.unlockLevel;
  const cardBg = isSelected ? `${map.ambientColor}18` : theme ? theme.bg : "#131E2E";
  const borderColor = isSelected ? map.ambientColor : isUnlocked && isPremium ? `${map.ambientColor}88` : isPremium ? (theme == null ? void 0 : theme.border) ?? map.ambientColor : "#1E2D40";
  const glow = isSelected ? `0 0 16px ${map.ambientColor}66` : "none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-xl overflow-hidden",
      style: {
        background: cardBg,
        border: `2px solid ${borderColor}`,
        boxShadow: justUnlocked ? `0 0 24px ${map.ambientColor}88` : glow,
        opacity: !isUnlocked && !canUnlock ? 0.62 : 1
      },
      "data-ocid": `game_mode.map_card_${map.theme.toLowerCase()}`,
      children: [
        !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-10",
            style: {
              background: "linear-gradient(135deg,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.18) 100%)"
            }
          }
        ),
        justUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-20 rounded-xl",
            style: {
              background: `radial-gradient(ellipse at center,${map.ambientColor}33 0%,transparent 70%)`,
              animation: "unlock-flash 0.6s ease-out forwards"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "relative z-[5] w-full flex items-center gap-3 px-3 py-2.5 text-left",
            onClick: isUnlocked ? onSelect : void 0,
            disabled: !isUnlocked,
            "data-ocid": `game_mode.map_${map.theme.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl leading-none shrink-0", children: map.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-black text-xs tracking-wider uppercase leading-none",
                      style: { color: isSelected ? map.ambientColor : "#FFFFFF" },
                      children: map.displayName
                    }
                  ),
                  isUnlocked && isPremium && !justUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "⭐" }),
                  justUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold uppercase px-1.5 py-0.5 rounded",
                      style: {
                        background: "#FFD70033",
                        color: "#FFD700",
                        border: "1px solid #FFD70066",
                        fontSize: "0.55rem"
                      },
                      children: "NEW!"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs leading-tight",
                    style: { color: "#7A9BB5", fontSize: "0.65rem" },
                    children: map.description
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex flex-col items-end gap-1", children: isUnlocked ? isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-bold text-sm",
                  style: { color: map.ambientColor },
                  children: "✓"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-bold uppercase px-1.5 py-0.5 rounded-lg",
                  style: {
                    background: `${map.ambientColor}22`,
                    color: map.ambientColor,
                    border: `1px solid ${map.ambientColor}44`,
                    fontSize: "0.6rem"
                  },
                  children: map.trafficDensity
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.1rem" }, children: "🔒" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-bold",
                    style: { color: "#FFD700", fontSize: "0.6rem" },
                    children: [
                      "Lvl ",
                      map.unlockLevel
                    ]
                  }
                )
              ] }) })
            ]
          }
        ),
        canUnlock && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative z-[15] px-3 pb-2.5",
            style: { borderTop: `1px solid ${borderColor}44` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full py-2 rounded-xl font-display font-black text-xs tracking-wider uppercase active:scale-95 flex items-center justify-center gap-1.5 mt-2",
                style: {
                  background: "linear-gradient(135deg,#00D4AA 0%,#00AA88 100%)",
                  color: "#0D1B2A",
                  boxShadow: "0 0 14px #00D4AA55"
                },
                onClick: onUnlock,
                "data-ocid": `game_mode.unlock_button_${map.theme.toLowerCase()}`,
                children: [
                  "🔓 UNLOCK (Level ",
                  map.unlockLevel,
                  " reached!)"
                ]
              }
            )
          }
        ),
        isPremium && !isUnlocked && !canUnlock && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative z-[15] px-3 pb-1.5 flex items-center justify-center",
            style: { borderTop: `1px solid ${borderColor}33` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "font-display font-bold text-center py-1",
                style: { color: "#FFFFFF44", fontSize: "0.6rem" },
                children: [
                  "Reach Level ",
                  map.unlockLevel,
                  " to unlock"
                ]
              }
            )
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
    unlockMap
  } = useGameStore();
  const [justUnlockedMap, setJustUnlockedMap] = reactExports.useState(null);
  const unlockedMaps = profile.unlockedMaps ?? [MapTheme.HIGHWAY];
  function handlePlay() {
    startGame();
    navigate({ to: "/game" });
  }
  function handleUnlock(map) {
    unlockMap(map.theme);
    setJustUnlockedMap(map.theme);
    setSelectedMap(map.theme);
    setTimeout(() => setJustUnlockedMap(null), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col",
      style: { background: "#0D1B2A" },
      "data-ocid": "game_mode.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes start-glow { 0%,100%{box-shadow:0 0 20px #FF6B2B88,0 0 40px #FF6B2B44;} 50%{box-shadow:0 0 36px #FF6B2B,0 0 64px #FF6B2BAA;} }
        .start-glow { animation: start-glow 2s ease-in-out infinite; }
        @keyframes unlock-flash { 0%{opacity:1;} 100%{opacity:0;} }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-3 border-b shrink-0",
            style: { borderColor: "#1E2D40", background: "#0A1520" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "font-display font-bold text-sm uppercase active:scale-95",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-2.5 py-1.5 rounded-xl",
                  style: {
                    background: "rgba(255,107,43,0.12)",
                    border: "1px solid rgba(255,107,43,0.3)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-display font-black text-xs",
                      style: { color: "#FF6B2B" },
                      children: [
                        "LVL ",
                        profile.level
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-bold uppercase tracking-widest mb-2",
                style: { color: "#7A9BB5", fontSize: "0.65rem" },
                children: "GAME MODE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 active:scale-95",
                  style: {
                    background: selectedGameMode === GameMode.SCORE ? "#00D4AA14" : "#131E2E",
                    border: `2px solid ${selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#1E2D40"}`,
                    boxShadow: selectedGameMode === GameMode.SCORE ? "0 0 12px #00D4AA44" : "none"
                  },
                  onClick: () => setSelectedGameMode(GameMode.SCORE),
                  "data-ocid": "game_mode.mode_score",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "∞" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display font-black text-xs tracking-wider uppercase",
                        style: {
                          color: selectedGameMode === GameMode.SCORE ? "#00D4AA" : "#FFFFFF"
                        },
                        children: "SCORE"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-center",
                        style: { color: "#7A9BB5", fontSize: "0.6rem" },
                        children: "Endless drive"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 active:scale-95",
                  style: {
                    background: selectedGameMode === GameMode.TIMED ? "#FF6B2B14" : "#131E2E",
                    border: `2px solid ${selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#1E2D40"}`,
                    boxShadow: selectedGameMode === GameMode.TIMED ? "0 0 12px #FF6B2B44" : "none"
                  },
                  onClick: () => setSelectedGameMode(GameMode.TIMED),
                  "data-ocid": "game_mode.mode_timed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⏱" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display font-black text-xs tracking-wider uppercase",
                        style: {
                          color: selectedGameMode === GameMode.TIMED ? "#FF6B2B" : "#FFFFFF"
                        },
                        children: "TIMED"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-center",
                        style: { color: "#7A9BB5", fontSize: "0.6rem" },
                        children: "Beat the clock"
                      }
                    )
                  ]
                }
              )
            ] }),
            selectedGameMode === GameMode.TIMED && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2", children: TIMED_OPTIONS.map(({ mins, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "flex-1 py-2 rounded-xl font-display font-bold text-xs tracking-wider active:scale-95",
                style: {
                  background: selectedTimedDuration === mins ? "#FF6B2B" : "#131E2E",
                  color: selectedTimedDuration === mins ? "#0D1B2A" : "#7A9BB5",
                  border: `2px solid ${selectedTimedDuration === mins ? "#FF6B2B" : "#1E2D40"}`,
                  boxShadow: selectedTimedDuration === mins ? "0 0 10px #FF6B2B66" : "none"
                },
                onClick: () => setSelectedTimedDuration(mins),
                "data-ocid": `game_mode.duration_${mins}min`,
                children: label
              },
              mins
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-bold uppercase tracking-widest mb-2",
                style: { color: "#7A9BB5", fontSize: "0.65rem" },
                children: "SELECT MAP"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: MAP_CATALOG.map((map) => {
              const isUnlocked = unlockedMaps.includes(map.theme);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapCard,
                {
                  map,
                  isSelected: selectedMap === map.theme,
                  isUnlocked,
                  playerLevel: profile.level,
                  justUnlocked: justUnlockedMap === map.theme,
                  onSelect: () => setSelectedMap(map.theme),
                  onUnlock: () => handleUnlock(map)
                },
                map.theme
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl px-3 py-2 flex items-center justify-between shrink-0",
              style: { background: "#132032", border: "1px solid #1E2D4088" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🏎️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-xs uppercase tracking-wider",
                      style: { color: "#FFFFFF88" },
                      children: selectedGameMode === GameMode.SCORE ? "Endless Score" : `${selectedTimedDuration} Min Race`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-3 border-t shrink-0",
            style: {
              borderColor: "#1E2D40",
              background: "#0A1520",
              paddingBottom: "max(12px,env(safe-area-inset-bottom))"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "start-glow w-full py-4 rounded-2xl font-display font-black text-xl tracking-widest uppercase active:scale-95",
                style: {
                  background: "linear-gradient(135deg,#FF6B2B 0%,#FF8C4A 100%)",
                  color: "#0D1B2A"
                },
                onClick: handlePlay,
                "data-ocid": "game_mode.start_race_button",
                children: "🏁 START RACE"
              }
            )
          }
        )
      ]
    }
  );
}
export {
  GameModeScreen as default
};
