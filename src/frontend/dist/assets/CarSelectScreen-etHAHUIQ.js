import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-B6JfqekL.js";
import { C as CAR_CATALOG } from "./cars-BBAU-OP8.js";
import { u as useGameStore, C as CarColor, X as XP_LEVEL_THRESHOLDS } from "./gameStore-sCxKMV8R.js";
const CAR_ACCENT = {
  BASIC: "#00D4AA",
  SPORT: "#FF6B2B",
  STREET: "#B44FFF",
  JET: "#00BFFF",
  RACE: "#FF3EA5",
  SUPER: "#FF6B2B",
  HYPER: "#FFD700",
  LIGHTNING: "#7DF9FF"
};
const NEON_COLORS = [
  { value: CarColor.NEON_ORANGE, label: "BLAZE", hex: "#FF6B2B" },
  { value: CarColor.NEON_CYAN, label: "TEAL", hex: "#00D4AA" },
  { value: CarColor.NEON_PURPLE, label: "VOLT", hex: "#B44FFF" },
  { value: CarColor.NEON_YELLOW, label: "GOLD", hex: "#FFD700" }
];
const STAT_COLORS = ["#FF6B2B", "#00D4AA", "#B44FFF"];
const STAT_LABELS = ["SPEED", "HANDLING", "ACCEL"];
function xpForLevel(level) {
  return XP_LEVEL_THRESHOLDS[level - 1] ?? 0;
}
function hexToRgb(hex) {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
function StatBar({
  label,
  value,
  color
}) {
  const pct = Math.min(100, value / 10 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "w-14 shrink-0 font-display font-bold uppercase",
        style: { color: "#7A9BB5", fontSize: "0.63rem" },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 h-2 rounded-full overflow-hidden",
        style: { background: "rgba(255,255,255,0.07)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full",
            style: {
              width: `${pct}%`,
              background: `linear-gradient(90deg,${color}cc,${color})`,
              boxShadow: `0 0 5px ${color}88`,
              transition: "width 0.5s"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "w-5 text-right shrink-0 font-display font-black",
        style: { color, fontSize: "0.68rem" },
        children: value
      }
    )
  ] });
}
function CarIllustration({
  carType,
  color,
  accentColor,
  size = 110,
  locked = false
}) {
  const w = size * 0.32;
  const h = size * 0.55;
  const ref = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    if (locked) ctx.globalAlpha = 0.35;
    drawCar(ctx, size / 2, size / 2, carType, color, accentColor, w, h);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref, width: size, height: size, style: { display: "block" } });
}
function drawCar(ctx, cx, cy, type, body, accent, w, h) {
  ctx.save();
  ctx.translate(cx, cy);
  const hw = w / 2;
  const hh = h / 2;
  if (type === "RACE") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-hw * 0.38, -hh);
    ctx.lineTo(hw * 0.38, -hh);
    ctx.lineTo(hw * 0.25, hh);
    ctx.lineTo(-hw * 0.25, hh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.9;
    for (const [x1, x2] of [
      [-hw * 0.38, -hw],
      [hw * 0.38, hw]
    ]) {
      ctx.beginPath();
      ctx.moveTo(x1, -hh + h * 0.12);
      ctx.lineTo(x2, -hh + h * 0.12);
      ctx.lineTo(x2, -hh + h * 0.22);
      ctx.lineTo(x1, -hh + h * 0.22);
      ctx.closePath();
      ctx.fill();
    }
    ctx.beginPath();
    ctx.roundRect(-hw * 0.55, hh - h * 0.1, hw * 1.1, h * 0.1, 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(100,200,255,0.8)";
    ctx.beginPath();
    ctx.ellipse(0, -hh * 0.2, hw * 0.22, hh * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "JET") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(0, -hh - h * 0.08);
    ctx.lineTo(hw * 0.72, -hh + h * 0.22);
    ctx.lineTo(hw * 0.62, hh);
    ctx.lineTo(-hw * 0.62, hh);
    ctx.lineTo(-hw * 0.72, -hh + h * 0.22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(hw * 0.72, -hh + h * 0.22);
    ctx.lineTo(hw, 0);
    ctx.lineTo(hw * 0.62, hh);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-hw * 0.72, -hh + h * 0.22);
    ctx.lineTo(-hw, 0);
    ctx.lineTo(-hw * 0.62, hh);
    ctx.closePath();
    ctx.fill();
    for (const ex of [-hw * 0.3, 0, hw * 0.3]) {
      ctx.beginPath();
      ctx.ellipse(ex, hh - h * 0.04, hw * 0.12, hh * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(100,200,255,0.75)";
    ctx.beginPath();
    ctx.ellipse(0, -hh * 0.25, hw * 0.35, hh * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "HYPER") {
    const r = hw * 0.15;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-hw + r, -hh);
    ctx.lineTo(hw - r, -hh);
    ctx.quadraticCurveTo(hw, -hh, hw, -hh + r);
    ctx.lineTo(hw * 0.92, hh - r);
    ctx.quadraticCurveTo(hw * 0.92, hh, hw * 0.92 - r, hh);
    ctx.lineTo(-hw * 0.92 + r, hh);
    ctx.quadraticCurveTo(-hw * 0.92, hh, -hw * 0.92, hh - r);
    ctx.lineTo(-hw, -hh + r);
    ctx.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(-hw, -hh, w, h * 0.06);
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.beginPath();
    ctx.roundRect(-hw + hw * 0.05, -hh * 0.3, hw * 0.22, hh * 0.4, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(hw * 0.73, -hh * 0.3, hw * 0.22, hh * 0.4, 3);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(100,200,255,0.75)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.62, -hh + h * 0.18, hw * 1.24, hh * 0.28, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.58, -hh * 0.1, hw * 1.16, hh * 0.4, 5);
    ctx.fill();
  } else if (type === "LIGHTNING") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(0, -hh);
    ctx.lineTo(hw * 0.82, -hh + h * 0.18);
    ctx.lineTo(hw, -hh + h * 0.38);
    ctx.lineTo(hw * 0.72, hh * 0.35);
    ctx.lineTo(hw * 0.88, hh);
    ctx.lineTo(-hw * 0.88, hh);
    ctx.lineTo(-hw * 0.72, hh * 0.35);
    ctx.lineTo(-hw, -hh + h * 0.38);
    ctx.lineTo(-hw * 0.82, -hh + h * 0.18);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = hw * 0.12;
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(-hw * 0.15, -hh * 0.6);
    ctx.lineTo(hw * 0.05, -hh * 0.05);
    ctx.lineTo(-hw * 0.18, hh * 0.1);
    ctx.lineTo(hw * 0.15, hh * 0.6);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(100,200,255,0.75)";
    ctx.beginPath();
    ctx.moveTo(-hw * 0.55, -hh + h * 0.2);
    ctx.lineTo(hw * 0.55, -hh + h * 0.2);
    ctx.lineTo(hw * 0.42, -hh + h * 0.42);
    ctx.lineTo(-hw * 0.42, -hh + h * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.5, -hh * 0.02, hw * 1, hh * 0.38, 4);
    ctx.fill();
  } else if (type === "STREET") {
    const r = hw * 0.18;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-hw + r, -hh + h * 0.1);
    ctx.quadraticCurveTo(-hw, -hh + h * 0.1, -hw, -hh + h * 0.18);
    ctx.lineTo(-hw * 0.95, hh - r);
    ctx.quadraticCurveTo(-hw * 0.95, hh, -hw * 0.95 + r, hh);
    ctx.lineTo(hw * 0.95 - r, hh);
    ctx.quadraticCurveTo(hw * 0.95, hh, hw * 0.95, hh - r);
    ctx.lineTo(hw, -hh + h * 0.18);
    ctx.quadraticCurveTo(hw, -hh + h * 0.1, hw - r, -hh + h * 0.1);
    ctx.lineTo(hw * 0.55, -hh);
    ctx.lineTo(-hw * 0.55, -hh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.68, -hh + h * 0.22, hw * 1.36, hh * 0.3, 3);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.6, -hh * 0.06, hw * 1.2, hh * 0.42, 4);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(-hw * 0.95, -hh * 0.04, hw * 1.9, hh * 0.1);
    ctx.globalAlpha = 1;
  } else if (type === "SPORT") {
    const fw = hw * 0.88;
    const rw = hw * 0.72;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-fw + hw * 0.2, -hh);
    ctx.lineTo(fw - hw * 0.2, -hh);
    ctx.quadraticCurveTo(fw, -hh, fw, -hh + h * 0.08);
    ctx.lineTo(fw * 0.85, hh * 0.65);
    ctx.lineTo(rw, hh);
    ctx.lineTo(-rw, hh);
    ctx.lineTo(-fw * 0.85, hh * 0.65);
    ctx.lineTo(-fw, -hh + h * 0.08);
    ctx.quadraticCurveTo(-fw, -hh, -fw + hw * 0.2, -hh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(100,200,255,0.78)";
    ctx.beginPath();
    ctx.moveTo(-fw * 0.75, -hh + h * 0.2);
    ctx.lineTo(fw * 0.75, -hh + h * 0.2);
    ctx.lineTo(fw * 0.62, -hh + h * 0.44);
    ctx.lineTo(-fw * 0.62, -hh + h * 0.44);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.42)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.55, -hh * 0.05, hw * 1.1, hh * 0.42, 4);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.roundRect(-rw * 0.82, hh * 0.72, rw * 1.64, hh * 0.14, 3);
    ctx.fill();
    ctx.fillRect(-rw * 0.28, hh * 0.58, rw * 0.14, hh * 0.18);
    ctx.fillRect(rw * 0.14, hh * 0.58, rw * 0.14, hh * 0.18);
    ctx.globalAlpha = 1;
  } else {
    const fw = hw * 0.86;
    const rw = hw * 0.76;
    const r = hw * 0.22;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-fw + r, -hh);
    ctx.lineTo(fw - r, -hh);
    ctx.quadraticCurveTo(fw, -hh, fw, -hh + r);
    ctx.lineTo(fw * 0.9, hh * 0.7);
    ctx.lineTo(rw, hh);
    ctx.lineTo(-rw, hh);
    ctx.lineTo(-fw * 0.9, hh * 0.7);
    ctx.lineTo(-fw, -hh + r);
    ctx.quadraticCurveTo(-fw, -hh, -fw + r, -hh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(100,200,255,0.78)";
    ctx.beginPath();
    ctx.roundRect(-fw * 0.72, -hh + h * 0.2, fw * 1.44, hh * 0.28, 3);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.roundRect(-hw * 0.58, -hh * 0.06, hw * 1.16, hh * 0.42, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(100,190,255,0.45)";
    ctx.beginPath();
    ctx.roundRect(-rw * 0.7, hh * 0.35, rw * 1.4, hh * 0.2, 3);
    ctx.fill();
  }
  const wr = w * 0.16;
  const wxOff = hw * 0.88;
  const wyF = -hh + h * 0.24;
  const wyR = hh * 0.68;
  for (const [wc, wy] of [
    [-wxOff, wyF],
    [wxOff, wyF],
    [-wxOff, wyR],
    [wxOff, wyR]
  ]) {
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.ellipse(wc + 1, wy + 2, wr, wr * 0.76, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0d0d1a";
    ctx.beginPath();
    ctx.ellipse(wc, wy, wr, wr * 0.76, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#7a7a8a";
    ctx.beginPath();
    ctx.arc(wc, wy, wr * 0.52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#b0b0c0";
    ctx.beginPath();
    ctx.arc(wc, wy, wr * 0.26, 0, Math.PI * 2);
    ctx.fill();
  }
  const hlY = -hh + h * 0.055;
  const hlXs = type === "RACE" ? hw * 0.22 : type === "JET" ? hw * 0.38 : hw * 0.6;
  const hlR = w * 0.1;
  for (const hx of [-hlXs, hlXs]) {
    ctx.fillStyle = "rgba(255,240,80,0.55)";
    ctx.beginPath();
    ctx.arc(hx, hlY, hlR * 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFE44D";
    ctx.beginPath();
    ctx.ellipse(hx, hlY, hlR, hlR * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(hx, hlY, hlR * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  const tlY = hh - h * 0.055;
  const tlXs = type === "RACE" ? hw * 0.22 : hw * 0.52;
  const tlR = w * 0.09;
  for (const tx of [-tlXs, tlXs]) {
    ctx.fillStyle = "rgba(255,20,20,0.5)";
    ctx.beginPath();
    ctx.arc(tx, tlY, tlR * 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FF1A1A";
    ctx.beginPath();
    ctx.ellipse(tx, tlY, tlR, tlR * 0.62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FF8080";
    ctx.beginPath();
    ctx.arc(tx, tlY, tlR * 0.36, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
function CarSelectScreen() {
  var _a;
  const navigate = useNavigate();
  const { profile, selectCar, selectColor } = useGameStore();
  const initialIdx = CAR_CATALOG.findIndex(
    (c) => c.type === profile.selectedCar
  );
  const [carIdx, setCarIdx] = reactExports.useState(initialIdx >= 0 ? initialIdx : 0);
  const [slideDir, setSlideDir] = reactExports.useState(null);
  const [animKey, setAnimKey] = reactExports.useState(0);
  const car = CAR_CATALOG[carIdx];
  const accentColor = CAR_ACCENT[car.type] ?? "#00D4AA";
  const isUnlocked = profile.unlockedCars.includes(car.type);
  const isEquipped = profile.selectedCar === car.type;
  const totalCars = CAR_CATALOG.length;
  const carColorHex = ((_a = NEON_COLORS.find((c) => c.value === profile.selectedColor)) == null ? void 0 : _a.hex) ?? "#FF6B2B";
  function navigateCar(dir) {
    const newIdx = dir === "next" ? (carIdx + 1) % totalCars : (carIdx - 1 + totalCars) % totalCars;
    setSlideDir(dir === "next" ? "left" : "right");
    setAnimKey((k) => k + 1);
    setCarIdx(newIdx);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 flex flex-col overflow-hidden",
      style: { background: "#0D1B2A" },
      "data-ocid": "car_select.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none",
            style: {
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accentColor}1c 0%, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes slide-left  { from{opacity:0;transform:translateX(50px) scale(0.93);}to{opacity:1;transform:none;} }
        @keyframes slide-right { from{opacity:0;transform:translateX(-50px) scale(0.93);}to{opacity:1;transform:none;} }
        @keyframes badge-pop   { 0%{transform:scale(0.7);opacity:0;}60%{transform:scale(1.12);}100%{transform:scale(1);opacity:1;} }
        .car-enter-left  { animation:slide-left 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .car-enter-right { animation:slide-right 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .badge-pop       { animation:badge-pop 0.3s cubic-bezier(0.22,1,0.36,1) both; }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3 shrink-0",
            style: {
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(10,15,26,0.9)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider active:scale-95",
                  style: {
                    color: "#7A9BB5",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  },
                  onClick: () => navigate({ to: "/menu" }),
                  "data-ocid": "car_select.back_button",
                  children: "← Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display font-black text-sm tracking-[0.18em] uppercase",
                  style: { color: "#FFFFFF" },
                  children: "SELECT CAR"
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 overflow-y-auto px-4 pt-3 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-base active:scale-90",
                style: {
                  background: "rgba(255,255,255,0.06)",
                  border: `2px solid ${accentColor}55`,
                  color: accentColor
                },
                onClick: () => navigateCar("prev"),
                "data-ocid": "car_select.prev_button",
                "aria-label": "Previous car",
                children: "◀"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex-1 flex flex-col items-center justify-center rounded-2xl py-4 px-3 relative overflow-hidden ${slideDir === "left" ? "car-enter-left" : "car-enter-right"}`,
                style: {
                  background: `linear-gradient(160deg,rgba(255,255,255,0.03) 0%,rgba(${hexToRgb(accentColor)},0.07) 100%)`,
                  border: `1.5px solid ${accentColor}44`,
                  minHeight: "158px"
                },
                children: [
                  isEquipped && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-2 right-2 px-2 py-0.5 rounded-lg font-display font-black uppercase badge-pop",
                      style: {
                        background: "linear-gradient(135deg,#00D4AA,#00AA88)",
                        color: "#0D1B2A",
                        fontSize: "0.56rem"
                      },
                      children: "EQUIPPED"
                    }
                  ),
                  !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-2 right-2 px-2 py-0.5 rounded-lg font-display font-bold uppercase badge-pop",
                      style: {
                        background: "rgba(255,68,68,0.12)",
                        color: "#FF6666",
                        border: "1px solid rgba(255,68,68,0.3)",
                        fontSize: "0.56rem"
                      },
                      children: "🔒 LOCKED"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        filter: isUnlocked ? `drop-shadow(0 0 12px ${accentColor}) drop-shadow(0 0 22px ${accentColor}44)` : "grayscale(0.4) opacity(0.5)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CarIllustration,
                        {
                          carType: car.type,
                          color: carColorHex,
                          accentColor,
                          size: 106,
                          locked: !isUnlocked
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "font-display font-black text-xl tracking-[0.1em] uppercase",
                        style: {
                          color: isUnlocked ? accentColor : "#4A6A8A",
                          textShadow: isUnlocked ? `0 0 14px ${accentColor}44` : "none"
                        },
                        children: car.displayName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", style: { color: "#5A7A99" }, children: car.description })
                  ] })
                ]
              },
              `car-${animKey}`
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-base active:scale-90",
                style: {
                  background: "rgba(255,255,255,0.06)",
                  border: `2px solid ${accentColor}55`,
                  color: accentColor
                },
                onClick: () => navigateCar("next"),
                "data-ocid": "car_select.next_button",
                "aria-label": "Next car",
                children: "▶"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1.5 mb-3", children: CAR_CATALOG.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              style: {
                width: i === carIdx ? "14px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background: i === carIdx ? accentColor : "rgba(255,255,255,0.18)",
                boxShadow: i === carIdx ? `0 0 5px ${accentColor}` : "none",
                transition: "all 0.3s"
              },
              onClick: () => {
                setSlideDir(i > carIdx ? "left" : "right");
                setAnimKey((k) => k + 1);
                setCarIdx(i);
              },
              "data-ocid": `car_select.dot.${i + 1}`,
              "aria-label": `Car ${i + 1}`
            },
            c.type
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-xl px-4 py-3 mb-3 flex flex-col gap-2",
              style: {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)"
              },
              children: [car.stats.speed, car.stats.handling, car.stats.acceleration].map(
                (val, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatBar,
                  {
                    label: STAT_LABELS[i],
                    value: val,
                    color: STAT_COLORS[i]
                  },
                  STAT_LABELS[i]
                )
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl px-4 py-2.5 mb-3",
              style: {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold uppercase mb-2",
                    style: {
                      color: "#5A7A99",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em"
                    },
                    children: "PICK COLOR"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around", children: NEON_COLORS.map((c) => {
                  const isActive = profile.selectedColor === c.value;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex flex-col items-center gap-1 active:scale-90",
                      onClick: () => selectColor(c.value),
                      "data-ocid": `car_select.color_${c.label.toLowerCase()}`,
                      "aria-label": c.label,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-7 h-7 rounded-full relative",
                            style: {
                              background: c.hex,
                              border: isActive ? "2.5px solid #FFF" : "2.5px solid transparent",
                              boxShadow: isActive ? `0 0 0 2px ${c.hex}44,0 0 12px ${c.hex}` : `0 0 5px ${c.hex}44`,
                              transition: "all 0.2s"
                            },
                            children: isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "absolute inset-0 flex items-center justify-center font-black",
                                style: { color: "#0D1B2A", fontSize: "0.75rem" },
                                children: "✓"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              color: isActive ? c.hex : "#3A5A78",
                              fontSize: "0.5rem",
                              fontWeight: 700,
                              letterSpacing: "0.05em"
                            },
                            children: c.label
                          }
                        )
                      ]
                    },
                    c.value
                  );
                }) })
              ]
            }
          ),
          !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 badge-pop",
              style: {
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.22)"
              },
              "data-ocid": "car_select.lock_info",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#FFD700" }, children: "🔒" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-bold text-xs",
                    style: { color: "#FFD700" },
                    children: [
                      "Reach Level ",
                      car.unlockLevel,
                      " to unlock",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#FFFFFF55" }, children: [
                        "(",
                        xpForLevel(car.unlockLevel).toLocaleString(),
                        " XP)"
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 pt-2 shrink-0",
            style: {
              paddingBottom: "max(20px,env(safe-area-inset-bottom))",
              background: "linear-gradient(to top,#0D1B2A 70%,transparent)",
              borderTop: "1px solid rgba(255,255,255,0.06)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !isUnlocked,
                className: "w-full py-4 rounded-2xl font-display font-black text-base tracking-[0.1em] uppercase active:scale-95",
                style: isEquipped ? {
                  background: "linear-gradient(135deg,#00D4AA,#00AA88)",
                  color: "#0D1B2A",
                  boxShadow: "0 0 22px #00D4AA44"
                } : isUnlocked ? {
                  background: "linear-gradient(135deg,#FF6B2B,#FF9F1C)",
                  color: "#0D1B2A",
                  boxShadow: "0 0 22px #FF6B2B44"
                } : {
                  background: "#131E2E",
                  color: "#4A6A8A",
                  border: "1.5px solid #243050",
                  cursor: "not-allowed"
                },
                onClick: () => {
                  if (isUnlocked) {
                    selectCar(car.type);
                    navigate({ to: "/menu" });
                  }
                },
                "data-ocid": "car_select.confirm_button",
                children: isEquipped ? "✓ EQUIPPED" : isUnlocked ? "EQUIP CAR →" : `🔒 Unlock at Level ${car.unlockLevel}`
              }
            )
          }
        )
      ]
    }
  );
}
export {
  CarSelectScreen as default
};
