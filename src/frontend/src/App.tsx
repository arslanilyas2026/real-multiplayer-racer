import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load all screen components
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
const MenuScreen = lazy(() => import("./pages/MenuScreen"));
const CarSelectScreen = lazy(() => import("./pages/CarSelectScreen"));
const GameModeScreen = lazy(() => import("./pages/GameModeScreen"));
const UpgradesScreen = lazy(() => import("./pages/UpgradesScreen"));
const GameScreen = lazy(() => import("./pages/GameScreen"));
const CrashScreen = lazy(() => import("./pages/CrashScreen"));
const ResultsScreen = lazy(() => import("./pages/ResultsScreen"));
const LeaderboardScreen = lazy(() => import("./pages/LeaderboardScreen"));
const ChallengesScreen = lazy(() => import("./pages/ChallengesScreen"));

// Full-screen dark loading fallback
const GameLoader = () => (
  <div
    className="fixed inset-0 flex items-center justify-center"
    style={{ background: "#0D1B2A" }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-primary animate-spin" />
      <p className="text-foreground font-display font-bold text-sm tracking-widest uppercase opacity-60">
        Loading…
      </p>
    </div>
  </div>
);

// ── Route tree ────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<GameLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SplashScreen,
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: MenuScreen,
});

const carSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/car-select",
  component: CarSelectScreen,
});

const gameModeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game-mode",
  component: GameModeScreen,
});

const upgradesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upgrades",
  component: UpgradesScreen,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game",
  component: GameScreen,
});

const crashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crash",
  component: CrashScreen,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: ResultsScreen,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: LeaderboardScreen,
});

const challengesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/challenges",
  component: ChallengesScreen,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  menuRoute,
  carSelectRoute,
  gameModeRoute,
  upgradesRoute,
  gameRoute,
  crashRoute,
  resultsRoute,
  leaderboardRoute,
  challengesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
