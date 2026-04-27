import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-B6JfqekL.js";
import { A as AI_PERSONALITIES, g as getAIDifficulty, r as randomAIName, a as randomAICarType, b as AI_SPEED_MULTIPLIERS, c as getAITaunt } from "./aiOpponents-DxngDPPo.js";
import { g as getCarData } from "./cars-BBAU-OP8.js";
import { g as getMapData } from "./maps-BAIToim9.js";
import { g as getPowerUpData } from "./powerups-Ccl822wB.js";
import { u as useGameStore, P as PowerUpType, M as MapTheme, G as GameMode } from "./gameStore-sCxKMV8R.js";
const LANE_COUNT = 5;
const ROAD_RATIO = 0.82;
const CAR_W = 36;
const CAR_H = 58;
const TRAFFIC_W = 34;
const TRAFFIC_H = 56;
const COIN_R = 12;
const CAR_ACCENT = {
  BASIC: "#00D4AA",
  SPORT: "#FF6B2B",
  STREET: "#B44FFF",
  JET: "#00BFFF",
  RACE: "#FF3EA5",
  HYPER: "#FFD700",
  LIGHTNING: "#7DF9FF"
};
const TRAFFIC_STYLE_COUNT = 8;
const FUEL_W = 30;
const FUEL_H = 20;
const PUP_R = 16;
const BASE_SPEED = 310;
const FUEL_DRAIN = 1.4;
const LANE_LERP = 8;
const DENSITY_RATE = {
  low: 2.2,
  medium: 1.55,
  high: 0.9
};
const TRAFFIC_COLORS = [
  "#E53935",
  "#546E7A",
  "#1565C0",
  "#37474F",
  "#BF360C",
  "#4A148C"
];
const PUP_COLORS = {
  [PowerUpType.SHIELD]: "#00D4AA",
  [PowerUpType.SPEED_BOOST]: "#FF6B2B",
  [PowerUpType.COIN_MAGNET]: "#FFD700",
  [PowerUpType.INVINCIBILITY]: "#B44FFF",
  [PowerUpType.TIME_SLOW]: "#4FC3F7",
  [PowerUpType.FUEL_PACK]: "#69F0AE",
  [PowerUpType.DOUBLE_COINS]: "#FFD700"
};
const PUP_ICONS = [
  PowerUpType.SHIELD,
  PowerUpType.SPEED_BOOST,
  PowerUpType.COIN_MAGNET,
  PowerUpType.INVINCIBILITY,
  PowerUpType.TIME_SLOW,
  PowerUpType.FUEL_PACK,
  PowerUpType.DOUBLE_COINS
];
function GameScreen() {
  const navigate = useNavigate();
  const pauseGame = useGameStore((s) => s.pauseGame);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const endGame = useGameStore((s) => s.endGame);
  const updateGS = useGameStore((s) => s.updateGameState);
  const navigateTo = useGameStore((s) => s.navigateTo);
  const initAIOpponent = useGameStore((s) => s.initAIOpponent);
  const updateAIOpponent = useGameStore((s) => s.updateAIOpponent);
  const setAIRaceResult = useGameStore((s) => s.setAIRaceResult);
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  const lastTRef = reactExports.useRef(0);
  const trafficRef = reactExports.useRef([]);
  const coinsRef = reactExports.useRef([]);
  const fuelRef2 = reactExports.useRef([]);
  const pupsRef = reactExports.useRef([]);
  const partRef = reactExports.useRef([]);
  const popRef = reactExports.useRef([]);
  const trailRef = reactExports.useRef([]);
  const idRef = reactExports.useRef(0);
  const roadOff = reactExports.useRef(0);
  const playerLane = reactExports.useRef(2);
  const playerX = reactExports.useRef(0);
  const targetX = reactExports.useRef(0);
  const scoreRef = reactExports.useRef(0);
  const coinsRef2 = reactExports.useRef(0);
  const fuelRef = reactExports.useRef(100);
  const distRef = reactExports.useRef(0);
  const timeRef = reactExports.useRef(180);
  const speedRef = reactExports.useRef(BASE_SPEED);
  const shieldRef = reactExports.useRef(false);
  const invincRef = reactExports.useRef(false);
  const multRef = reactExports.useRef(1);
  const activePups = reactExports.useRef(/* @__PURE__ */ new Map());
  const spawns = reactExports.useRef({ traffic: 0, coin: 0, fuel: 0, pup: 0, sameDir: 0 });
  const pausedRef = reactExports.useRef(false);
  const deadRef = reactExports.useRef(false);
  const hudTick = reactExports.useRef(0);
  const activePupSnap = reactExports.useRef([]);
  const frameCountRef = reactExports.useRef(0);
  const aiRuntimeRef = reactExports.useRef(null);
  const positionSwapsRef = reactExports.useRef(0);
  const tauntCooldownRef = reactExports.useRef(0);
  const aiPowerUpTimerRef = reactExports.useRef(0);
  const aiPowerUpNextRef = reactExports.useRef(8 + Math.random() * 7);
  const activeTauntTimerRef = reactExports.useRef(0);
  const tauntNextRef = reactExports.useRef(12 + Math.random() * 8);
  const [hud, setHud] = reactExports.useState({
    score: 0,
    coins: 0,
    fuel: 100,
    timeLeft: 180,
    dist: 0,
    paused: false,
    activePups: [],
    mult: 1,
    aiScore: 0,
    aiName: "",
    aiLeading: false
  });
  const [activeTaunt, setActiveTaunt] = reactExports.useState(null);
  const [tauntVisible, setTauntVisible] = reactExports.useState(false);
  const tauntVisibleRef = reactExports.useRef(false);
  reactExports.useEffect(
    () => useGameStore.subscribe((s) => {
      shieldRef.current = s.gameState.isShielded;
      invincRef.current = s.gameState.isInvincible;
    }),
    []
  );
  reactExports.useEffect(() => {
    const storeState = useGameStore.getState();
    const gs = storeState.gameState;
    fuelRef.current = gs.fuel;
    timeRef.current = gs.timeLeft;
    scoreRef.current = gs.score;
    coinsRef2.current = gs.coins;
    playerLane.current = gs.lane;
    speedRef.current = BASE_SPEED;
    deadRef.current = false;
    pausedRef.current = false;
    positionSwapsRef.current = 0;
    frameCountRef.current = 0;
    const playerLevel = storeState.profile.level;
    const aiDifficulty = getAIDifficulty(playerLevel);
    const aiName = randomAIName();
    const aiCarType = randomAICarType();
    const personality = AI_PERSONALITIES[aiName];
    const opponent = {
      name: aiName,
      carType: aiCarType,
      carColor: personality.color,
      glowColor: personality.glowColor,
      difficulty: aiDifficulty,
      score: 0,
      lane: 2,
      positionY: 150,
      lastPowerUpGrab: null,
      powerUpGrabTimer: 0,
      isLeading: false
    };
    initAIOpponent(opponent);
    aiRuntimeRef.current = {
      ...opponent,
      driftDir: Math.random() < 0.5 ? 1 : -1,
      driftTimer: 2 + Math.random() * 3
    };
  }, [initAIOpponent]);
  const nid = reactExports.useCallback(() => ++idRef.current, []);
  const laneX = reactExports.useCallback((lane, W) => {
    const rw = W * ROAD_RATIO;
    const rx = (W - rw) / 2;
    const lw = rw / LANE_COUNT;
    return rx + lw * lane + lw / 2;
  }, []);
  const addParts = reactExports.useCallback(
    (x, y, color, n = 8) => {
      for (let i = 0; i < n; i++) {
        const a = Math.PI * 2 * i / n + Math.random() * 0.5;
        const sp = 60 + Math.random() * 120;
        partRef.current.push({
          id: nid(),
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          color,
          life: 1,
          maxL: 0.5 + Math.random() * 0.5,
          r: 3 + Math.random() * 4
        });
      }
    },
    [nid]
  );
  const addPopup = reactExports.useCallback(
    (x, y, text) => {
      popRef.current.push({ id: nid(), x, y, text, life: 1, vy: -80 });
    },
    [nid]
  );
  const showTaunt = reactExports.useCallback((message) => {
    setActiveTaunt(message);
    setTauntVisible(true);
    tauntVisibleRef.current = true;
    activeTauntTimerRef.current = 2.8;
    tauntNextRef.current = 12 + Math.random() * 8;
    tauntCooldownRef.current = 5;
  }, []);
  const crashGame = reactExports.useCallback(() => {
    if (deadRef.current) return;
    deadRef.current = true;
    cancelAnimationFrame(rafRef.current);
    const ai = aiRuntimeRef.current;
    if (ai) {
      setAIRaceResult({
        playerWon: scoreRef.current >= ai.score,
        aiName: ai.name,
        aiCarType: ai.carType,
        aiDifficulty: ai.difficulty,
        aiScore: Math.floor(ai.score),
        positionSwaps: positionSwapsRef.current,
        finalMargin: Math.abs(scoreRef.current - ai.score)
      });
    }
    endGame();
    updateGS({
      score: scoreRef.current,
      coins: coinsRef2.current,
      fuel: fuelRef.current,
      distance: distRef.current,
      isGameOver: true
    });
    navigateTo("crash");
    navigate({ to: "/crash" });
  }, [endGame, updateGS, navigateTo, navigate, setAIRaceResult]);
  const resultsGame = reactExports.useCallback(() => {
    if (deadRef.current) return;
    deadRef.current = true;
    cancelAnimationFrame(rafRef.current);
    const ai = aiRuntimeRef.current;
    if (ai) {
      setAIRaceResult({
        playerWon: scoreRef.current >= ai.score,
        aiName: ai.name,
        aiCarType: ai.carType,
        aiDifficulty: ai.difficulty,
        aiScore: Math.floor(ai.score),
        positionSwaps: positionSwapsRef.current,
        finalMargin: Math.abs(scoreRef.current - ai.score)
      });
    }
    endGame();
    updateGS({
      score: scoreRef.current,
      coins: coinsRef2.current,
      fuel: fuelRef.current,
      distance: distRef.current,
      timeLeft: 0,
      isGameOver: true
    });
    navigateTo("results");
    navigate({ to: "/results" });
  }, [endGame, updateGS, navigateTo, navigate, setAIRaceResult]);
  const activatePup = reactExports.useCallback(
    (type, W, H) => {
      const d = getPowerUpData(type);
      if (d.duration === 0) {
        if (type === PowerUpType.FUEL_PACK) {
          fuelRef.current = Math.min(100, fuelRef.current + 50);
          addParts(W / 2, H * 0.78, "#69F0AE", 12);
          addPopup(W / 2, H * 0.72, "+50 FUEL!");
        }
        return;
      }
      activePups.current.set(type, d.duration);
      if (type === PowerUpType.SHIELD) shieldRef.current = true;
      if (type === PowerUpType.INVINCIBILITY) invincRef.current = true;
      if (type === PowerUpType.SPEED_BOOST) speedRef.current = BASE_SPEED * 2.2;
      if (type === PowerUpType.DOUBLE_COINS) multRef.current = 2;
      addParts(W / 2, H * 0.78, PUP_COLORS[type], 14);
      addPopup(W / 2, H * 0.72, `${d.displayName.toUpperCase()}!`);
    },
    [addParts, addPopup]
  );
  const drawHighwayScenery = reactExports.useCallback(
    (ctx, rx, rw, _W, H, offset) => {
      ctx.fillStyle = "#1a3a0a";
      ctx.fillRect(rx - 10, 0, 10, H);
      ctx.fillRect(rx + rw, 0, 10, H);
      const treeSpacing = 90;
      const treeCount = Math.ceil(H / treeSpacing) + 2;
      const scroll = offset % treeSpacing;
      for (let i = 0; i < treeCount; i++) {
        const ty = i * treeSpacing - scroll;
        for (const [tx, tw, th, shade] of [
          [rx - 28, 20, 38, "#2d7a2d"],
          [rx - 52, 16, 30, "#1a4a1a"]
        ]) {
          const fy = ty + (tw === 20 ? 0 : treeSpacing * 0.45);
          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#1a4a1a";
          ctx.fillStyle = shade;
          ctx.beginPath();
          ctx.moveTo(tx + tw / 2, fy - th);
          ctx.lineTo(tx, fy + 4);
          ctx.lineTo(tx + tw, fy + 4);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = `${shade}cc`;
          ctx.beginPath();
          ctx.moveTo(tx + tw / 2, fy - th * 0.65);
          ctx.lineTo(tx - 4, fy + 10);
          ctx.lineTo(tx + tw + 4, fy + 10);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#3d2008";
          ctx.fillRect(tx + tw / 2 - 3, fy + 4, 6, 10);
          ctx.restore();
        }
        for (const [tx, tw, th, shade] of [
          [rx + rw + 8, 20, 38, "#2d7a2d"],
          [rx + rw + 34, 16, 30, "#1a4a1a"]
        ]) {
          const fy = ty + (tw === 20 ? 0 : treeSpacing * 0.45);
          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#1a4a1a";
          ctx.fillStyle = shade;
          ctx.beginPath();
          ctx.moveTo(tx + tw / 2, fy - th);
          ctx.lineTo(tx, fy + 4);
          ctx.lineTo(tx + tw, fy + 4);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = `${shade}cc`;
          ctx.beginPath();
          ctx.moveTo(tx + tw / 2, fy - th * 0.65);
          ctx.lineTo(tx - 4, fy + 10);
          ctx.lineTo(tx + tw + 4, fy + 10);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#3d2008";
          ctx.fillRect(tx + tw / 2 - 3, fy + 4, 6, 10);
          ctx.restore();
        }
      }
    },
    []
  );
  const drawCityScenery = reactExports.useCallback(
    (ctx, rx, rw, W, H, offset) => {
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = "#B44FFF";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
      const cols = [
        {
          x: 0,
          w: rx * 0.44,
          heightRatio: 0.7,
          speed: 0.06,
          winCol: "#B44FFF"
        },
        {
          x: rx * 0.46,
          w: rx * 0.5,
          heightRatio: 0.55,
          speed: 0.045,
          winCol: "#4FC3F7"
        },
        {
          x: rx + rw + 2,
          w: rx * 0.5,
          heightRatio: 0.6,
          speed: 0.05,
          winCol: "#B44FFF"
        },
        {
          x: rx + rw + rx * 0.54,
          w: rx * 0.44,
          heightRatio: 0.75,
          speed: 0.065,
          winCol: "#FFD700"
        }
      ];
      const bSpacing = 80;
      const bCount = Math.ceil(H / bSpacing) + 2;
      for (const col of cols) {
        const scroll = offset * col.speed % bSpacing;
        for (let i = 0; i < bCount; i++) {
          const bTop = i * bSpacing - scroll;
          const bH = H * (col.heightRatio * (0.7 + (i * 7 + col.x) % 5 * 0.1));
          const bActualTop = bTop;
          ctx.fillStyle = i % 2 === 0 ? "#0D1525" : "#12192e";
          ctx.fillRect(col.x, bActualTop, col.w, Math.min(bH, bSpacing - 4));
          const winW = 5;
          const winH = 4;
          const gapX = 9;
          const gapY = 10;
          for (let wy = bActualTop + 8; wy < bActualTop + Math.min(bH, bSpacing - 8); wy += gapY) {
            for (let wx = col.x + 5; wx < col.x + col.w - 5; wx += gapX) {
              const lit = ((i + Math.floor(wx / gapX) + Math.floor(wy / gapY)) * 13 + 7) % 17 > 5;
              if (lit) {
                ctx.fillStyle = `${col.winCol}99`;
                ctx.fillRect(wx, wy, winW, winH);
              }
            }
          }
        }
      }
    },
    []
  );
  const drawCanyonScenery = reactExports.useCallback(
    (ctx, rx, rw, W, H, offset) => {
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "#FF6B2B";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
      ctx.fillStyle = "#8a5a1a";
      ctx.fillRect(rx - 12, 0, 12, H);
      ctx.fillRect(rx + rw, 0, 12, H);
      const itemSpacing = 110;
      const itemCount = Math.ceil(H / itemSpacing) + 2;
      const scroll = offset % itemSpacing;
      for (let i = 0; i < itemCount; i++) {
        const iy = i * itemSpacing - scroll;
        const seed = (i * 17 + 3) % 7;
        if (seed < 4) {
          const rockX = rx - 38 + i * 5 % 12;
          const rH = 24 + seed * 6;
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#7a4020";
          ctx.fillStyle = "#6b3a18";
          ctx.beginPath();
          ctx.roundRect(rockX, iy - rH / 2, 32 + seed * 3, rH, 6);
          ctx.fill();
          ctx.fillStyle = "#8a4e22";
          ctx.roundRect(rockX + 4, iy - rH / 2 - 8, 22, rH * 0.65, 5);
          ctx.fill();
          ctx.restore();
        } else {
          const cx = rx - 30 + i * 3 % 8;
          const cH = 30 + seed * 4;
          ctx.save();
          ctx.strokeStyle = "#2d5c1a";
          ctx.lineWidth = 7;
          ctx.lineCap = "round";
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#1a3a0a";
          ctx.beginPath();
          ctx.moveTo(cx, iy + cH / 2);
          ctx.lineTo(cx, iy - cH / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, iy - cH * 0.1);
          ctx.lineTo(cx - 12, iy - cH * 0.1);
          ctx.lineTo(cx - 12, iy - cH * 0.35);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, iy + cH * 0.05);
          ctx.lineTo(cx + 10, iy + cH * 0.05);
          ctx.lineTo(cx + 10, iy - cH * 0.18);
          ctx.stroke();
          ctx.restore();
        }
        const rseed = (i * 11 + 5) % 7;
        if (rseed < 4) {
          const rockX = rx + rw + 6 + i * 7 % 10;
          const rH = 22 + rseed * 7;
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#7a4020";
          ctx.fillStyle = "#6b3a18";
          ctx.beginPath();
          ctx.roundRect(rockX, iy - rH / 2, 30 + rseed * 3, rH, 6);
          ctx.fill();
          ctx.fillStyle = "#8a4e22";
          ctx.roundRect(rockX + 3, iy - rH / 2 - 6, 20, rH * 0.6, 4);
          ctx.fill();
          ctx.restore();
        } else {
          const cx = rx + rw + 20 + i * 4 % 10;
          const cH = 28 + rseed * 5;
          ctx.save();
          ctx.strokeStyle = "#2d5c1a";
          ctx.lineWidth = 7;
          ctx.lineCap = "round";
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#1a3a0a";
          ctx.beginPath();
          ctx.moveTo(cx, iy + cH / 2);
          ctx.lineTo(cx, iy - cH / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, iy - cH * 0.08);
          ctx.lineTo(cx - 11, iy - cH * 0.08);
          ctx.lineTo(cx - 11, iy - cH * 0.32);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, iy + cH * 0.08);
          ctx.lineTo(cx + 9, iy + cH * 0.08);
          ctx.lineTo(cx + 9, iy - cH * 0.15);
          ctx.stroke();
          ctx.restore();
        }
      }
      ctx.save();
      const lgrd = ctx.createLinearGradient(0, 0, rx, 0);
      lgrd.addColorStop(0, "#3D1A0688");
      lgrd.addColorStop(0.6, "#2A120844");
      lgrd.addColorStop(1, "rgba(42,18,8,0)");
      ctx.fillStyle = lgrd;
      ctx.fillRect(0, 0, rx, H);
      const rgrd = ctx.createLinearGradient(W, 0, W - rx, 0);
      rgrd.addColorStop(0, "#3D1A0688");
      rgrd.addColorStop(0.6, "#2A120844");
      rgrd.addColorStop(1, "rgba(42,18,8,0)");
      ctx.fillStyle = rgrd;
      ctx.fillRect(W - rx, 0, rx, H);
      ctx.restore();
    },
    []
  );
  const drawSunsetScenery = reactExports.useCallback(
    (ctx, rx, rw, W, H, offset) => {
      const leftGrad = ctx.createLinearGradient(0, 0, 0, H);
      leftGrad.addColorStop(0, "#FF6B35");
      leftGrad.addColorStop(0.5, "#FF1493");
      leftGrad.addColorStop(1, "#6B00AA");
      ctx.fillStyle = leftGrad;
      ctx.fillRect(0, 0, rx, H);
      const rightGrad = ctx.createLinearGradient(0, 0, 0, H);
      rightGrad.addColorStop(0, "#FF6B35");
      rightGrad.addColorStop(0.5, "#FF1493");
      rightGrad.addColorStop(1, "#6B00AA");
      ctx.fillStyle = rightGrad;
      ctx.fillRect(rx + rw, 0, W - rx - rw, H);
      ctx.fillStyle = "#E8C87A";
      ctx.fillRect(rx - 20, 0, 20, H);
      ctx.fillRect(rx + rw, 0, 20, H);
      const leftW = rx - 20;
      const lampSpacing = 180;
      const lampCount = Math.ceil(H / lampSpacing) + 2;
      const lampScroll = offset % lampSpacing;
      for (let i = 0; i < lampCount; i++) {
        const ly = i * lampSpacing - lampScroll;
        const lx = leftW * 0.72;
        ctx.save();
        ctx.fillStyle = "#2a1a00";
        ctx.fillRect(lx - 2, ly - 40, 4, 50);
        ctx.fillRect(lx - 2, ly - 40, 14, 3);
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#FF8C00";
        ctx.fillStyle = "#FF8C00";
        ctx.beginPath();
        ctx.arc(lx + 12, ly - 40, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(lx + 12, ly - 40, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      const palmSpacingL = 220;
      const palmCountL = Math.ceil(H / palmSpacingL) + 2;
      const palmScrollL = offset % palmSpacingL;
      for (let i = 0; i < palmCountL; i++) {
        const py = i * palmSpacingL - palmScrollL;
        const px = leftW * 0.35 + i * 13 % 18;
        const tH = 70 + i * 7 % 25;
        ctx.save();
        ctx.strokeStyle = "#6B3A1F";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px, py + tH * 0.5);
        ctx.quadraticCurveTo(px + 6, py, px + 10, py - tH * 0.5);
        ctx.stroke();
        ctx.strokeStyle = "#1A4A00";
        ctx.lineWidth = 3;
        const topX = px + 10;
        const topY = py - tH * 0.5;
        const fronds = [
          [-28, -16],
          [-18, -28],
          [0, -32],
          [20, -24],
          [28, -10]
        ];
        for (const [fx, fy] of fronds) {
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.quadraticCurveTo(
            topX + fx * 0.5,
            topY + fy * 0.5,
            topX + fx,
            topY + fy
          );
          ctx.stroke();
        }
        ctx.restore();
      }
      const shopSpacing = 400;
      const shopCount = Math.ceil(H / shopSpacing) + 2;
      const shopScroll = offset % shopSpacing;
      for (let i = 0; i < shopCount; i++) {
        const sy = i * shopSpacing - shopScroll;
        const sx = leftW * 0.08;
        ctx.save();
        ctx.fillStyle = "#3a1a00";
        ctx.fillRect(sx, sy - 50, 62, 50);
        ctx.fillStyle = "#FF6B00";
        ctx.fillRect(sx - 2, sy - 54, 66, 8);
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#FFD700";
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(sx + 6, sy - 72, 50, 16);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#1a0a00";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SHOP", sx + 31, sy - 64);
        ctx.fillStyle = "#FFD70088";
        ctx.fillRect(sx + 6, sy - 40, 16, 14);
        ctx.fillRect(sx + 28, sy - 40, 16, 14);
        ctx.fillRect(sx + 50, sy - 40, 8, 14);
        ctx.restore();
      }
      const gasSpacing = 800;
      const gasCount = Math.ceil(H / gasSpacing) + 2;
      const gasScroll = offset % gasSpacing;
      for (let i = 0; i < gasCount; i++) {
        const gy = i * gasSpacing - gasScroll;
        const gx = leftW * 0.05;
        ctx.save();
        ctx.fillStyle = "#FF8C00";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#FFD700";
        ctx.fillRect(gx, gy - 30, 88, 12);
        ctx.shadowBlur = 0;
        for (const [px2] of [[gx + 14], [gx + 58]]) {
          ctx.fillStyle = "#CC4400";
          ctx.fillRect(px2, gy - 18, 12, 22);
          ctx.fillStyle = "#FF8C00";
          ctx.fillRect(px2 + 2, gy - 26, 8, 10);
        }
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(gx, gy - 18, 88, 4);
        ctx.restore();
      }
      const parkedSpacing = 350;
      const parkedCount = Math.ceil(H / parkedSpacing) + 2;
      const parkedScroll = offset * 0.3 % parkedSpacing;
      const warmCarColors = ["#CC2200", "#FF6600", "#FF4422", "#CC8800"];
      for (let i = 0; i < parkedCount; i++) {
        const cy = i * parkedSpacing - parkedScroll;
        const cx = leftW * 0.08 + i * 11 % 12;
        const col = warmCarColors[i % warmCarColors.length];
        ctx.save();
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.roundRect(cx, cy - 10, 36, 20, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(cx + 7, cy - 6, 22, 10);
        ctx.restore();
      }
      const rsX = rx + rw + 20;
      const rsW = W - rsX;
      const aptSpacing = 300;
      const aptCount = Math.ceil(H / aptSpacing) + 2;
      const aptScroll = offset % aptSpacing;
      for (let i = 0; i < aptCount; i++) {
        const ay = i * aptSpacing - aptScroll;
        const ax = rsX + i * 9 % Math.max(1, rsW - 82);
        ctx.save();
        ctx.fillStyle = "#2a1400";
        ctx.fillRect(ax, ay - 70, 80, 70);
        ctx.fillStyle = "#1a0a00";
        ctx.fillRect(ax - 2, ay - 72, 84, 5);
        const winCols = [ax + 8, ax + 32, ax + 56];
        const winRows = [ay - 58, ay - 36];
        for (const wx of winCols) {
          for (const wy of winRows) {
            const lit = (Math.floor(wx) + Math.floor(wy) + i) * 7 % 11 > 3;
            ctx.fillStyle = lit ? "#FFD70099" : "#FF880033";
            ctx.fillRect(wx, wy, 14, 12);
          }
        }
        ctx.restore();
      }
      const billSpacing = 500;
      const billCount = Math.ceil(H / billSpacing) + 2;
      const billScroll = offset % billSpacing;
      for (let i = 0; i < billCount; i++) {
        const by = i * billSpacing - billScroll;
        const bx = rsX + Math.max(0, rsW * 0.4);
        ctx.save();
        ctx.fillStyle = "#333";
        ctx.fillRect(bx + 18, by - 50, 5, 55);
        const signGrad = ctx.createLinearGradient(
          bx,
          by - 65,
          bx + 55,
          by - 65
        );
        signGrad.addColorStop(0, "#FF6B00");
        signGrad.addColorStop(1, "#FFD700");
        ctx.fillStyle = signGrad;
        ctx.fillRect(bx, by - 70, 55, 20);
        ctx.fillStyle = "#1a0a00";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AD", bx + 27, by - 60);
        ctx.restore();
      }
      const busSpacing = 600;
      const busCount = Math.ceil(H / busSpacing) + 2;
      const busScroll = offset % busSpacing;
      for (let i = 0; i < busCount; i++) {
        const bsy = i * busSpacing - busScroll;
        const bsx = rsX + 4;
        ctx.save();
        ctx.fillStyle = "#555";
        ctx.fillRect(bsx, bsy - 42, 44, 5);
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "#88CCFF";
        ctx.fillRect(bsx, bsy - 37, 5, 37);
        ctx.fillRect(bsx + 39, bsy - 37, 5, 37);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#885500";
        ctx.fillRect(bsx + 8, bsy - 12, 28, 5);
        ctx.fillRect(bsx + 10, bsy - 12, 4, 12);
        ctx.fillRect(bsx + 30, bsy - 12, 4, 12);
        ctx.restore();
      }
      const palmSpacingR = 250;
      const palmCountR = Math.ceil(H / palmSpacingR) + 2;
      const palmScrollR = (offset + 120) % palmSpacingR;
      for (let i = 0; i < palmCountR; i++) {
        const py = i * palmSpacingR - palmScrollR;
        const px = rsX + rsW * 0.6 + i * 11 % 20;
        const tH = 60 + i * 9 % 30;
        ctx.save();
        ctx.strokeStyle = "#6B3A1F";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px, py + tH * 0.5);
        ctx.quadraticCurveTo(px - 5, py, px - 8, py - tH * 0.5);
        ctx.stroke();
        ctx.strokeStyle = "#1A4A00";
        ctx.lineWidth = 3;
        const topX = px - 8;
        const topY = py - tH * 0.5;
        const fronds2 = [
          [-26, -14],
          [-14, -26],
          [2, -30],
          [20, -22],
          [26, -8]
        ];
        for (const [fx, fy] of fronds2) {
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.quadraticCurveTo(
            topX + fx * 0.5,
            topY + fy * 0.5,
            topX + fx,
            topY + fy
          );
          ctx.stroke();
        }
        ctx.restore();
      }
      const bumpSpacing = 300;
      const bumpCount = Math.ceil(H / bumpSpacing) + 2;
      const bumpScroll = offset % bumpSpacing;
      for (let i = 0; i < bumpCount; i++) {
        const bumpY = i * bumpSpacing - bumpScroll;
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(rx + 4, bumpY - 4, rw - 8, 8);
        ctx.fillStyle = "#CC8800";
        ctx.fillRect(rx + 4, bumpY - 4, rw - 8, 2);
      }
      const coneSpacing = 700;
      const coneCount = Math.ceil(H / coneSpacing) + 2;
      const coneScroll = offset % coneSpacing;
      for (let i = 0; i < coneCount; i++) {
        const coneBaseY = i * coneSpacing - coneScroll;
        const lw2 = rw / LANE_COUNT;
        for (let c = 0; c < 4; c++) {
          const cx2 = rx + lw2 * 1 + c * (lw2 * 0.28);
          const cy2 = coneBaseY + c * 14;
          ctx.save();
          ctx.fillStyle = "#FF6600";
          ctx.beginPath();
          ctx.moveTo(cx2, cy2 - 20);
          ctx.lineTo(cx2 - 9, cy2 + 2);
          ctx.lineTo(cx2 + 9, cy2 + 2);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.8)";
          ctx.fillRect(cx2 - 5, cy2 - 10, 10, 4);
          ctx.restore();
        }
      }
      const bridgeSpacing = 1e3;
      const bridgeCount = Math.ceil(H / bridgeSpacing) + 2;
      const bridgeScroll = offset % bridgeSpacing;
      for (let i = 0; i < bridgeCount; i++) {
        const bridgeY = i * bridgeSpacing - bridgeScroll + H * 0.15;
        ctx.save();
        ctx.fillStyle = "#444";
        ctx.fillRect(0, bridgeY, W, 22);
        ctx.fillStyle = "#333";
        ctx.fillRect(0, bridgeY + 18, W, 6);
        ctx.globalAlpha = 0.38;
        ctx.fillStyle = "#000";
        ctx.fillRect(rx, bridgeY + 24, rw, 40);
        ctx.restore();
      }
    },
    []
  );
  const drawRainyScenery = reactExports.useCallback(
    (ctx, rx, rw, W, H, offset) => {
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, rx, H);
      ctx.fillRect(rx + rw, 0, W - rx - rw, H);
      const sideWidth = rx;
      ctx.save();
      ctx.lineWidth = 1;
      for (let side = 0; side < 2; side++) {
        const sideX = side === 0 ? 0 : rx + rw;
        for (let i = 0; i < 20; i++) {
          const rx2 = sideX + i * 31 % Math.max(1, sideWidth);
          const ry2 = (offset * 1.3 + i * 97) % H;
          ctx.strokeStyle = "rgba(150,200,255,0.4)";
          ctx.beginPath();
          ctx.moveTo(rx2, ry2);
          ctx.lineTo(rx2 + 3, ry2 + 15);
          ctx.stroke();
        }
      }
      ctx.restore();
      ctx.save();
      const reflY = H * 0.7;
      const reflH = H * 0.3;
      const neonCols = [
        "rgba(255,30,60,0.15)",
        "rgba(0,80,255,0.12)",
        "rgba(0,200,80,0.12)",
        "rgba(255,200,0,0.1)",
        "rgba(200,0,255,0.1)"
      ];
      for (let i = 0; i < 6; i++) {
        const nx = (i * 37 + 8) % Math.max(1, sideWidth - 20);
        ctx.fillStyle = neonCols[i % neonCols.length];
        ctx.fillRect(nx, reflY, 18 + i * 11 % 30, reflH);
        const nx2 = rx + rw + (i * 41 + 12) % Math.max(1, sideWidth - 20);
        ctx.fillStyle = neonCols[(i + 2) % neonCols.length];
        ctx.fillRect(nx2, reflY, 18 + i * 9 % 28, reflH);
      }
      ctx.restore();
      ctx.fillStyle = "#2a2a2a";
      ctx.fillRect(rx - 16, 0, 16, H);
      ctx.fillRect(rx + rw, 0, 16, H);
      const skySpacing = 200;
      const skyCount = Math.ceil(H / skySpacing) + 2;
      const skyScroll = offset % skySpacing;
      for (let i = 0; i < skyCount; i++) {
        const sy = i * skySpacing - skyScroll;
        const bW = 65 + i * 7 % 20;
        const bH2 = 120 + i * 11 % 55;
        const bX = i * 13 % Math.max(1, rx - bW - 10);
        ctx.save();
        ctx.fillStyle = i % 2 === 0 ? "#0f1428" : "#0a0f20";
        ctx.fillRect(bX, sy - bH2, bW, bH2);
        const winW = 4;
        const winH = 5;
        for (let wy = sy - bH2 + 8; wy < sy - 6; wy += 10) {
          for (let wx = bX + 5; wx < bX + bW - 5; wx += 10) {
            const lit = (Math.floor(wx / 10) + Math.floor(wy / 10) + i) * 13 % 17 > 5;
            if (lit) {
              ctx.fillStyle = Math.random() > 0.5 ? "rgba(79,195,247,0.7)" : "rgba(200,220,255,0.55)";
              ctx.fillRect(wx, wy, winW, winH);
            }
          }
        }
        ctx.restore();
      }
      const shopSpacing2 = 250;
      const shopCount2 = Math.ceil(H / shopSpacing2) + 2;
      const shopScroll2 = (offset + 80) % shopSpacing2;
      const neonSignStyles = [
        { label: "ラーメン", color: "#FF2244", bg: "#220011" },
        { label: "PHARMACY", color: "#00AAFF", bg: "#001122" },
        { label: "SHOP 24H", color: "#00DD44", bg: "#001108" }
      ];
      for (let i = 0; i < shopCount2; i++) {
        const sy = i * shopSpacing2 - shopScroll2;
        const sx = Math.max(4, rx * 0.15 + i * 9 % Math.max(1, rx * 0.4));
        const ns = neonSignStyles[i % neonSignStyles.length];
        ctx.save();
        ctx.fillStyle = ns.bg;
        ctx.fillRect(sx, sy - 35, 40, 35);
        ctx.shadowBlur = 16;
        ctx.shadowColor = ns.color;
        ctx.fillStyle = ns.color;
        ctx.fillRect(sx + 2, sy - 44, 36, 12);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 6px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ns.label, sx + 20, sy - 38);
        ctx.restore();
      }
      const puddleSpacing = 120;
      const puddleCount = Math.ceil(H / puddleSpacing) + 2;
      const puddleScroll = offset % puddleSpacing;
      for (let i = 0; i < puddleCount; i++) {
        const py = i * puddleSpacing - puddleScroll;
        ctx.save();
        ctx.fillStyle = "rgba(100,150,200,0.35)";
        ctx.beginPath();
        ctx.ellipse(rx - 25 + i * 7 % 10, py, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      const subwaySpacing = 700;
      const subwayCount = Math.ceil(H / subwaySpacing) + 2;
      const subwayScroll = offset % subwaySpacing;
      for (let i = 0; i < subwayCount; i++) {
        const sy = i * subwaySpacing - subwayScroll;
        const sx = rx * 0.12;
        ctx.save();
        ctx.fillStyle = "#111";
        ctx.fillRect(sx, sy - 38, 46, 38);
        const subGrad = ctx.createRadialGradient(
          sx + 23,
          sy,
          2,
          sx + 23,
          sy - 10,
          28
        );
        subGrad.addColorStop(0, "rgba(255,220,0,0.55)");
        subGrad.addColorStop(1, "rgba(255,220,0,0)");
        ctx.fillStyle = subGrad;
        ctx.fillRect(sx, sy - 38, 46, 38);
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 7px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SUBWAY", sx + 23, sy - 28);
        ctx.restore();
      }
      const rLampSpacing = 150;
      const rLampCount = Math.ceil(H / rLampSpacing) + 2;
      const rLampScroll = (offset + 40) % rLampSpacing;
      for (let i = 0; i < rLampCount; i++) {
        const ly = i * rLampSpacing - rLampScroll;
        const lx = rx - 22;
        ctx.save();
        ctx.fillStyle = "#1a1a2a";
        ctx.fillRect(lx, ly - 45, 3, 50);
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(255,255,200,0.8)";
        ctx.fillStyle = "#FFFFAA";
        ctx.beginPath();
        ctx.arc(lx + 1, ly - 44, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = "rgba(255,255,200,0.15)";
        ctx.beginPath();
        ctx.arc(lx + 1, ly - 44, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      const rsX2 = rx + rw + 16;
      const rsW2 = W - rsX2;
      const garageSpacing = 500;
      const garageCount = Math.ceil(H / garageSpacing) + 2;
      const garageScroll = offset % garageSpacing;
      for (let i = 0; i < garageCount; i++) {
        const gy = i * garageSpacing - garageScroll;
        const gx = rsX2 + i * 7 % Math.max(1, rsW2 - 95);
        ctx.save();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(gx, gy - 100, 90, 100);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        for (let fl = 0; fl < 4; fl++) {
          const fy = gy - 100 + fl * 26;
          ctx.beginPath();
          ctx.moveTo(gx, fy);
          ctx.lineTo(gx + 90, fy);
          ctx.stroke();
          ctx.fillStyle = "#333344";
          ctx.fillRect(gx + 8, fy + 5, 24, 14);
          ctx.fillRect(gx + 52, fy + 5, 24, 14);
        }
        ctx.restore();
      }
      const hotelSpacing = 800;
      const hotelCount = Math.ceil(H / hotelSpacing) + 2;
      const hotelScroll = (offset + 200) % hotelSpacing;
      for (let i = 0; i < hotelCount; i++) {
        const hy = i * hotelSpacing - hotelScroll;
        const hx = rsX2 + 4;
        ctx.save();
        ctx.fillStyle = "#1a0808";
        ctx.fillRect(hx, hy - 70, 75, 70);
        ctx.fillStyle = "#CC0022";
        ctx.fillRect(hx - 2, hy - 42, 79, 10);
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#FF2244";
        ctx.fillStyle = "#FF4466";
        ctx.fillRect(hx + 15, hy - 62, 45, 14);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff";
        ctx.font = "bold 7px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("HOTEL", hx + 37, hy - 55);
        ctx.restore();
      }
      const cartSpacing = 350;
      const cartCount = Math.ceil(H / cartSpacing) + 2;
      const cartScroll = (offset + 150) % cartSpacing;
      for (let i = 0; i < cartCount; i++) {
        const cy = i * cartSpacing - cartScroll;
        const cx = rsX2 + Math.max(0, rsW2 * 0.55);
        ctx.save();
        ctx.fillStyle = "#AA5500";
        ctx.fillRect(cx, cy - 22, 32, 22);
        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc(cx + 8, cy + 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 24, cy + 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF4400";
        ctx.beginPath();
        ctx.arc(cx + 16, cy - 26, 20, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "#FFD700";
        const cGrad = ctx.createRadialGradient(
          cx + 16,
          cy - 22,
          1,
          cx + 16,
          cy - 22,
          18
        );
        cGrad.addColorStop(0, "rgba(255,200,0,0.4)");
        cGrad.addColorStop(1, "rgba(255,200,0,0)");
        ctx.fillStyle = cGrad;
        ctx.fillRect(cx - 4, cy - 38, 40, 20);
        ctx.restore();
      }
      const fenceSpacing = 600;
      const fenceCount = Math.ceil(H / fenceSpacing) + 2;
      const fenceScroll = (offset + 300) % fenceSpacing;
      for (let i = 0; i < fenceCount; i++) {
        const fy = i * fenceSpacing - fenceScroll;
        const fx = rsX2 + 4;
        const fw = Math.min(50, rsW2 - 8);
        const fh = 40;
        ctx.save();
        ctx.fillStyle = "#222";
        ctx.fillRect(fx, fy - fh, fw, fh);
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        const step = 10;
        for (let xi = 0; xi < fw; xi += step) {
          for (let yi = 0; yi < fh; yi += step) {
            ctx.beginPath();
            ctx.moveTo(fx + xi, fy - fh + yi);
            ctx.lineTo(fx + xi + step, fy - fh + yi + step);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(fx + xi + step, fy - fh + yi);
            ctx.lineTo(fx + xi, fy - fh + yi + step);
            ctx.stroke();
          }
        }
        ctx.restore();
      }
      const rPuddleSpacing = 250;
      const rPuddleCount = Math.ceil(H / rPuddleSpacing) + 2;
      const rPuddleScroll = offset % rPuddleSpacing;
      const lw3 = rw / LANE_COUNT;
      for (let i = 0; i < rPuddleCount; i++) {
        const py = i * rPuddleSpacing - rPuddleScroll;
        const puddleX = rx + lw3 * (1 + i % 3);
        ctx.save();
        ctx.fillStyle = "rgba(80,120,160,0.35)";
        ctx.beginPath();
        ctx.ellipse(puddleX + lw3, py, lw3 * 0.85, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(200,230,255,0.4)";
        ctx.beginPath();
        ctx.ellipse(puddleX + lw3 - 8, py - 2, lw3 * 0.3, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      const tunnelSpacing = 900;
      const tunnelCount = Math.ceil(H / tunnelSpacing) + 2;
      const tunnelScroll = offset % tunnelSpacing;
      for (let i = 0; i < tunnelCount; i++) {
        const ty = i * tunnelSpacing - tunnelScroll;
        ctx.save();
        ctx.fillStyle = "#111";
        ctx.fillRect(0, ty, W, H * 0.25);
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(rx, ty + 4, rw, H * 0.22);
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.rect(rx - 8, ty, rw + 16, H * 0.25);
        ctx.stroke();
        ctx.restore();
      }
      const flickerSpacing = 400;
      const flickerCount = Math.ceil(H / flickerSpacing) + 2;
      const flickerScroll = (offset + 60) % flickerSpacing;
      for (let i = 0; i < flickerCount; i++) {
        const ly = i * flickerSpacing - flickerScroll;
        const lx2 = rx + rw + 10;
        const flickerOn = Math.floor(offset / 8) % 7 !== 0;
        ctx.save();
        ctx.fillStyle = "#1a1a2a";
        ctx.fillRect(lx2, ly - 48, 3, 52);
        if (flickerOn) {
          ctx.shadowBlur = 14;
          ctx.shadowColor = "rgba(255,255,200,0.8)";
          ctx.fillStyle = "#FFFFAA";
        } else {
          ctx.fillStyle = "rgba(255,255,170,0.25)";
        }
        ctx.beginPath();
        ctx.arc(lx2 + 1, ly - 47, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      const metroBridgeSpacing = 1100;
      const metroBridgeCount = Math.ceil(H / metroBridgeSpacing) + 2;
      const metroBridgeScroll = offset % metroBridgeSpacing;
      for (let i = 0; i < metroBridgeCount; i++) {
        const bY = i * metroBridgeSpacing - metroBridgeScroll + H * 0.12;
        ctx.save();
        ctx.fillStyle = "#2a2a3a";
        ctx.fillRect(0, bY, W, 24);
        ctx.fillStyle = "#1a1a2a";
        ctx.fillRect(0, bY + 20, W, 6);
        for (let bi = 0; bi < 5; bi++) {
          const bx2 = W / 5 * bi;
          ctx.fillRect(bx2 + W / 10 - 4, bY, 8, 30);
        }
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = "#000";
        ctx.fillRect(rx, bY + 26, rw, 36);
        ctx.restore();
      }
    },
    []
  );
  const drawMountainScenery = reactExports.useCallback(
    (ctx, rx, rw, W, H, offset) => {
      const cliffGrad = ctx.createLinearGradient(0, 0, 0, H);
      cliffGrad.addColorStop(0, "#3a3a3a");
      cliffGrad.addColorStop(1, "#2a3a2a");
      ctx.fillStyle = cliffGrad;
      ctx.fillRect(0, 0, rx, H);
      const valleyGrad = ctx.createLinearGradient(0, 0, 0, H);
      valleyGrad.addColorStop(0, "#1a2a2a");
      valleyGrad.addColorStop(1, "#0a1a1a");
      ctx.fillStyle = valleyGrad;
      ctx.fillRect(rx + rw, 0, W - rx - rw, H);
      const fogSpacing = 600;
      const fogCount = Math.ceil(H / fogSpacing) + 2;
      const fogScroll = offset % fogSpacing;
      for (let i = 0; i < fogCount; i++) {
        const fy = i * fogSpacing - fogScroll;
        ctx.save();
        ctx.fillStyle = "rgba(200,220,210,0.18)";
        ctx.fillRect(0, fy, W, H * 0.3);
        ctx.restore();
      }
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (let i = 0; i < 15; i++) {
        const sx = (i * 43 + offset * 0.3) % W;
        const sy = (offset * 0.7 + i * 61) % H;
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      const rockSpacing = 80;
      const rockCount = Math.ceil(H / rockSpacing) + 2;
      const rockScroll = offset % rockSpacing;
      for (let i = 0; i < rockCount; i++) {
        const ry = i * rockSpacing - rockScroll;
        const seed = (i * 17 + 5) % 9;
        const rX = i * 11 % Math.max(1, rx - 20);
        const rW = 28 + seed * 5;
        const rH2 = 35 + seed * 8;
        ctx.save();
        ctx.fillStyle = seed % 2 === 0 ? "#4a4a4a" : "#3a3030";
        ctx.beginPath();
        ctx.moveTo(rX, ry);
        ctx.lineTo(rX + rW * 0.3, ry - rH2 * 0.55);
        ctx.lineTo(rX + rW * 0.55, ry - rH2 * 0.2);
        ctx.lineTo(rX + rW * 0.75, ry - rH2 * 0.7);
        ctx.lineTo(rX + rW, ry - rH2 * 0.35);
        ctx.lineTo(rX + rW, ry + rH2 * 0.3);
        ctx.lineTo(rX, ry + rH2 * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      const pineSpacing = 180;
      const pineCount = Math.ceil(H / pineSpacing) + 2;
      const pineScroll = offset * 0.85 % pineSpacing;
      for (let i = 0; i < pineCount; i++) {
        const py = i * pineSpacing - pineScroll;
        const px = rx * 0.28 + i * 13 % Math.max(1, rx * 0.55);
        const tH2 = 55 + i * 7 % 28;
        ctx.save();
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#1a3a1a";
        for (let layer = 0; layer < 3; layer++) {
          const lH = tH2 * (0.5 - layer * 0.12);
          const lY = py - tH2 * 0.45 + layer * tH2 * 0.18;
          const lW = 18 + layer * 8;
          ctx.fillStyle = layer === 0 ? "#1a3a1a" : "#2a5a2a";
          ctx.beginPath();
          ctx.moveTo(px, lY - lH);
          ctx.lineTo(px - lW / 2, lY + 4);
          ctx.lineTo(px + lW / 2, lY + 4);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = "#3a2010";
        ctx.fillRect(px - 3, py - tH2 * 0.4, 6, tH2 * 0.4);
        ctx.restore();
      }
      const wfSpacing = 900;
      const wfCount = Math.ceil(H / wfSpacing) + 2;
      const wfScroll = offset % wfSpacing;
      for (let i = 0; i < wfCount; i++) {
        const wy = i * wfSpacing - wfScroll;
        const wx = rx * 0.12 + i * 19 % Math.max(1, rx * 0.5);
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#aaeeff";
        ctx.strokeStyle = "#ddeeff";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.moveTo(wx, wy - H * 0.2);
        ctx.lineTo(wx + 3, wy + H * 0.1);
        ctx.stroke();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#aaeeff";
        ctx.beginPath();
        ctx.arc(wx + 2, wy + H * 0.1, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.save();
      ctx.strokeStyle = "#AAAAAA";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rx - 8, 0);
      ctx.lineTo(rx - 8, H);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#888";
      const postSpacing = 50;
      const postCount = Math.ceil(H / postSpacing) + 1;
      const postScroll = offset % postSpacing;
      for (let i = 0; i < postCount; i++) {
        const py2 = i * postSpacing - postScroll;
        ctx.beginPath();
        ctx.moveTo(rx - 10, py2);
        ctx.lineTo(rx - 10, py2 + 10);
        ctx.stroke();
      }
      ctx.restore();
      const shrineSpacing = 700;
      const shrineCount = Math.ceil(H / shrineSpacing) + 2;
      const shrineScroll = offset % shrineSpacing;
      for (let i = 0; i < shrineCount; i++) {
        const sy = i * shrineSpacing - shrineScroll;
        const sx = rx * 0.1;
        ctx.save();
        ctx.fillStyle = "#888";
        ctx.fillRect(sx, sy - 28, 14, 22);
        ctx.fillRect(sx + 4, sy - 36, 6, 12);
        ctx.fillRect(sx + 1, sy - 32, 12, 4);
        ctx.restore();
      }
      const rsX3 = rx + rw;
      const rsW3 = W - rsX3;
      const valPineSpacing = 200;
      const valPineCount = Math.ceil(H / valPineSpacing) + 2;
      const valPineScroll = (offset * 0.6 + 100) % valPineSpacing;
      for (let i = 0; i < valPineCount; i++) {
        const py = i * valPineSpacing - valPineScroll;
        const px = rsX3 + 10 + i * 17 % Math.max(1, rsW3 - 20);
        const tH3 = 30 + i * 7 % 20;
        ctx.save();
        for (let layer = 0; layer < 2; layer++) {
          const lH = tH3 * (0.5 - layer * 0.1);
          const lY = py - tH3 * 0.38 + layer * tH3 * 0.2;
          const lW = 12 + layer * 5;
          ctx.fillStyle = "#0d2010";
          ctx.beginPath();
          ctx.moveTo(px, lY - lH);
          ctx.lineTo(px - lW / 2, lY + 4);
          ctx.lineTo(px + lW / 2, lY + 4);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      const cableSpacing = 1200;
      const cableCount = Math.ceil(H / cableSpacing) + 2;
      const cableScroll = offset % cableSpacing;
      for (let i = 0; i < cableCount; i++) {
        const cableBaseY = i * cableSpacing - cableScroll;
        const startX = rsX3 + 5;
        const endX = W - 5;
        const startY = cableBaseY - 80;
        const endY = cableBaseY;
        ctx.save();
        ctx.strokeStyle = "#777";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        const t2 = offset * 0.3 % cableSpacing / cableSpacing;
        const gx2 = startX + (endX - startX) * t2;
        const gy2 = startY + (endY - startY) * t2;
        ctx.fillStyle = "#556677";
        ctx.fillRect(gx2 - 8, gy2 - 10, 16, 12);
        ctx.fillStyle = "#7a99aa";
        ctx.fillRect(gx2 - 6, gy2 - 8, 12, 8);
        ctx.restore();
      }
      const snowSpacing = 160;
      const snowCount = Math.ceil(H / snowSpacing) + 2;
      const snowScroll = (offset * 0.9 + 55) % snowSpacing;
      for (let i = 0; i < snowCount; i++) {
        const sy2 = i * snowSpacing - snowScroll;
        ctx.save();
        ctx.fillStyle = "rgba(230,240,255,0.7)";
        ctx.beginPath();
        ctx.ellipse(
          rsX3 + 8 + i * 9 % 18,
          sy2,
          16 + i % 5 * 4,
          5,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }
      const warnSpacing = 350;
      const warnCount = Math.ceil(H / warnSpacing) + 2;
      const warnScroll = (offset + 180) % warnSpacing;
      for (let i = 0; i < warnCount; i++) {
        const wy2 = i * warnSpacing - warnScroll;
        const wx2 = rsX3 + Math.max(4, rsW3 * 0.3 + i * 11 % Math.max(1, rsW3 * 0.4));
        ctx.save();
        ctx.fillStyle = "#555";
        ctx.fillRect(wx2 + 5, wy2 - 40, 3, 40);
        ctx.fillStyle = "#FFEE00";
        ctx.strokeStyle = "#CC8800";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(wx2 + 6, wy2 - 58);
        ctx.lineTo(wx2 - 6, wy2 - 40);
        ctx.lineTo(wx2 + 18, wy2 - 40);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#333";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("!", wx2 + 6, wy2 - 49);
        ctx.restore();
      }
      const debrisSpacing = 400;
      const debrisCount = Math.ceil(H / debrisSpacing) + 2;
      const debrisScroll = offset % debrisSpacing;
      const lw4 = rw / LANE_COUNT;
      for (let i = 0; i < debrisCount; i++) {
        const dy = i * debrisSpacing - debrisScroll;
        ctx.save();
        for (let r2 = 0; r2 < 4; r2++) {
          const side = r2 < 2 ? 0 : 1;
          const baseX = side === 0 ? rx + lw4 * 0.5 + r2 * 11 % (lw4 * 0.7) : rx + lw4 * 3.5 + r2 * 13 % (lw4 * 0.7);
          const rY = dy + r2 * 19 % 30 - 15;
          ctx.fillStyle = r2 % 2 === 0 ? "#555" : "#444";
          ctx.beginPath();
          ctx.moveTo(baseX, rY - 5);
          ctx.lineTo(baseX + 7, rY - 2);
          ctx.lineTo(baseX + 9, rY + 4);
          ctx.lineTo(baseX + 2, rY + 7);
          ctx.lineTo(baseX - 4, rY + 3);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      const woodBridgeSpacing = 800;
      const woodBridgeCount = Math.ceil(H / woodBridgeSpacing) + 2;
      const woodBridgeScroll = offset % woodBridgeSpacing;
      const bridgeH = H * 0.15;
      for (let i = 0; i < woodBridgeCount; i++) {
        const by = i * woodBridgeSpacing - woodBridgeScroll;
        ctx.save();
        ctx.fillStyle = "#6B3A1F";
        for (let p = 0; p < Math.ceil(bridgeH / 8); p++) {
          const plankY = by + p * 9;
          if (plankY > by + bridgeH) break;
          ctx.fillRect(rx, plankY, rw, 6);
          ctx.fillStyle = "#1a0a00";
          ctx.fillRect(rx, plankY + 6, rw, 2);
          ctx.fillStyle = "#6B3A1F";
        }
        ctx.fillStyle = "#8B4A28";
        ctx.fillRect(rx, by, 6, bridgeH);
        ctx.fillRect(rx + rw - 6, by, 6, bridgeH);
        ctx.restore();
      }
      const stoneTunnelSpacing = 1e3;
      const stoneTunnelCount = Math.ceil(H / stoneTunnelSpacing) + 2;
      const stoneTunnelScroll = offset % stoneTunnelSpacing;
      for (let i = 0; i < stoneTunnelCount; i++) {
        const ty = i * stoneTunnelSpacing - stoneTunnelScroll;
        const tunnelH = H * 0.22;
        ctx.save();
        ctx.fillStyle = "#4a4a4a";
        ctx.fillRect(rx - 16, ty, rw + 32, tunnelH);
        ctx.fillStyle = "rgba(0,0,0,0.88)";
        ctx.fillRect(rx, ty + 12, rw, tunnelH - 14);
        ctx.fillStyle = "#5a5a5a";
        ctx.beginPath();
        ctx.arc(rx + rw / 2, ty + 12, rw / 2, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.88)";
        ctx.beginPath();
        ctx.arc(rx + rw / 2, ty + 12, rw / 2 - 10, Math.PI, 0);
        ctx.fill();
        ctx.restore();
      }
    },
    []
  );
  const drawRoad = reactExports.useCallback(
    (ctx, mapTheme, offset) => {
      const { width: W, height: H } = ctx.canvas;
      const md = getMapData(mapTheme);
      let rwBase = W * ROAD_RATIO;
      if (mapTheme === MapTheme.SUNSET_BOULEVARD) {
        const o = offset % 6e3;
        if (o > 2e3 && o < 4e3) rwBase *= 1.1;
        else if (o >= 4e3) rwBase *= 0.92;
      } else if (mapTheme === MapTheme.RAINY_NIGHT_CITY) {
        const o = offset % 5e3;
        if (o < 1500) rwBase *= 0.88;
        else if (o > 2500) rwBase *= 1.08;
      } else if (mapTheme === MapTheme.MOUNTAIN_PASS) {
        rwBase *= 0.85;
      }
      const rw = rwBase;
      const rx = (W - rw) / 2;
      ctx.fillStyle = md.skyColor;
      ctx.fillRect(0, 0, W, H);
      const sideGrad = ctx.createLinearGradient(0, 0, rx * 1.5, 0);
      sideGrad.addColorStop(0, md.backgroundAccent);
      sideGrad.addColorStop(1, `${md.ambientColor}18`);
      ctx.fillStyle = sideGrad;
      ctx.fillRect(0, 0, rx, H);
      const sideGradR = ctx.createLinearGradient(W, 0, W - rx * 1.5, 0);
      sideGradR.addColorStop(0, md.backgroundAccent);
      sideGradR.addColorStop(1, `${md.ambientColor}18`);
      ctx.fillStyle = sideGradR;
      ctx.fillRect(rx + rw, 0, W - rx - rw, H);
      if (mapTheme === MapTheme.HIGHWAY) {
        drawHighwayScenery(ctx, rx, rw, W, H, offset);
      } else if (mapTheme === MapTheme.CITY) {
        drawCityScenery(ctx, rx, rw, W, H, offset);
      } else if (mapTheme === MapTheme.CANYON) {
        drawCanyonScenery(ctx, rx, rw, W, H, offset);
      } else if (mapTheme === MapTheme.SUNSET_BOULEVARD) {
        drawSunsetScenery(ctx, rx, rw, W, H, offset);
      } else if (mapTheme === MapTheme.RAINY_NIGHT_CITY) {
        drawRainyScenery(ctx, rx, rw, W, H, offset);
      } else if (mapTheme === MapTheme.MOUNTAIN_PASS) {
        drawMountainScenery(ctx, rx, rw, W, H, offset);
      }
      ctx.fillStyle = md.roadColor;
      ctx.fillRect(rx, 0, rw, H);
      const roadGrad = ctx.createLinearGradient(rx, 0, rx + rw, 0);
      roadGrad.addColorStop(0, "rgba(0,0,0,0.18)");
      roadGrad.addColorStop(0.5, "rgba(0,0,0,0)");
      roadGrad.addColorStop(1, "rgba(0,0,0,0.18)");
      ctx.fillStyle = roadGrad;
      ctx.fillRect(rx, 0, rw, H);
      ctx.save();
      ctx.shadowBlur = 18;
      ctx.shadowColor = md.ambientColor;
      ctx.strokeStyle = md.ambientColor;
      ctx.lineWidth = 2.5;
      for (const ex of [rx, rx + rw]) {
        ctx.beginPath();
        ctx.moveTo(ex, 0);
        ctx.lineTo(ex, H);
        ctx.stroke();
      }
      ctx.restore();
      const lw = rw / LANE_COUNT;
      ctx.save();
      ctx.strokeStyle = `${md.roadLineColor}66`;
      ctx.lineWidth = 2;
      ctx.setLineDash([40, 26]);
      ctx.lineDashOffset = -(offset % 66);
      for (let i = 1; i < LANE_COUNT; i++) {
        const x = rx + lw * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
      if (mapTheme === MapTheme.HIGHWAY) {
        ctx.save();
        const centerX = rx + rw / 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#FFD700";
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 3.5;
        ctx.setLineDash([48, 22]);
        ctx.lineDashOffset = -(offset % 70);
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, H);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = "#00D4AA";
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }
    },
    [
      drawHighwayScenery,
      drawCityScenery,
      drawCanyonScenery,
      drawSunsetScenery,
      drawRainyScenery,
      drawMountainScenery
    ]
  );
  const drawCarShape = reactExports.useCallback(
    (ctx, w, h, bodyColor, accentColor, isLarge = false, carTypeKey = "BASIC") => {
      const hw = w / 2;
      const hh = h / 2;
      if (isLarge) {
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.roundRect(-hw, -hh, w, h, hw * 0.18);
        ctx.fill();
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.roundRect(-hw, -hh, w, hh * 0.45, [hw * 0.18, hw * 0.18, 0, 0]);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(140,220,255,0.8)";
        ctx.beginPath();
        ctx.roundRect(-hw * 0.72, -hh + h * 0.08, hw * 1.44, hh * 0.28, 3);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.22)";
        ctx.lineWidth = 1.5;
        for (let li = 0; li < 3; li++) {
          const lineY = hh * 0.1 + li * hh * 0.25;
          ctx.beginPath();
          ctx.moveTo(-hw * 0.85, lineY);
          ctx.lineTo(hw * 0.85, lineY);
          ctx.stroke();
        }
        const wrt = w * 0.14;
        const wxt = hw - wrt * 0.3;
        for (const [cx2, cy2] of [
          [-wxt, -hh + hh * 0.28],
          [wxt, -hh + hh * 0.28],
          [-wxt, hh * 0.68],
          [wxt, hh * 0.68]
        ]) {
          ctx.fillStyle = "#111122";
          ctx.beginPath();
          ctx.ellipse(cx2, cy2, wrt, wrt * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#555566";
          ctx.beginPath();
          ctx.arc(cx2, cy2, wrt * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        for (const hx2 of [-hw * 0.5, hw * 0.5]) {
          ctx.fillStyle = "rgba(255,240,100,0.5)";
          ctx.beginPath();
          ctx.arc(hx2, -hh + h * 0.06, w * 0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFFFCC";
          ctx.beginPath();
          ctx.arc(hx2, -hh + h * 0.06, w * 0.06, 0, Math.PI * 2);
          ctx.fill();
        }
        for (const tx2 of [-hw * 0.5, hw * 0.5]) {
          ctx.fillStyle = "rgba(255,20,20,0.5)";
          ctx.beginPath();
          ctx.arc(tx2, hh - h * 0.06, w * 0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FF3030";
          ctx.beginPath();
          ctx.arc(tx2, hh - h * 0.06, w * 0.06, 0, Math.PI * 2);
          ctx.fill();
        }
        return;
      }
      if (carTypeKey === "RACE") {
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(-hw * 0.38, -hh);
        ctx.lineTo(hw * 0.38, -hh);
        ctx.lineTo(hw * 0.25, hh);
        ctx.lineTo(-hw * 0.25, hh);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = accentColor;
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
      } else if (carTypeKey === "JET") {
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(0, -hh - h * 0.08);
        ctx.lineTo(hw * 0.72, -hh + h * 0.22);
        ctx.lineTo(hw * 0.62, hh);
        ctx.lineTo(-hw * 0.62, hh);
        ctx.lineTo(-hw * 0.72, -hh + h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = accentColor;
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
          ctx.ellipse(
            ex,
            hh - h * 0.04,
            hw * 0.12,
            hh * 0.08,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(100,200,255,0.75)";
        ctx.beginPath();
        ctx.ellipse(0, -hh * 0.25, hw * 0.35, hh * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (carTypeKey === "HYPER") {
        const r = hw * 0.15;
        ctx.fillStyle = bodyColor;
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
        ctx.fillStyle = accentColor;
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
      } else if (carTypeKey === "LIGHTNING") {
        ctx.fillStyle = bodyColor;
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
        ctx.strokeStyle = accentColor;
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
        ctx.lineCap = "butt";
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
      } else if (carTypeKey === "STREET") {
        const r = hw * 0.18;
        ctx.fillStyle = bodyColor;
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
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(-hw * 0.95, -hh * 0.04, hw * 1.9, hh * 0.1);
        ctx.globalAlpha = 1;
      } else if (carTypeKey === "SPORT") {
        const fw = hw * 0.88;
        const rw = hw * 0.72;
        ctx.fillStyle = bodyColor;
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
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.roundRect(-rw * 0.82, hh * 0.72, rw * 1.64, hh * 0.14, 3);
        ctx.fill();
        ctx.fillRect(-rw * 0.28, hh * 0.58, rw * 0.14, hh * 0.18);
        ctx.fillRect(rw * 0.14, hh * 0.58, rw * 0.14, hh * 0.18);
        ctx.globalAlpha = 1;
      } else {
        const frontW = hw * 0.86;
        const rearW = hw * 0.76;
        const bodyR = hw * 0.22;
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(-frontW + bodyR, -hh);
        ctx.lineTo(frontW - bodyR, -hh);
        ctx.quadraticCurveTo(frontW, -hh, frontW, -hh + bodyR);
        ctx.lineTo(frontW * 0.9, hh * 0.7);
        ctx.lineTo(rearW, hh);
        ctx.lineTo(-rearW, hh);
        ctx.lineTo(-frontW * 0.9, hh * 0.7);
        ctx.lineTo(-frontW, -hh + bodyR);
        ctx.quadraticCurveTo(-frontW, -hh, -frontW + bodyR, -hh);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(-frontW + bodyR, -hh);
        ctx.lineTo(frontW - bodyR, -hh);
        ctx.lineTo(frontW * 0.82, -hh + h * 0.22);
        ctx.lineTo(-frontW * 0.82, -hh + h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(100,200,255,0.75)";
        ctx.beginPath();
        ctx.roundRect(-hw * 0.7, -hh + h * 0.22, hw * 1.4, hh * 0.3, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.38)";
        ctx.beginPath();
        ctx.roundRect(-hw * 0.62, -hh * 0.08, hw * 1.24, hh * 0.45, 5);
        ctx.fill();
        ctx.fillStyle = "rgba(100,190,255,0.42)";
        ctx.beginPath();
        ctx.roundRect(-hw * 0.5, hh * 0.4, hw * 1, hh * 0.22, 3);
        ctx.fill();
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.roundRect(-rearW * 0.88, hh * 0.65, rearW * 1.76, hh * 0.28, [
          0,
          0,
          bodyR * 0.7,
          bodyR * 0.7
        ]);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      const wr = w * 0.16;
      const wx = hw - wr * 0.15;
      const wyF2 = -hh + h * 0.25;
      const wyR2 = hh * 0.65;
      for (const [cx2, cy2] of [
        [-wx, wyF2],
        [wx, wyF2],
        [-wx, wyR2],
        [wx, wyR2]
      ]) {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.beginPath();
        ctx.ellipse(cx2 + 1, cy2 + 2, wr, wr * 0.78, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0d0d1a";
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, wr, wr * 0.78, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#7a7a8a";
        ctx.beginPath();
        ctx.arc(cx2, cy2, wr * 0.52, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#b0b0c0";
        ctx.beginPath();
        ctx.arc(cx2, cy2, wr * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }
      const hlY2 = -hh + h * 0.06;
      const hlX2 = carTypeKey === "RACE" ? hw * 0.22 : carTypeKey === "JET" ? hw * 0.38 : hw * 0.62;
      const hlR2 = w * 0.11;
      for (const hx2 of [-hlX2, hlX2]) {
        ctx.fillStyle = "rgba(255,240,80,0.55)";
        ctx.beginPath();
        ctx.arc(hx2, hlY2, hlR2 * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFE44D";
        ctx.beginPath();
        ctx.ellipse(hx2, hlY2, hlR2, hlR2 * 0.68, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(hx2, hlY2, hlR2 * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      const tlY2 = hh - h * 0.06;
      const tlX2 = carTypeKey === "RACE" ? hw * 0.22 : hw * 0.62;
      const tlR2 = w * 0.1;
      for (const tx2 of [-tlX2, tlX2]) {
        ctx.fillStyle = "rgba(255,20,20,0.5)";
        ctx.beginPath();
        ctx.arc(tx2, tlY2, tlR2 * 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF1A1A";
        ctx.beginPath();
        ctx.ellipse(tx2, tlY2, tlR2, tlR2 * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF8080";
        ctx.beginPath();
        ctx.arc(tx2, tlY2, tlR2 * 0.38, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );
  const drawCar = reactExports.useCallback(
    (ctx, x, y, color, w, h, isPlayer = false, carStyle = 0, shielded = false, invincible = false, carTypeKey = "BASIC", facingUp = false) => {
      const glowColor = invincible ? "#FFD700" : shielded ? "#00D4AA" : CAR_ACCENT[carTypeKey] ?? color;
      ctx.save();
      ctx.shadowBlur = isPlayer ? 22 : 10;
      ctx.shadowColor = glowColor;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.5, h * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = isPlayer ? 16 : 8;
      ctx.shadowColor = glowColor;
      ctx.translate(x, y);
      if (!isPlayer && !facingUp) {
        ctx.rotate(Math.PI);
      }
      const isLarge = carStyle >= 6;
      const accentColor = CAR_ACCENT[carTypeKey] ?? glowColor;
      ctx.shadowBlur = 0;
      drawCarShape(ctx, w, h, color, accentColor, isLarge, carTypeKey);
      ctx.restore();
    },
    [drawCarShape]
  );
  const drawRainbow = reactExports.useCallback(
    (ctx, trail, carColor) => {
      if (trail.length < 3) return;
      const layers = [
        { widthMult: 28, alpha: 0.18, blur: 40, color: carColor },
        { widthMult: 18, alpha: 0.32, blur: 28, color: carColor },
        { widthMult: 10, alpha: 0.55, blur: 18, color: "#ffffff" },
        { widthMult: 5, alpha: 0.85, blur: 10, color: "#ffffff" }
      ];
      for (const layer of layers) {
        ctx.save();
        ctx.shadowBlur = layer.blur;
        ctx.shadowColor = layer.color;
        ctx.globalAlpha = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < trail.length; i++) {
          const tNorm = i / trail.length;
          const width = layer.widthMult * tNorm;
          const alpha = layer.alpha * tNorm;
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }
        ctx.restore();
      }
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#ffffff";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }
      ctx.stroke();
      ctx.restore();
    },
    []
  );
  const drawAICar = reactExports.useCallback(
    (ctx, ai, W, ts) => {
      const ax = laneX(ai.lane, W);
      const ay = ai.positionY;
      const glowPulse = 0.8 + 0.2 * Math.sin(ts / 200);
      const w = CAR_W + 2;
      const h = CAR_H;
      ctx.save();
      ctx.shadowBlur = 20 * glowPulse;
      ctx.shadowColor = ai.glowColor;
      ctx.fillStyle = ai.carColor;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.ellipse(ax, ay, w * 0.5, h * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 14 * glowPulse;
      ctx.shadowColor = ai.glowColor;
      ctx.translate(ax, ay);
      ctx.shadowBlur = 0;
      drawCarShape(ctx, w, h, ai.carColor, ai.glowColor, false, ai.carType);
      ctx.restore();
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = ai.glowColor;
      ctx.fillStyle = ai.glowColor;
      ctx.font = `bold 11px "Space Grotesk", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(ai.name, ax, ay - h / 2 - 4);
      ctx.restore();
      if (ai.powerUpGrabTimer > 0 && ai.lastPowerUpGrab) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, ai.powerUpGrabTimer / 400);
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#FFD700";
        ctx.fillStyle = "rgba(13,27,42,0.85)";
        const bx = ax + w / 2 + 4;
        const by = ay - h / 2;
        const bw = 42;
        const bh = 20;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 5);
        ctx.fill();
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ai.lastPowerUpGrab, bx + bw / 2, by + bh / 2);
        ctx.restore();
      }
      if (ai.isLeading) {
        ctx.save();
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#FFD700";
        ctx.fillText("👑", ax, ay - h / 2 - 18);
        ctx.restore();
      }
    },
    [laneX, drawCarShape]
  );
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx = ctxRaw;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      playerX.current = laneX(playerLane.current, canvas.width);
      targetX.current = playerX.current;
    };
    resize();
    window.addEventListener("resize", resize);
    function loop(ts) {
      if (deadRef.current) return;
      const dt = lastTRef.current ? Math.min((ts - lastTRef.current) / 1e3, 0.05) : 0.016;
      lastTRef.current = ts;
      frameCountRef.current++;
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const W = canvas.width;
      const H = canvas.height;
      const gs = useGameStore.getState().gameState;
      const slow = activePups.current.has(PowerUpType.TIME_SLOW);
      const sM = slow ? 0.4 : 1;
      const curSp = speedRef.current * sM;
      const prevScore = scoreRef.current;
      roadOff.current += curSp * dt;
      scoreRef.current += Math.floor(curSp * dt * 0.1);
      const baseScoreDelta = scoreRef.current - prevScore;
      distRef.current += curSp * dt / 100;
      fuelRef.current = Math.max(0, fuelRef.current - FUEL_DRAIN * dt);
      if (fuelRef.current <= 0) {
        crashGame();
        return;
      }
      if (gs.gameMode === GameMode.TIMED) {
        timeRef.current -= dt;
        if (timeRef.current <= 0) {
          resultsGame();
          return;
        }
      }
      const ramp = 1 + Math.min(scoreRef.current / 8e3, 1.2);
      if (!activePups.current.has(PowerUpType.SPEED_BOOST)) {
        speedRef.current = BASE_SPEED * ramp;
      }
      const toRm = [];
      activePups.current.forEach((tl, type) => {
        const nxt = tl - dt;
        if (nxt <= 0) {
          toRm.push(type);
          if (type === PowerUpType.SHIELD) shieldRef.current = false;
          if (type === PowerUpType.INVINCIBILITY) invincRef.current = false;
          if (type === PowerUpType.SPEED_BOOST)
            speedRef.current = BASE_SPEED * ramp;
          if (type === PowerUpType.DOUBLE_COINS) multRef.current = 1;
        } else activePups.current.set(type, nxt);
      });
      for (const t of toRm) activePups.current.delete(t);
      targetX.current = laneX(playerLane.current, W);
      playerX.current += (targetX.current - playerX.current) * (1 - 0.01 ** (dt * LANE_LERP));
      const pY = H * 0.78;
      const boosting = activePups.current.has(PowerUpType.SPEED_BOOST);
      if (boosting) {
        trailRef.current.push({ x: playerX.current, y: pY });
        if (trailRef.current.length > 28) trailRef.current.shift();
      } else if (trailRef.current.length > 0) trailRef.current.shift();
      const ai = aiRuntimeRef.current;
      if (ai) {
        const multiplier = AI_SPEED_MULTIPLIERS[ai.difficulty];
        const playerScore = scoreRef.current;
        const scoreDiff = playerScore - ai.score;
        let aiScoreDelta = baseScoreDelta * multiplier.base;
        if (scoreDiff > 200) {
          aiScoreDelta *= 1.3;
        } else if (ai.score > playerScore + 150) {
          aiScoreDelta *= 0.7;
        }
        ai.score = Math.max(0, ai.score + Math.max(0, aiScoreDelta));
        ai.driftTimer -= dt;
        if (ai.driftTimer <= 0) {
          ai.driftDir = Math.random() < 0.5 ? 1 : -1;
          ai.driftTimer = 1.5 + Math.random() * 3.5;
          const newLane = Math.max(
            0,
            Math.min(LANE_COUNT - 1, ai.lane + ai.driftDir)
          );
          ai.lane = newLane;
        }
        const targetY = 120 + Math.sin(ts / 1800) * 55;
        ai.positionY += (targetY - ai.positionY) * dt * 1.2;
        aiPowerUpTimerRef.current += dt;
        if (aiPowerUpTimerRef.current >= aiPowerUpNextRef.current) {
          aiPowerUpTimerRef.current = 0;
          aiPowerUpNextRef.current = 8 + Math.random() * 7;
          const randomPup = PUP_ICONS[Math.floor(Math.random() * PUP_ICONS.length)];
          const pd = getPowerUpData(randomPup);
          ai.lastPowerUpGrab = `${pd.icon} BOOST`;
          ai.powerUpGrabTimer = 2e3;
          if (tauntCooldownRef.current <= 0) {
            const personality = AI_PERSONALITIES[ai.name];
            showTaunt(getAITaunt(personality, "powerup"));
          }
        }
        if (ai.powerUpGrabTimer > 0) {
          ai.powerUpGrabTimer -= dt * 1e3;
        }
        const wasLeading = ai.isLeading;
        ai.isLeading = ai.score > playerScore;
        if (wasLeading !== ai.isLeading) {
          positionSwapsRef.current += 1;
        }
        tauntCooldownRef.current = Math.max(0, tauntCooldownRef.current - dt);
        activeTauntTimerRef.current = Math.max(
          0,
          activeTauntTimerRef.current - dt
        );
        if (activeTauntTimerRef.current <= 0 && tauntVisibleRef.current) {
          setTauntVisible(false);
          tauntVisibleRef.current = false;
        }
        tauntNextRef.current -= dt;
        if (tauntNextRef.current <= 0 && tauntCooldownRef.current <= 0) {
          const personality = AI_PERSONALITIES[ai.name];
          const scenario = ai.isLeading ? "leading" : "behind";
          showTaunt(getAITaunt(personality, scenario));
        }
        if (frameCountRef.current % 30 === 0) {
          updateAIOpponent({
            score: Math.floor(ai.score),
            isLeading: ai.isLeading
          });
        }
      }
      const mapData = getMapData(gs.mapTheme);
      const densityInterval = DENSITY_RATE[mapData.trafficDensity] ?? DENSITY_RATE.medium;
      const tiInterval = Math.max(
        0.35,
        densityInterval - scoreRef.current / 1e4
      );
      spawns.current.traffic += dt;
      if (spawns.current.traffic > tiInterval) {
        spawns.current.traffic = 0;
        const lane = Math.max(
          0,
          Math.min(LANE_COUNT - 1, Math.floor(Math.random() * LANE_COUNT))
        );
        const sv = 0.38 + Math.random() * 0.62;
        const dm = 1 + Math.min(scoreRef.current / 5e3, 1.5);
        const mapTrafficColors = gs.mapTheme === MapTheme.SUNSET_BOULEVARD ? ["#E53935", "#FF7043", "#FFA726", "#FFB300", "#FF5722"] : gs.mapTheme === MapTheme.RAINY_NIGHT_CITY ? [
          "#263238",
          "#37474F",
          "#1A237E",
          "#880E4F",
          "#212121",
          "#1B2A3A"
        ] : gs.mapTheme === MapTheme.MOUNTAIN_PASS ? ["#33691E", "#5D4037", "#BF360C", "#4E342E", "#3E5424"] : mapData.trafficColors.length > 0 ? mapData.trafficColors : TRAFFIC_COLORS;
        trafficRef.current.push({
          id: nid(),
          lane,
          y: -TRAFFIC_H - 8,
          speed: BASE_SPEED * sv * dm,
          color: mapTrafficColors[Math.floor(Math.random() * mapTrafficColors.length)],
          w: TRAFFIC_W + Math.random() * 8,
          h: TRAFFIC_H + Math.random() * 10,
          style: Math.floor(Math.random() * TRAFFIC_STYLE_COUNT)
        });
      }
      spawns.current.coin += dt;
      if (spawns.current.coin > 1.33) {
        spawns.current.coin = 0;
        const n = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++)
          coinsRef.current.push({
            id: nid(),
            lane: Math.floor(Math.random() * LANE_COUNT),
            y: -COIN_R - 8,
            opacity: 1,
            collected: false,
            floatT: Math.random() * Math.PI * 2
          });
      }
      spawns.current.fuel += dt;
      if (spawns.current.fuel > 6 + Math.random() * 5) {
        spawns.current.fuel = 0;
        fuelRef2.current.push({
          id: nid(),
          lane: Math.floor(Math.random() * LANE_COUNT),
          y: -FUEL_H - 8
        });
      }
      spawns.current.pup += dt;
      if (spawns.current.pup > 9 + Math.random() * 8) {
        spawns.current.pup = 0;
        const types = Object.values(PowerUpType);
        pupsRef.current.push({
          id: nid(),
          lane: Math.floor(Math.random() * LANE_COUNT),
          y: -PUP_R - 8,
          type: types[Math.floor(Math.random() * types.length)]
        });
      }
      spawns.current.sameDir += dt;
      const sameDirInterval = densityInterval * 2.8;
      if (spawns.current.sameDir > sameDirInterval) {
        spawns.current.sameDir = 0;
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const safeLane = Math.max(0, Math.min(LANE_COUNT - 1, lane));
        const sameDirSpeed = curSp * (0.6 + Math.random() * 0.15);
        trafficRef.current.push({
          id: nid(),
          lane: safeLane,
          y: H + TRAFFIC_H + 8,
          // spawn below screen
          speed: sameDirSpeed,
          color: TRAFFIC_COLORS[Math.floor(Math.random() * TRAFFIC_COLORS.length)],
          w: TRAFFIC_W + Math.random() * 8,
          h: TRAFFIC_H + Math.random() * 10,
          style: Math.floor(Math.random() * TRAFFIC_STYLE_COUNT),
          sameDir: true
        });
      }
      trafficRef.current = trafficRef.current.filter(
        (t) => t.sameDir ? t.y > -TRAFFIC_H - 20 : t.y < H + 120
      );
      for (const t of trafficRef.current) {
        if (t.sameDir) {
          t.y -= t.speed * sM * dt * 0.52;
        } else {
          t.y += t.speed * sM * dt * 0.52;
        }
      }
      const magnet = activePups.current.has(PowerUpType.COIN_MAGNET);
      coinsRef.current = coinsRef.current.filter(
        (c) => c.y < H + 30 && c.opacity > 0.04
      );
      for (const c of coinsRef.current) {
        if (c.collected) {
          c.y -= 110 * dt;
          c.opacity -= 2.2 * dt;
          continue;
        }
        c.y += curSp * dt * 0.68;
        c.floatT += dt * 2;
        if (magnet) {
          const cx2 = laneX(c.lane, W);
          const dist = Math.hypot(cx2 - playerX.current, c.y - pY);
          if (dist < 200) {
            const pull = 280 * dt;
            c.y += (pY - c.y) / dist * pull;
          }
        }
        const cx = laneX(c.lane, W);
        if (Math.hypot(cx - playerX.current, c.y - pY) < COIN_R + CAR_W / 2) {
          c.collected = true;
          const earn = Math.ceil(multRef.current);
          coinsRef2.current += earn;
          scoreRef.current += 10 * earn;
          addParts(cx, c.y, "#FFD700", 5);
          addPopup(cx, c.y, `+${10 * earn}`);
        }
      }
      fuelRef2.current = fuelRef2.current.filter((f) => f.y < H + 30);
      for (let i = fuelRef2.current.length - 1; i >= 0; i--) {
        const f = fuelRef2.current[i];
        f.y += curSp * dt * 0.65;
        const fx = laneX(f.lane, W);
        if (Math.hypot(fx - playerX.current, f.y - pY) < FUEL_H / 2 + CAR_H / 3) {
          fuelRef.current = Math.min(100, fuelRef.current + 30);
          fuelRef2.current.splice(i, 1);
          addParts(fx, f.y, "#69F0AE", 7);
          addPopup(fx, f.y, "+30 FUEL");
        }
      }
      pupsRef.current = pupsRef.current.filter((p) => p.y < H + 30);
      for (let i = pupsRef.current.length - 1; i >= 0; i--) {
        const p = pupsRef.current[i];
        p.y += curSp * dt * 0.58;
        const px2 = laneX(p.lane, W);
        if (Math.hypot(px2 - playerX.current, p.y - pY) < PUP_R + CAR_W / 2) {
          activatePup(p.type, W, H);
          pupsRef.current.splice(i, 1);
        }
      }
      if (!invincRef.current) {
        for (const t of trafficRef.current) {
          if (t.sameDir) continue;
          const tx = laneX(t.lane, W);
          if (Math.abs(tx - playerX.current) < (CAR_W / 2 + t.w / 2) * 0.72 && Math.abs(t.y - pY) < (CAR_H / 2 + t.h / 2) * 0.72) {
            if (shieldRef.current) {
              shieldRef.current = false;
              activePups.current.delete(PowerUpType.SHIELD);
              trafficRef.current = trafficRef.current.filter(
                (x) => x.id !== t.id
              );
              addParts(playerX.current, pY, "#00D4AA", 16);
              addPopup(playerX.current, pY, "SHIELD BLOCKED!");
            } else {
              addParts(playerX.current, pY, gs.carColor, 22);
              crashGame();
              return;
            }
          }
        }
      }
      partRef.current = partRef.current.filter((p) => p.life > 0);
      for (const p of partRef.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 100 * dt;
        p.life -= dt / p.maxL;
      }
      popRef.current = popRef.current.filter((p) => p.life > 0);
      for (const p of popRef.current) {
        p.y += p.vy * dt;
        p.life -= dt * 1.8;
      }
      ctx.clearRect(0, 0, W, H);
      drawRoad(ctx, gs.mapTheme, roadOff.current);
      drawRainbow(ctx, trailRef.current, gs.carColor || "#FF6B2B");
      for (const c of coinsRef.current) {
        const cx = laneX(c.lane, W);
        const cy = c.y + Math.sin(c.floatT) * 2.5;
        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#FFD700";
        const coinGrad = ctx.createRadialGradient(
          cx - COIN_R * 0.3,
          cy - COIN_R * 0.3,
          COIN_R * 0.05,
          cx,
          cy,
          COIN_R
        );
        coinGrad.addColorStop(0, "#FFF9C4");
        coinGrad.addColorStop(0.35, "#FFD700");
        coinGrad.addColorStop(0.75, "#FFA000");
        coinGrad.addColorStop(1, "#E65100");
        ctx.fillStyle = coinGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, COIN_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#F57F17";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.save();
        ctx.globalAlpha = c.opacity * 0.75;
        ctx.fillStyle = "#FFFDE7";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(
          cx - COIN_R * 0.28,
          cy - COIN_R * 0.28,
          COIN_R * 0.38,
          COIN_R * 0.22,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#B45309";
        ctx.font = `bold ${Math.round(COIN_R * 1.1)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 0;
        ctx.fillText("$", cx, cy + 1);
        ctx.restore();
      }
      for (const f of fuelRef2.current) {
        const fx = laneX(f.lane, W);
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#69F0AE";
        ctx.fillStyle = "#1B5E20";
        ctx.fillRect(fx - FUEL_W / 2, f.y - FUEL_H / 2 - 3, FUEL_W, FUEL_H + 6);
        ctx.fillStyle = "#69F0AE";
        ctx.shadowBlur = 6;
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("FUEL", fx, f.y);
        ctx.fillStyle = "#FF6B2B";
        ctx.fillRect(fx - 5, f.y - FUEL_H / 2 - 7, 10, 5);
        ctx.restore();
      }
      for (const p of pupsRef.current) {
        const px2 = laneX(p.lane, W);
        const pc = PUP_COLORS[p.type];
        const pd = getPowerUpData(p.type);
        const pulse = 1 + 0.15 * Math.sin(ts / 280 + p.id);
        const R = 21;
        const outerR = R * pulse;
        ctx.save();
        ctx.shadowBlur = 36;
        ctx.shadowColor = pc;
        ctx.globalAlpha = 0.25 * pulse;
        ctx.fillStyle = pc;
        ctx.beginPath();
        ctx.arc(px2, p.y, outerR + 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.shadowBlur = 20;
        ctx.shadowColor = pc;
        ctx.strokeStyle = pc;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(px2, p.y, outerR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = pc;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px2, p.y, outerR - 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.92;
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(10,18,30,0.88)";
        ctx.beginPath();
        ctx.arc(px2, p.y, outerR - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 14;
        ctx.shadowColor = pc;
        ctx.font = `${Math.round(R * 1.05)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pd.icon, px2, p.y);
        ctx.globalAlpha = 0.82;
        ctx.shadowBlur = 8;
        ctx.shadowColor = pc;
        ctx.fillStyle = pc;
        ctx.font = `bold 8px "Space Grotesk", sans-serif`;
        ctx.textBaseline = "top";
        ctx.fillText(pd.displayName.toUpperCase(), px2, p.y + outerR + 4);
        ctx.restore();
      }
      for (const t of trafficRef.current)
        drawCar(
          ctx,
          laneX(t.lane, W),
          t.y,
          t.color,
          t.w,
          t.h,
          false,
          t.style,
          false,
          false,
          "BASIC",
          t.sameDir ?? false
        );
      if (ai) {
        drawAICar(ctx, ai, W, ts);
      }
      if (boosting) {
        ctx.save();
        const fh = 24 + Math.random() * 16;
        const grad = ctx.createLinearGradient(
          playerX.current,
          pY + CAR_H / 2,
          playerX.current,
          pY + CAR_H / 2 + fh
        );
        grad.addColorStop(0, "#FF6B2B");
        grad.addColorStop(0.5, "#FFD700");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.shadowColor = "#FF6B2B";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.ellipse(
          playerX.current,
          pY + CAR_H / 2 + fh / 2,
          10,
          fh / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.ellipse(
          playerX.current - CAR_W * 0.25,
          pY + CAR_H / 2 + fh * 0.4,
          5,
          fh * 0.4,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          playerX.current + CAR_W * 0.25,
          pY + CAR_H / 2 + fh * 0.4,
          5,
          fh * 0.4,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }
      const cd = getCarData(gs.carType);
      const cStyle = (cd.stats.speed + cd.stats.handling + cd.stats.acceleration) % 3;
      drawCar(
        ctx,
        playerX.current,
        pY,
        gs.carColor,
        CAR_W,
        CAR_H,
        true,
        cStyle,
        shieldRef.current,
        invincRef.current,
        gs.carType
      );
      if (invincRef.current) {
        const invRainbow = [
          "#FF0080",
          "#FF6B2B",
          "#FFD700",
          "#00FF80",
          "#00D4FF",
          "#B44FFF"
        ];
        const tSeg = ts / 150 % 1;
        const ci = Math.floor(tSeg * invRainbow.length);
        ctx.save();
        ctx.shadowBlur = 28;
        ctx.shadowColor = invRainbow[ci];
        ctx.strokeStyle = invRainbow[ci];
        ctx.lineWidth = 3.5;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(playerX.current, pY, CAR_H * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      if (shieldRef.current) {
        ctx.save();
        ctx.shadowBlur = 28;
        ctx.shadowColor = "#00D4AA";
        ctx.strokeStyle = "#00D4AA";
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(playerX.current, pY, CAR_H * 0.68, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = "#00D4AA";
        ctx.beginPath();
        ctx.arc(playerX.current, pY, CAR_H * 0.68, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      for (const p of partRef.current) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * Math.max(0, p.life), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      for (const p of popRef.current) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = "#FFD700";
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 10;
        ctx.font = `bold 15px "Space Grotesk",sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();
      }
      if (slow) {
        ctx.save();
        ctx.fillStyle = "rgba(79,195,247,0.09)";
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }
      hudTick.current += dt;
      if (hudTick.current > 0.08) {
        hudTick.current = 0;
        const aps = Array.from(activePups.current.entries());
        activePupSnap.current = aps;
        setHud({
          score: scoreRef.current,
          coins: coinsRef2.current,
          fuel: fuelRef.current,
          timeLeft: timeRef.current,
          dist: distRef.current,
          paused: pausedRef.current,
          activePups: aps,
          mult: multRef.current,
          aiScore: ai ? Math.floor(ai.score) : 0,
          aiName: ai ? ai.name : "",
          aiLeading: ai ? ai.isLeading : false
        });
        updateGS({
          score: scoreRef.current,
          coins: coinsRef2.current,
          fuel: fuelRef.current,
          distance: distRef.current,
          timeLeft: timeRef.current,
          isShielded: shieldRef.current,
          isInvincible: invincRef.current,
          multiplier: multRef.current,
          activePowerUps: aps.map(([type, tl]) => ({
            type,
            duration: getPowerUpData(type).duration,
            magnitude: 1,
            startedAt: Date.now() - (getPowerUpData(type).duration - tl) * 1e3
          }))
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [
    nid,
    laneX,
    drawRoad,
    drawCar,
    drawRainbow,
    drawAICar,
    addParts,
    addPopup,
    activatePup,
    crashGame,
    resultsGame,
    updateGS,
    updateAIOpponent,
    showTaunt
  ]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (deadRef.current) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        playerLane.current = Math.max(0, playerLane.current - 1);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        playerLane.current = Math.min(LANE_COUNT - 1, playerLane.current + 1);
      if (e.key === "Escape" || e.key === "p" || e.key === "P") {
        pausedRef.current = !pausedRef.current;
        if (pausedRef.current) pauseGame();
        else resumeGame();
        setHud((prev) => ({ ...prev, paused: pausedRef.current }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pauseGame, resumeGame]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let sx = 0;
    let sy = 0;
    const onTS = (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const onTE = (e) => {
      if (deadRef.current) return;
      const ex = e.changedTouches[0].clientX;
      const ey = e.changedTouches[0].clientY;
      const dx = ex - sx;
      const dy = ey - sy;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20) {
        if (dx < 0) playerLane.current = Math.max(0, playerLane.current - 1);
        else
          playerLane.current = Math.min(LANE_COUNT - 1, playerLane.current + 1);
      } else if (Math.abs(dx) <= 20 && Math.abs(dy) <= 20) {
        if (ex < canvas.width / 2)
          playerLane.current = Math.max(0, playerLane.current - 1);
        else
          playerLane.current = Math.min(LANE_COUNT - 1, playerLane.current + 1);
      }
    };
    canvas.addEventListener("touchstart", onTS, { passive: true });
    canvas.addEventListener("touchend", onTE, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", onTS);
      canvas.removeEventListener("touchend", onTE);
    };
  }, []);
  const handlePause = reactExports.useCallback(() => {
    pausedRef.current = !pausedRef.current;
    if (pausedRef.current) pauseGame();
    else resumeGame();
    setHud((prev) => ({ ...prev, paused: pausedRef.current }));
  }, [pauseGame, resumeGame]);
  const handleQuit = reactExports.useCallback(() => {
    deadRef.current = true;
    cancelAnimationFrame(rafRef.current);
    navigateTo("menu");
    navigate({ to: "/menu" });
  }, [navigateTo, navigate]);
  const handleRestart = reactExports.useCallback(() => {
    deadRef.current = true;
    cancelAnimationFrame(rafRef.current);
    useGameStore.getState().startGame();
    navigateTo("game");
    navigate({ to: "/game" });
  }, [navigateTo, navigate]);
  const fuelColor = hud.fuel > 60 ? "#00D4AA" : hud.fuel > 30 ? "#FFD700" : "#FF3D3D";
  const fuelPct = Math.max(0, Math.min(100, hud.fuel));
  const gsSnap = useGameStore.getState().gameState;
  const playerCarData = getCarData(gsSnap.carType);
  const playerEmoji = playerCarData.emoji ?? "🚗";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 overflow-hidden touch-none",
      style: { background: "#0D1B2A", border: "none" },
      "data-ocid": "game.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            className: "absolute inset-0 block",
            style: { touchAction: "none", border: "none" },
            "data-ocid": "game.canvas_target"
          }
        ),
        activeTaunt && tauntVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-1/2 pointer-events-none select-none z-20",
            style: {
              top: "18%",
              transform: "translateX(-50%)",
              animation: "tauntSlide 0.3s ease-out"
            },
            "data-ocid": "game.taunt_toast",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-4 py-2 rounded-full font-display font-black text-base whitespace-nowrap",
                style: {
                  background: "rgba(13,27,42,0.88)",
                  border: "1.5px solid #FFD70088",
                  color: "#FFD700",
                  textShadow: "0 0 10px #FFD700",
                  boxShadow: "0 0 18px rgba(255,215,0,0.25)"
                },
                children: [
                  "💬 ",
                  activeTaunt
                ]
              }
            )
          }
        ),
        !hud.paused && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 flex items-start justify-between px-4 pt-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-black text-2xl leading-none",
                  style: {
                    color: "#FFFFFF",
                    textShadow: "0 0 12px rgba(0,212,170,0.5)"
                  },
                  "data-ocid": "game.score_display",
                  children: hud.score.toLocaleString()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5",
                  "data-ocid": "game.fuel_bar",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: fuelColor }, children: "⛽" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-28 h-3 rounded-full overflow-hidden",
                        style: {
                          background: "rgba(0,0,0,0.5)",
                          border: "1px solid rgba(255,255,255,0.15)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full transition-all duration-200",
                            style: {
                              width: `${fuelPct}%`,
                              background: `linear-gradient(90deg,${fuelColor},${fuelColor}cc)`,
                              boxShadow: `0 0 8px ${fuelColor}99`
                            }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-bold tabular-nums w-8",
                        style: { color: fuelColor },
                        children: [
                          Math.floor(fuelPct),
                          "%"
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
                className: "flex flex-col items-center",
                "data-ocid": "game.timer_display",
                children: gsSnap.gameMode === GameMode.TIMED ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-black text-xl tabular-nums",
                    style: {
                      color: "#FFFFFF",
                      textShadow: "0 0 10px rgba(255,107,43,0.6)"
                    },
                    children: [
                      String(Math.floor(hud.timeLeft / 60)).padStart(2, "0"),
                      ":",
                      String(Math.floor(hud.timeLeft % 60)).padStart(2, "0")
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-bold text-sm",
                    style: { color: "rgba(255,255,255,0.65)" },
                    children: [
                      Math.floor(hud.dist),
                      "m"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePause,
                  className: "pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center text-lg",
                  style: {
                    background: "rgba(0,0,0,0.55)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    color: "#fff"
                  },
                  "data-ocid": "game.pause_button",
                  "aria-label": "Pause",
                  children: "⏸"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5",
                  "data-ocid": "game.coin_display",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: { color: "#FFD700", textShadow: "0 0 8px #FFD700" },
                        children: "🪙"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-black text-lg tabular-nums",
                        style: { color: "#FFD700", textShadow: "0 0 8px #FFD700aa" },
                        children: hud.coins
                      }
                    )
                  ]
                }
              )
            ] })
          ] }),
          hud.aiName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full",
              style: {
                top: "72px",
                background: "rgba(13,27,42,0.82)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(4px)",
                minWidth: "220px"
              },
              "data-ocid": "game.ai_score_bar",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1.5 flex-1",
                    style: {
                      opacity: hud.aiLeading ? 0.65 : 1
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-none", children: playerEmoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-black text-xs leading-none",
                            style: {
                              color: hud.aiLeading ? "rgba(255,255,255,0.55)" : "#00D4AA",
                              textShadow: hud.aiLeading ? "none" : "0 0 8px #00D4AA88"
                            },
                            children: "YOU"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-xs tabular-nums leading-none mt-0.5",
                            style: {
                              color: hud.aiLeading ? "rgba(255,255,255,0.55)" : "#fff"
                            },
                            children: hud.score.toLocaleString()
                          }
                        )
                      ] }),
                      !hud.aiLeading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs ml-auto",
                          style: { color: "#00D4AA", textShadow: "0 0 6px #00D4AA" },
                          children: "👑"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-black text-xs px-1",
                    style: { color: "rgba(255,255,255,0.3)" },
                    children: "VS"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1.5 flex-1 justify-end",
                    style: {
                      opacity: hud.aiLeading ? 1 : 0.65
                    },
                    children: [
                      hud.aiLeading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs mr-auto",
                          style: { color: "#FFD700", textShadow: "0 0 6px #FFD700" },
                          children: "👑"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-black text-xs leading-none",
                            style: {
                              color: hud.aiLeading ? "#FFD700" : "rgba(255,255,255,0.55)",
                              textShadow: hud.aiLeading ? "0 0 8px #FFD70088" : "none"
                            },
                            children: hud.aiName
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-xs tabular-nums leading-none mt-0.5",
                            style: {
                              color: hud.aiLeading ? "#fff" : "rgba(255,255,255,0.55)"
                            },
                            children: hud.aiScore.toLocaleString()
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-none", children: "🤖" })
                    ]
                  }
                )
              ]
            }
          ),
          hud.activePups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-0 right-0 flex justify-center gap-2 px-4",
              style: { top: hud.aiName ? "118px" : "80px" },
              "data-ocid": "game.powerups_hud",
              children: hud.activePups.map(([type, tl]) => {
                const pd = getPowerUpData(type);
                const pct = Math.max(0, tl / pd.duration * 100);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center gap-0.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                          style: {
                            background: `${PUP_COLORS[type]}33`,
                            border: `2px solid ${PUP_COLORS[type]}`,
                            boxShadow: `0 0 10px ${PUP_COLORS[type]}88`
                          },
                          children: pd.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-8 h-1 rounded-full overflow-hidden",
                          style: { background: "rgba(0,0,0,0.45)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full rounded-full transition-all",
                              style: {
                                width: `${pct}%`,
                                background: PUP_COLORS[type]
                              }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs tabular-nums font-bold",
                          style: { color: PUP_COLORS[type], fontSize: "9px" },
                          children: [
                            Math.ceil(tl),
                            "s"
                          ]
                        }
                      )
                    ]
                  },
                  type
                );
              })
            }
          ),
          hud.mult > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-14 left-1/2 -translate-x-1/2 font-display font-black text-sm px-3 py-1 rounded-full",
              style: {
                background: "#FFD70022",
                border: "1.5px solid #FFD700",
                color: "#FFD700",
                textShadow: "0 0 8px #FFD700"
              },
              children: "×2 COINS"
            }
          )
        ] }),
        hud.paused && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex flex-col items-center justify-center",
            style: { background: "rgba(13,27,42,0.92)" },
            "data-ocid": "game.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 px-8 w-full max-w-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display font-black text-5xl tracking-widest",
                  style: {
                    color: "#fff",
                    textShadow: "0 0 24px rgba(255,107,43,0.8)"
                  },
                  children: "PAUSED"
                }
              ),
              hud.aiName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-full flex items-center justify-between px-4 py-2 rounded-2xl",
                  style: {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-black text-lg",
                          style: { color: "#00D4AA" },
                          children: hud.score.toLocaleString()
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold",
                          style: { color: "rgba(255,255,255,0.4)" },
                          children: "YOU"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-black text-sm",
                        style: { color: "rgba(255,255,255,0.3)" },
                        children: "VS"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-black text-lg",
                          style: { color: "#FFD700" },
                          children: hud.aiScore.toLocaleString()
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold",
                          style: { color: "rgba(255,255,255,0.4)" },
                          children: hud.aiName
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePause,
                  className: "w-full py-4 rounded-2xl font-display font-black text-xl tracking-wider",
                  style: {
                    background: "#00D4AA",
                    color: "#0D1B2A",
                    boxShadow: "0 0 20px #00D4AA55"
                  },
                  "data-ocid": "game.confirm_button",
                  children: "▶ RESUME"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleRestart,
                  className: "w-full py-4 rounded-2xl font-display font-black text-xl tracking-wider",
                  style: {
                    background: "#FF6B2B",
                    color: "#0D1B2A",
                    boxShadow: "0 0 20px #FF6B2B55"
                  },
                  "data-ocid": "game.restart_button",
                  children: "↺ RESTART"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleQuit,
                  className: "w-full py-4 rounded-2xl font-display font-black text-xl tracking-wider",
                  style: {
                    background: "transparent",
                    color: "#fff",
                    border: "2px solid rgba(255,255,255,0.25)"
                  },
                  "data-ocid": "game.cancel_button",
                  children: "QUIT"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 mt-1 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-bold text-2xl",
                      style: { color: "#FF6B2B" },
                      children: hud.score.toLocaleString()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-bold uppercase tracking-widest",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: "Score"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-bold text-2xl",
                      style: { color: "#FFD700" },
                      children: hud.coins
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-bold uppercase tracking-widest",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: "Coins"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-display font-bold text-2xl",
                      style: { color: "#00D4AA" },
                      children: [
                        Math.floor(hud.fuel),
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-bold uppercase tracking-widest",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: "Fuel"
                    }
                  )
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes tauntSlide {
          from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      ` })
      ]
    }
  );
}
export {
  GameScreen as default
};
