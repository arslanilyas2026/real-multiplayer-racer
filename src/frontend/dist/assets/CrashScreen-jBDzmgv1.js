import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-C9nsfCGx.js";
import { u as useGameStore } from "./gameStore-5oklP8TG.js";
function CrashScreen() {
  const navigate = useNavigate();
  const { gameState, startGame } = useGameStore();
  const [flash, setFlash] = reactExports.useState(true);
  const [shake, setShake] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t1 = setTimeout(() => setFlash(false), 500);
    const t2 = setTimeout(() => setShake(false), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  function handleRaceAgain() {
    startGame();
    navigate({ to: "/game" });
  }
  function handleChangeCar() {
    navigate({ to: "/car-select" });
  }
  function handleMenu() {
    navigate({ to: "/menu" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col items-center justify-center gap-6 px-6 overflow-hidden",
      style: { background: "#0D1B2A" },
      "data-ocid": "crash.page",
      children: [
        flash && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "rgba(255,40,40,0.35)",
              animation: "fadeOut 0.5s forwards"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full",
            style: {
              width: `${40 + i * 18}px`,
              height: `${40 + i * 18}px`,
              left: `${10 + i * 11}%`,
              top: `${20 + i % 3 * 18}%`,
              background: "rgba(255,60,60,0.06)",
              filter: "blur(18px)",
              animation: `smokeRise ${1.5 + i * 0.3}s ease-out forwards`
            }
          },
          k
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3",
            style: { animation: shake ? "shake 0.6s ease" : "none" },
            "data-ocid": "crash.header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-7xl",
                  style: { animation: "bounce 0.8s ease infinite alternate" },
                  children: "💥"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-5xl font-display font-black tracking-wider uppercase text-center",
                  style: {
                    color: "#FF3D3D",
                    textShadow: "0 0 32px #FF3D3D, 0 0 64px #FF3D3D44"
                  },
                  children: "CRASHED!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-base font-body text-center",
                  style: { color: "rgba(255,255,255,0.45)" },
                  children: "Better luck next time, racer."
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-xs rounded-2xl p-5 flex flex-col gap-3",
            style: {
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.08)"
            },
            "data-ocid": "crash.stats_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Score",
                  value: gameState.score.toLocaleString(),
                  color: "#FF6B2B"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: "rgba(255,255,255,0.06)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Coins",
                  value: `🪙 ${gameState.coins.toLocaleString()}`,
                  color: "#FFD700"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: "rgba(255,255,255,0.06)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Distance",
                  value: `${Math.floor(gameState.distance)}m`,
                  color: "#00D4AA"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-3 w-full max-w-xs",
            "data-ocid": "crash.actions",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full py-4 rounded-2xl font-display font-black text-xl tracking-wider uppercase transition-smooth active:scale-95",
                  style: {
                    background: "#FF6B2B",
                    color: "#0D1B2A",
                    boxShadow: "0 0 28px #FF6B2B55, 0 4px 16px rgba(0,0,0,0.3)"
                  },
                  onClick: handleRaceAgain,
                  "data-ocid": "crash.retry_button",
                  children: "🔄 RACE AGAIN"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full py-4 rounded-2xl font-display font-black text-lg tracking-wider uppercase transition-smooth active:scale-95",
                  style: {
                    background: "rgba(0,212,170,0.12)",
                    color: "#00D4AA",
                    border: "1.5px solid #00D4AA44",
                    boxShadow: "0 0 16px #00D4AA22"
                  },
                  onClick: handleChangeCar,
                  "data-ocid": "crash.change_car_button",
                  children: "🚗 CHANGE CAR"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full py-4 rounded-2xl font-display font-bold text-lg tracking-wider uppercase transition-smooth active:scale-95",
                  style: {
                    background: "transparent",
                    color: "rgba(255,255,255,0.5)",
                    border: "1.5px solid rgba(255,255,255,0.12)"
                  },
                  onClick: handleMenu,
                  "data-ocid": "crash.menu_button",
                  children: "🏠 MAIN MENU"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15% { transform: translateX(-12px) rotate(-2deg); }
          30% { transform: translateX(10px) rotate(2deg); }
          45% { transform: translateX(-8px) rotate(-1deg); }
          60% { transform: translateX(6px) rotate(1deg); }
          75% { transform: translateX(-4px); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes smokeRise {
          from { opacity: 0.8; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-60px) scale(1.4); }
        }
        @keyframes bounce {
          from { transform: translateY(0) rotate(-5deg); }
          to   { transform: translateY(-8px) rotate(5deg); }
        }
      ` })
      ]
    }
  );
}
function StatRow({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-sm font-display font-medium",
        style: { color: "rgba(255,255,255,0.45)" },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-base font-display font-black tabular-nums",
        style: { color },
        children: value
      }
    )
  ] });
}
export {
  CrashScreen as default
};
