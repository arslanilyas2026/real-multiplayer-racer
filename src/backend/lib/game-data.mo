import Types "../types/game-data";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";

module {

  // ─── Car catalog ─────────────────────────────────────────────────────────

  public func carCatalog() : [Types.CarInfo] {
    [
      { carType = #BASIC;     stats = { speed = 40; handling = 70; acceleration = 60 }; unlockCost = 0     },
      { carType = #SPORT;     stats = { speed = 55; handling = 65; acceleration = 70 }; unlockCost = 500   },
      { carType = #STREET;    stats = { speed = 60; handling = 60; acceleration = 65 }; unlockCost = 1000  },
      { carType = #JET;       stats = { speed = 75; handling = 55; acceleration = 80 }; unlockCost = 2500  },
      { carType = #RACE;      stats = { speed = 80; handling = 75; acceleration = 75 }; unlockCost = 5000  },
      { carType = #HYPER;     stats = { speed = 90; handling = 80; acceleration = 85 }; unlockCost = 10000 },
      { carType = #LIGHTNING; stats = { speed = 100; handling = 85; acceleration = 95 }; unlockCost = 20000 },
    ]
  };

  // ─── Power-up helpers ────────────────────────────────────────────────────

  public func defaultPowerUpLevels() : [(Types.PowerUpType, Nat)] {
    [
      (#SHIELD,         1),
      (#SPEED_BOOST,    1),
      (#COIN_MAGNET,    1),
      (#INVINCIBILITY,  1),
      (#TIME_SLOW,      1),
      (#FUEL_PACK,      1),
      (#DOUBLE_COINS,   1),
    ]
  };

  public func getPowerUpLevel(levels : [(Types.PowerUpType, Nat)], ptype : Types.PowerUpType) : Nat {
    let found = levels.find(func((t, _) : (Types.PowerUpType, Nat)) : Bool { t == ptype });
    switch (found) {
      case (?(_, lvl)) lvl;
      case null 1;
    };
  };

  public func setPowerUpLevel(levels : [(Types.PowerUpType, Nat)], ptype : Types.PowerUpType, newLevel : Nat) : [(Types.PowerUpType, Nat)] {
    levels.map<(Types.PowerUpType, Nat), (Types.PowerUpType, Nat)>(func((t, lvl)) {
      if (t == ptype) { (t, newLevel) } else { (t, lvl) }
    });
  };

  public func upgradeCostForLevel(level : Nat) : Nat {
    // Cost doubles each level: 200, 400, 800, 1600
    200 * level
  };

  // ─── Profile helpers ─────────────────────────────────────────────────────

  public func newProfile(playerId : Principal) : Types.PlayerProfile {
    {
      playerId;
      var xp                = 0;
      var coins             = 0;
      var selectedCar       = #BASIC;
      var unlockedCars      = [#BASIC];
      var powerUpLevels     = defaultPowerUpLevels();
      var highScore         = 0;
      var totalRaces        = 0;
    }
  };

  public func toPublic(p : Types.PlayerProfile) : Types.PlayerProfilePublic {
    {
      playerId      = p.playerId;
      xp            = p.xp;
      coins         = p.coins;
      selectedCar   = p.selectedCar;
      unlockedCars  = p.unlockedCars;
      powerUpLevels = p.powerUpLevels;
      highScore     = p.highScore;
      totalRaces    = p.totalRaces;
    }
  };

  // ─── XP / reward helpers ─────────────────────────────────────────────────

  public func xpForScore(score : Nat) : Nat {
    // 1 XP per 100 score points, minimum 10
    let earned = score / 100;
    if (earned < 10) 10 else earned
  };

  // ─── Leaderboard helpers ─────────────────────────────────────────────────

  public func buildLeaderboard(scores : List.List<Types.RaceResult>, limit : Nat) : [Types.LeaderboardEntry] {
    let all = scores.toArray();
    // Sort descending by score
    let sorted = all.sort(func(a : Types.RaceResult, b : Types.RaceResult) : Order.Order {
      if (a.score > b.score) #less        // reversed for descending
      else if (a.score < b.score) #greater
      else #equal
    });
    let top = if (sorted.size() < limit) sorted else sorted.sliceToArray(0, limit);
    top.mapEntries<Types.RaceResult, Types.LeaderboardEntry>(func(entry, idx) {
      {
        rank      = idx + 1;
        playerId  = entry.playerId;
        score     = entry.score;
        carType   = entry.carType;
        timestamp = entry.timestamp;
      }
    });
  };

  // Keep only the best score per player in the scores list
  public func deduplicateScores(scores : List.List<Types.RaceResult>) : List.List<Types.RaceResult> {
    // Build a map of playerId → best RaceResult, then return as list
    let result = List.empty<Types.RaceResult>();
    scores.forEach(func(r) {
      let existing = result.find(func(e : Types.RaceResult) : Bool { e.playerId == r.playerId });
      switch (existing) {
        case null { result.add(r) };
        case (?e) {
          if (r.score > e.score) {
            result.mapInPlace(func(entry : Types.RaceResult) : Types.RaceResult {
              if (entry.playerId == r.playerId) r else entry
            });
          };
        };
      };
    });
    result
  };
};
