import { u as useNavigate, j as jsxRuntimeExports } from "./index-C9nsfCGx.js";
import { P as POWER_UP_CATALOG } from "./powerups-gDkT3A0P.js";
import { u as useGameStore } from "./gameStore-5oklP8TG.js";
const MAX_LEVEL = 5;
function PowerUpCard({ type }) {
  const { profile, spendCoins, upgradePowerUp } = useGameStore();
  const data = POWER_UP_CATALOG.find((p) => p.type === type);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `upgrade.card.${type.toLowerCase()}`,
      className: "relative rounded-2xl p-4 flex flex-col gap-3 border",
      style: { background: `${data.color}18`, borderColor: `${data.color}44` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
                style: {
                  background: `${data.color}22`,
                  boxShadow: `0 0 12px ${data.color}55`
                },
                children: data.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight", children: data.displayName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold font-display tracking-wider px-2 py-0.5 rounded-full",
                  style: { background: `${data.color}33`, color: data.color },
                  children: isMaxed ? "✓ MAXED" : `LVL ${currentLevel} / ${MAX_LEVEL}`
                }
              )
            ] })
          ] }),
          !isMaxed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `upgrade.upgrade_button.${type.toLowerCase()}`,
              onClick: handleUpgrade,
              disabled: !canAfford,
              className: "flex items-center gap-1 px-3 py-2 rounded-xl font-display font-bold text-xs transition-smooth disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0",
              style: {
                background: canAfford ? data.color : "#1e2d40",
                color: canAfford ? "#0D1B2A" : "#4a6080",
                boxShadow: canAfford ? `0 0 12px ${data.color}66` : "none"
              },
              children: [
                "🪙 ",
                cost.toLocaleString()
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-3 py-2 rounded-xl text-xs font-display font-bold flex-shrink-0",
              style: { background: `${data.color}44`, color: data.color },
              children: "MAX"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-snug font-body", children: data.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [1, 2, 3, 4, 5].slice(0, MAX_LEVEL).map((pip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-2 rounded-full flex-1 transition-smooth",
            style: {
              background: pip <= currentLevel ? data.color : `${data.color}22`,
              boxShadow: pip <= currentLevel ? `0 0 6px ${data.color}88` : "none"
            }
          },
          `${type}-pip-${pip}`
        )) })
      ]
    }
  );
}
function UpgradesScreen() {
  const navigate = useNavigate();
  const { profile } = useGameStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col",
      style: { background: "#0D1B2A" },
      "data-ocid": "upgrades.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-4 border-b",
            style: { background: "#111d2e", borderColor: "#1e2d40" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "upgrades.back_button",
                  onClick: () => navigate({ to: "/menu" }),
                  className: "w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg transition-smooth",
                  style: { color: "#7a9bb5" },
                  "aria-label": "Back",
                  children: "←"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display font-black text-lg tracking-widest uppercase",
                  style: { color: "#FF6B2B", textShadow: "0 0 16px #FF6B2B66" },
                  children: "⚡ UPGRADES"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border",
                  style: { background: "#FFD70022", borderColor: "#FFD70055" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🪙" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-bold text-sm",
                        style: { color: "#FFD700" },
                        children: profile.totalCoins.toLocaleString()
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body text-center px-4 pt-4 pb-2", children: "Upgrade power-ups with coins to gain the edge in every race" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "upgrades.list",
            className: "flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3 mt-2",
            children: POWER_UP_CATALOG.map((pu) => /* @__PURE__ */ jsxRuntimeExports.jsx(PowerUpCard, { type: pu.type }, pu.type))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4 border-t", style: { borderColor: "#1e2d40" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "upgrades.back_to_menu_button",
            onClick: () => navigate({ to: "/menu" }),
            className: "w-full py-3 rounded-2xl font-display font-bold text-sm tracking-widest uppercase border transition-smooth",
            style: {
              background: "transparent",
              borderColor: "#FF6B2B66",
              color: "#FF6B2B"
            },
            children: "← BACK TO MENU"
          }
        ) })
      ]
    }
  );
}
export {
  UpgradesScreen as default
};
