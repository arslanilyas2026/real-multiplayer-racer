import { R as React } from "./index-B6JfqekL.js";
var CarType = /* @__PURE__ */ ((CarType2) => {
  CarType2["BASIC"] = "BASIC";
  CarType2["SPORT"] = "SPORT";
  CarType2["STREET"] = "STREET";
  CarType2["JET"] = "JET";
  CarType2["RACE"] = "RACE";
  CarType2["SUPER"] = "SUPER";
  CarType2["HYPER"] = "HYPER";
  CarType2["LIGHTNING"] = "LIGHTNING";
  return CarType2;
})(CarType || {});
var MapTheme = /* @__PURE__ */ ((MapTheme2) => {
  MapTheme2["HIGHWAY"] = "HIGHWAY";
  MapTheme2["CITY"] = "CITY";
  MapTheme2["CANYON"] = "CANYON";
  MapTheme2["SUNSET_BOULEVARD"] = "SUNSET_BOULEVARD";
  MapTheme2["RAINY_NIGHT_CITY"] = "RAINY_NIGHT_CITY";
  MapTheme2["MOUNTAIN_PASS"] = "MOUNTAIN_PASS";
  return MapTheme2;
})(MapTheme || {});
var GameMode = /* @__PURE__ */ ((GameMode2) => {
  GameMode2["SCORE"] = "SCORE";
  GameMode2["TIMED"] = "TIMED";
  return GameMode2;
})(GameMode || {});
var PowerUpType = /* @__PURE__ */ ((PowerUpType2) => {
  PowerUpType2["SHIELD"] = "SHIELD";
  PowerUpType2["SPEED_BOOST"] = "SPEED_BOOST";
  PowerUpType2["COIN_MAGNET"] = "COIN_MAGNET";
  PowerUpType2["INVINCIBILITY"] = "INVINCIBILITY";
  PowerUpType2["TIME_SLOW"] = "TIME_SLOW";
  PowerUpType2["FUEL_PACK"] = "FUEL_PACK";
  PowerUpType2["DOUBLE_COINS"] = "DOUBLE_COINS";
  return PowerUpType2;
})(PowerUpType || {});
var CarColor = /* @__PURE__ */ ((CarColor2) => {
  CarColor2["NEON_ORANGE"] = "#FF6B2B";
  CarColor2["NEON_CYAN"] = "#00D4AA";
  CarColor2["NEON_PURPLE"] = "#B44FFF";
  CarColor2["NEON_YELLOW"] = "#FFD700";
  return CarColor2;
})(CarColor || {});
const XP_LEVEL_THRESHOLDS = [
  0,
  1e3,
  2e3,
  3500,
  5e3,
  7e3,
  9500,
  12500
];
function xpToLevel(xp) {
  let level = 1;
  for (let i = 0; i < XP_LEVEL_THRESHOLDS.length; i++) {
    if (xp >= XP_LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, void 0)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => window.localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(get(), void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;
const LEVEL_CAR_UNLOCKS = {
  2: CarType.SPORT,
  3: CarType.STREET,
  4: CarType.JET,
  5: CarType.RACE,
  6: CarType.SUPER,
  7: CarType.HYPER,
  8: CarType.LIGHTNING
};
const DEFAULT_PROFILE = {
  xp: 0,
  level: 1,
  totalCoins: 0,
  selectedCar: CarType.BASIC,
  selectedColor: CarColor.NEON_ORANGE,
  unlockedCars: [CarType.BASIC],
  unlockedMaps: [MapTheme.HIGHWAY, MapTheme.CITY, MapTheme.CANYON],
  powerUpLevels: {
    [PowerUpType.SHIELD]: 0,
    [PowerUpType.SPEED_BOOST]: 0,
    [PowerUpType.COIN_MAGNET]: 0,
    [PowerUpType.INVINCIBILITY]: 0,
    [PowerUpType.TIME_SLOW]: 0,
    [PowerUpType.FUEL_PACK]: 0,
    [PowerUpType.DOUBLE_COINS]: 0
  },
  highScore: 0,
  totalRaces: 0
};
const DEFAULT_GAME_STATE = {
  score: 0,
  coins: 0,
  fuel: 100,
  distance: 0,
  timeLeft: 180,
  activePowerUps: [],
  carType: CarType.BASIC,
  carColor: CarColor.NEON_ORANGE,
  mapTheme: MapTheme.HIGHWAY,
  gameMode: GameMode.SCORE,
  timedDuration: 3,
  isGameOver: false,
  isPaused: false,
  lane: 1,
  speed: 1,
  isShielded: false,
  isInvincible: false,
  multiplier: 1
};
const useGameStore = create()(
  persist(
    (set, get) => ({
      // Navigation
      currentScreen: "splash",
      navigateTo: (screen) => set({ currentScreen: screen }),
      // Profile
      profile: DEFAULT_PROFILE,
      updateProfile: (updates) => set((s) => ({ profile: { ...s.profile, ...updates } })),
      spendCoins: (amount) => {
        const { profile } = get();
        if (profile.totalCoins < amount) return false;
        set((s) => ({
          profile: { ...s.profile, totalCoins: s.profile.totalCoins - amount }
        }));
        return true;
      },
      addCoins: (amount) => set((s) => ({
        profile: { ...s.profile, totalCoins: s.profile.totalCoins + amount }
      })),
      addXP: (amount) => {
        const { profile } = get();
        const newXP = profile.xp + amount;
        const oldLevel = profile.level;
        const newLevel = xpToLevel(newXP);
        const newUnlocks = [];
        for (let lvl = oldLevel + 1; lvl <= newLevel; lvl++) {
          const carUnlock = LEVEL_CAR_UNLOCKS[lvl];
          if (carUnlock && !profile.unlockedCars.includes(carUnlock)) {
            newUnlocks.push(carUnlock);
          }
        }
        const newUnlockedCars = newUnlocks.length > 0 ? [.../* @__PURE__ */ new Set([...profile.unlockedCars, ...newUnlocks])] : profile.unlockedCars;
        const levelUp = newLevel > oldLevel ? {
          newLevel,
          unlockedCar: newUnlocks[newUnlocks.length - 1] ?? null
        } : null;
        set((s) => ({
          profile: {
            ...s.profile,
            xp: newXP,
            level: newLevel,
            unlockedCars: newUnlockedCars
          },
          pendingLevelUp: levelUp ?? s.pendingLevelUp
        }));
      },
      selectCar: (car) => set((s) => ({ profile: { ...s.profile, selectedCar: car } })),
      selectColor: (color) => set((s) => ({ profile: { ...s.profile, selectedColor: color } })),
      unlockMap: (theme) => set((s) => ({
        profile: {
          ...s.profile,
          unlockedMaps: [
            .../* @__PURE__ */ new Set([
              ...s.profile.unlockedMaps ?? [MapTheme.HIGHWAY],
              theme
            ])
          ]
        }
      })),
      upgradePowerUp: (type) => set((s) => {
        const current = s.profile.powerUpLevels[type];
        if (current >= 5) return s;
        return {
          profile: {
            ...s.profile,
            powerUpLevels: {
              ...s.profile.powerUpLevels,
              [type]: current + 1
            }
          }
        };
      }),
      // Level-up event
      pendingLevelUp: null,
      dismissLevelUp: () => set({ pendingLevelUp: null }),
      // Game config
      selectedMap: MapTheme.HIGHWAY,
      selectedGameMode: GameMode.SCORE,
      selectedTimedDuration: 3,
      setSelectedMap: (map) => set({ selectedMap: map }),
      setSelectedGameMode: (mode) => set({ selectedGameMode: mode }),
      setSelectedTimedDuration: (duration) => set({ selectedTimedDuration: duration }),
      // Game state
      gameState: DEFAULT_GAME_STATE,
      startGame: () => {
        const {
          profile,
          selectedMap,
          selectedGameMode,
          selectedTimedDuration,
          clearAIState
        } = get();
        clearAIState();
        set({
          gameState: {
            ...DEFAULT_GAME_STATE,
            carType: profile.selectedCar,
            carColor: profile.selectedColor,
            mapTheme: selectedMap,
            gameMode: selectedGameMode,
            timedDuration: selectedTimedDuration,
            timeLeft: selectedTimedDuration * 60,
            fuel: 100
          }
        });
      },
      pauseGame: () => set((s) => ({ gameState: { ...s.gameState, isPaused: true } })),
      resumeGame: () => set((s) => ({ gameState: { ...s.gameState, isPaused: false } })),
      endGame: () => {
        const { gameState, profile, addXP } = get();
        const newHighScore = Math.max(gameState.score, profile.highScore);
        const earnedXP = Math.floor(gameState.score / 10);
        set((s) => ({
          gameState: { ...s.gameState, isGameOver: true },
          profile: {
            ...s.profile,
            highScore: newHighScore,
            totalCoins: s.profile.totalCoins + gameState.coins,
            totalRaces: s.profile.totalRaces + 1
          }
        }));
        addXP(earnedXP);
      },
      updateGameState: (updates) => set((s) => ({ gameState: { ...s.gameState, ...updates } })),
      changeLane: (direction) => {
        const { gameState } = get();
        const newLane = direction === "left" ? Math.max(0, gameState.lane - 1) : Math.min(4, gameState.lane + 1);
        set((s) => ({ gameState: { ...s.gameState, lane: newLane } }));
      },
      setLane: (lane) => set((s) => ({
        gameState: { ...s.gameState, lane: Math.max(0, Math.min(4, lane)) }
      })),
      // AI opponent
      aiOpponent: null,
      aiRaceResult: null,
      initAIOpponent: (opponent) => set({ aiOpponent: opponent }),
      updateAIOpponent: (updates) => set((s) => ({
        aiOpponent: s.aiOpponent ? { ...s.aiOpponent, ...updates } : null
      })),
      setAIRaceResult: (result) => set({ aiRaceResult: result }),
      clearAIState: () => set({ aiOpponent: null, aiRaceResult: null })
    }),
    {
      name: "racer-store",
      partialize: (state) => ({
        profile: state.profile,
        selectedMap: state.selectedMap,
        selectedGameMode: state.selectedGameMode,
        selectedTimedDuration: state.selectedTimedDuration
      })
    }
  )
);
export {
  CarColor as C,
  GameMode as G,
  MapTheme as M,
  PowerUpType as P,
  XP_LEVEL_THRESHOLDS as X,
  CarType as a,
  useGameStore as u
};
