import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";

const LANE_MARKS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

function RoadBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes road-scroll {
          from { transform: translateY(-80px); }
          to { transform: translateY(0px); }
        }
        .animate-road-scroll { animation: road-scroll 0.9s linear infinite; }
      `}</style>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <title>Road background</title>
        <rect width="390" height="844" fill="#0D1B2A" />
        <rect x="90" width="210" height="844" fill="#1E2D40" />
        <rect x="86" width="4" height="844" fill="#00D4AA" opacity="0.35" />
        <rect x="300" width="4" height="844" fill="#00D4AA" opacity="0.35" />
        <g className="animate-road-scroll">
          {LANE_MARKS.map((i) => (
            <rect
              key={i}
              x="192"
              y={i * 80 - 80}
              width="6"
              height="40"
              rx="3"
              fill="#FFD700"
              opacity="0.4"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function NeonCarSVG() {
  return (
    <div className="relative flex flex-col items-center">
      <style>{`
        @keyframes car-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes trail-grow {
          0%, 100% { opacity: 0.7; transform: scaleY(0.9); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
        @keyframes flame-flicker {
          from { opacity: 0.5; transform: scaleY(0.85); }
          to { opacity: 1; transform: scaleY(1.2); }
        }
        .car-body { animation: car-float 2s ease-in-out infinite; }
        .trail-el { animation: trail-grow 1.4s ease-in-out infinite; transform-origin: bottom; }
        .flame { animation: flame-flicker 0.25s ease-in-out infinite alternate; transform-origin: top; }
      `}</style>
      {/* Rainbow glow trail */}
      <div
        className="trail-el absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "6px",
          height: "100px",
          background:
            "linear-gradient(to bottom, transparent, #FF6B2B, #FFD700, #00D4AA, #B44FFF, transparent)",
          filter: "blur(5px)",
          borderRadius: "4px",
        }}
      />
      <div
        className="trail-el absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "18px",
          height: "70px",
          background:
            "linear-gradient(to bottom, transparent, rgba(255,107,43,0.4), rgba(0,212,170,0.4), transparent)",
          filter: "blur(10px)",
        }}
      />
      {/* Car SVG */}
      <svg
        className="car-body relative z-10"
        width="72"
        height="108"
        viewBox="0 0 72 108"
        fill="none"
        style={{
          filter:
            "drop-shadow(0 0 14px #FF6B2B) drop-shadow(0 0 28px #FF6B2B66)",
        }}
        aria-hidden="true"
      >
        <title>Neon racing car</title>
        <path
          d="M18 80 L13 56 L16 28 L22 16 L36 12 L50 16 L56 28 L59 56 L54 80 Z"
          fill="#FF6B2B"
        />
        <path
          d="M24 68 L22 46 L24 34 L36 30 L48 34 L50 46 L48 68 Z"
          fill="#0D1B2A"
          opacity="0.85"
        />
        <path
          d="M24 34 L26 24 L36 21 L46 24 L48 34 Z"
          fill="#00D4AA"
          opacity="0.6"
        />
        <ellipse
          cx="21"
          cy="22"
          rx="5"
          ry="3.5"
          fill="#FFD700"
          opacity="0.95"
        />
        <ellipse
          cx="51"
          cy="22"
          rx="5"
          ry="3.5"
          fill="#FFD700"
          opacity="0.95"
        />
        <ellipse cx="19" cy="76" rx="5" ry="3" fill="#FF2222" opacity="0.9" />
        <ellipse cx="53" cy="76" rx="5" ry="3" fill="#FF2222" opacity="0.9" />
        <ellipse
          cx="13"
          cy="34"
          rx="6"
          ry="8"
          fill="#1A2840"
          stroke="#00D4AA"
          strokeWidth="1.5"
        />
        <ellipse
          cx="59"
          cy="34"
          rx="6"
          ry="8"
          fill="#1A2840"
          stroke="#00D4AA"
          strokeWidth="1.5"
        />
        <ellipse
          cx="13"
          cy="70"
          rx="6"
          ry="8"
          fill="#1A2840"
          stroke="#00D4AA"
          strokeWidth="1.5"
        />
        <ellipse
          cx="59"
          cy="70"
          rx="6"
          ry="8"
          fill="#1A2840"
          stroke="#00D4AA"
          strokeWidth="1.5"
        />
        {/* Boost flames */}
        <path
          className="flame"
          d="M29 84 L36 100 L43 84"
          stroke="#FF6B2B"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          className="flame"
          d="M31 84 L36 96 L41 84"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function SplashScreen() {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  const goToMenu = useCallback(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    navigate({ to: "/menu" });
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(goToMenu, 3000);
    return () => clearTimeout(timer);
  }, [goToMenu]);

  return (
    <>
      <style>{`
        @keyframes neon-pulse {
          0%, 100% { text-shadow: 0 0 10px #FF6B2B, 0 0 20px #FF6B2B88; }
          50% { text-shadow: 0 0 20px #FF6B2B, 0 0 40px #FF6B2B, 0 0 80px #FF6B2B66; }
        }
        @keyframes teal-glow {
          0%, 100% { text-shadow: 0 0 8px #00D4AA88; opacity: 0.85; }
          50% { text-shadow: 0 0 16px #00D4AA, 0 0 32px #00D4AA66; opacity: 1; }
        }
        @keyframes tap-pulse {
          0%, 100% { opacity: 1; letter-spacing: 0.3em; }
          50% { opacity: 0.35; letter-spacing: 0.35em; }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .title-anim { animation: fade-in-down 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .subtitle-anim { animation: fade-in-down 0.7s 0.12s cubic-bezier(0.22,1,0.36,1) both; }
        .car-anim { animation: fade-in-up 0.8s 0.25s cubic-bezier(0.22,1,0.36,1) both; }
        .tap-anim { animation: fade-in-up 0.7s 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .neon-title { animation: neon-pulse 2.2s ease-in-out infinite; }
        .teal-sub { animation: teal-glow 2s ease-in-out infinite; }
        .tap-text { animation: tap-pulse 1.1s ease-in-out infinite; }
      `}</style>

      <button
        type="button"
        className="fixed inset-0 flex flex-col items-center justify-between overflow-hidden cursor-pointer select-none w-full h-full"
        style={{ background: "#0D1B2A", border: "none", padding: 0 }}
        onClick={goToMenu}
        aria-label="Tap to start game"
        data-ocid="splash.page"
      >
        <RoadBackground />

        {/* Top — logo */}
        <div className="relative z-10 flex flex-col items-center pt-20 gap-3">
          <p
            className="teal-sub subtitle-anim text-xs font-display font-bold tracking-[0.45em] uppercase"
            style={{ color: "#00D4AA" }}
          >
            ARCADE RACING
          </p>
          <h1
            className="neon-title title-anim font-display font-black text-center leading-none px-6"
            style={{
              fontSize: "clamp(30px, 9vw, 44px)",
              color: "#FF6B2B",
              letterSpacing: "0.04em",
            }}
          >
            REAL
            <br />
            MULTIPLAYER
            <br />
            RACER
          </h1>
        </div>

        {/* Middle — car */}
        <div className="relative z-10 car-anim">
          <NeonCarSVG />
        </div>

        {/* Bottom — tap to start */}
        <div
          className="relative z-10 pb-20 flex flex-col items-center gap-3 tap-anim"
          data-ocid="splash.tap_button"
        >
          <p
            className="tap-text font-display font-bold text-lg uppercase"
            style={{ color: "#FFFFFF" }}
          >
            TAP TO START
          </p>
          <div
            className="h-0.5 w-28 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, #FF6B2B, transparent)",
            }}
          />
        </div>
      </button>
    </>
  );
}
