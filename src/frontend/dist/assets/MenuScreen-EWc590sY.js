import { u as useNavigate, j as jsxRuntimeExports } from "./index-C9nsfCGx.js";
import { g as getCarData } from "./cars-BYK3CU46.js";
import { u as useGameStore } from "./gameStore-5oklP8TG.js";
function NavCard({ label, icon, color, to, ocid }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "flex flex-col items-center justify-center gap-2 rounded-2xl py-5 font-display font-bold text-sm tracking-wider uppercase transition-smooth active:scale-95",
      style: {
        background: `${color}14`,
        border: `2px solid ${color}55`,
        color,
        boxShadow: `0 0 10px ${color}22`
      },
      onClick: () => navigate({ to }),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
      ]
    }
  );
}
function MenuScreen() {
  const navigate = useNavigate();
  const { profile } = useGameStore();
  const carData = getCarData(profile.selectedCar);
  const xpInLevel = profile.xp % 1e3;
  const xpPct = Math.min(100, xpInLevel / 1e3 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col overflow-hidden bg-stripe-overlay",
      style: { background: "#0D1B2A" },
      "data-ocid": "menu.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 28px)",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col h-full px-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pt-14 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-display font-bold tracking-[0.45em] uppercase mb-1",
                style: { color: "#00D4AA" },
                children: "ARCADE RACING"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "logo-neon font-display font-black text-center leading-tight",
                style: {
                  fontSize: "clamp(20px, 5.5vw, 30px)",
                  color: "#FF6B2B",
                  letterSpacing: "0.04em"
                },
                children: "REAL MULTIPLAYER RACER"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between rounded-2xl px-4 py-3 mb-5",
              style: {
                background: "#132032",
                border: "1px solid #00D4AA33",
                boxShadow: "0 0 14px #00D4AA11"
              },
              "data-ocid": "menu.stats_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: carData.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display font-bold text-xs leading-none mb-0.5",
                        style: { color: "#00D4AA" },
                        children: carData.displayName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#FFFFFF55" }, children: "Selected Car" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px" }, children: "🪙" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-bold text-sm",
                        style: { color: "#FFD700" },
                        children: profile.totalCoins.toLocaleString()
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-2.5 py-1 rounded-xl text-xs font-display font-bold",
                      style: {
                        background: "#FF6B2B22",
                        color: "#FF6B2B",
                        border: "1px solid #FF6B2B44"
                      },
                      children: [
                        "LVL ",
                        profile.level
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center gap-2 py-2 rounded-xl mb-5",
              style: { background: "#FFD70010", border: "1px solid #FFD70030" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#FFD700", fontSize: "14px" }, children: "🏆" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-bold text-xs tracking-wider uppercase",
                    style: { color: "#FFD70099" },
                    children: "Best Score:"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-bold text-sm",
                    style: { color: "#FFD700" },
                    children: [
                      profile.highScore.toLocaleString(),
                      " pts"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-full py-5 rounded-2xl font-display font-black text-2xl tracking-widest uppercase mb-5 play-btn-glow transition-smooth active:scale-95",
              style: {
                background: "linear-gradient(135deg, #FF6B2B 0%, #FF8C4A 100%)",
                color: "#0D1B2A"
              },
              onClick: () => navigate({ to: "/game-mode" }),
              "data-ocid": "menu.play_button",
              children: "🏁 PLAY"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NavCard,
              {
                label: "CAR SELECT",
                icon: "🚗",
                color: "#00D4AA",
                to: "/car-select",
                ocid: "menu.car_select_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NavCard,
              {
                label: "UPGRADES",
                icon: "⚡",
                color: "#9B59B6",
                to: "/upgrades",
                ocid: "menu.upgrades_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NavCard,
              {
                label: "LEADERBOARD",
                icon: "🏆",
                color: "#FFD700",
                to: "/leaderboard",
                ocid: "menu.leaderboard_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NavCard,
              {
                label: "CHALLENGES",
                icon: "🎯",
                color: "#E91E8C",
                to: "/challenges",
                ocid: "menu.challenges_button"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between text-xs font-display mb-1.5",
                style: { color: "#FFFFFF44" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "XP LEVEL ",
                    profile.level
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    xpInLevel,
                    " / 1000"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-2 rounded-full overflow-hidden",
                style: { background: "#1E2D40" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full",
                    style: {
                      width: `${xpPct}%`,
                      background: "linear-gradient(to right, #00D4AA, #B44FFF)",
                      boxShadow: "0 0 8px #00D4AA88",
                      transition: "width 0.5s ease"
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-5 flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-display tracking-widest uppercase",
                style: { color: "#FFFFFF22" },
                children: "SINGLE PLAYER · v1.0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "#FFFFFF22" }, children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ". Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
                  target: "_blank",
                  rel: "noreferrer",
                  style: { color: "#FF6B2B55", textDecoration: "underline" },
                  children: "caffeine.ai"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  MenuScreen as default
};
