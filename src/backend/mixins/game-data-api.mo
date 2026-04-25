import Types "../types/game-data";
import GameDataLib "../lib/game-data";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  profiles : Map.Map<Principal, Types.PlayerProfile>,
  raceScores : List.List<Types.RaceResult>,
) {

  // ─── Car catalog (static data) ───────────────────────────────────────────

  public query func getCarCatalog() : async [Types.CarInfo] {
    GameDataLib.carCatalog()
  };

  // ─── Player profile ───────────────────────────────────────────────────────

  public shared ({ caller }) func getOrCreateProfile() : async Types.PlayerProfilePublic {
    switch (profiles.get(caller)) {
      case (?p) GameDataLib.toPublic(p);
      case null {
        let p = GameDataLib.newProfile(caller);
        profiles.add(caller, p);
        GameDataLib.toPublic(p);
      };
    }
  };

  public query ({ caller }) func getProfile() : async ?Types.PlayerProfilePublic {
    switch (profiles.get(caller)) {
      case (?p) ?GameDataLib.toPublic(p);
      case null null;
    }
  };

  public shared ({ caller }) func selectCar(carType : Types.CarType) : async Bool {
    let p = switch (profiles.get(caller)) {
      case (?p) p;
      case null Runtime.trap("Profile not found. Call getOrCreateProfile first.");
    };
    // Check car is unlocked
    let isUnlocked = Array_containsCar(p.unlockedCars, carType);
    if (not isUnlocked) return false;
    p.selectedCar := carType;
    true
  };

  public shared ({ caller }) func unlockCar(carType : Types.CarType) : async Bool {
    let p = switch (profiles.get(caller)) {
      case (?p) p;
      case null Runtime.trap("Profile not found. Call getOrCreateProfile first.");
    };
    // Already unlocked?
    let alreadyUnlocked = Array_containsCar(p.unlockedCars, carType);
    if (alreadyUnlocked) return false;
    // Find cost
    let catalog = GameDataLib.carCatalog();
    let carInfoOpt = Array_findCar(catalog, carType);
    let cost = switch (carInfoOpt) {
      case (?info) info.unlockCost;
      case null Runtime.trap("Unknown car type");
    };
    if (p.coins < cost) return false;
    p.coins := p.coins - cost;
    p.unlockedCars := Array_append(p.unlockedCars, carType);
    true
  };

  public shared ({ caller }) func upgradePowerUp(ptype : Types.PowerUpType) : async Bool {
    let p = switch (profiles.get(caller)) {
      case (?p) p;
      case null Runtime.trap("Profile not found. Call getOrCreateProfile first.");
    };
    let currentLevel = GameDataLib.getPowerUpLevel(p.powerUpLevels, ptype);
    if (currentLevel >= 5) return false; // max level
    let cost = GameDataLib.upgradeCostForLevel(currentLevel);
    if (p.coins < cost) return false;
    p.coins := p.coins - cost;
    p.powerUpLevels := GameDataLib.setPowerUpLevel(p.powerUpLevels, ptype, currentLevel + 1);
    true
  };

  // ─── Race submission ──────────────────────────────────────────────────────

  public shared ({ caller }) func submitRaceResult(input : Types.SubmitRaceInput) : async Types.PlayerProfilePublic {
    let p = switch (profiles.get(caller)) {
      case (?p) p;
      case null {
        let newP = GameDataLib.newProfile(caller);
        profiles.add(caller, newP);
        newP
      };
    };

    let result : Types.RaceResult = {
      playerId          = caller;
      score             = input.score;
      coinsCollected    = input.coinsCollected;
      distanceTravelled = input.distanceTravelled;
      mode              = input.mode;
      mapTheme          = input.mapTheme;
      carType           = input.carType;
      timestamp         = Time.now();
    };

    raceScores.add(result);

    // Update profile stats
    p.coins := p.coins + input.coinsCollected;
    p.xp := p.xp + GameDataLib.xpForScore(input.score);
    p.totalRaces := p.totalRaces + 1;
    if (input.score > p.highScore) {
      p.highScore := input.score;
    };

    GameDataLib.toPublic(p)
  };

  // ─── Leaderboard ──────────────────────────────────────────────────────────

  public query func getLeaderboard() : async [Types.LeaderboardEntry] {
    let deduped = GameDataLib.deduplicateScores(raceScores);
    GameDataLib.buildLeaderboard(deduped, 10)
  };

  public query func getTopScores() : async [Types.LeaderboardEntry] {
    GameDataLib.buildLeaderboard(raceScores, 10)
  };

  // ─── Admin / debug helpers ────────────────────────────────────────────────

  public query func getTotalPlayers() : async Nat {
    profiles.size()
  };

  public query func getTotalRaces() : async Nat {
    raceScores.size()
  };

  // ─── Private helpers ─────────────────────────────────────────────────────

  private func Array_containsCar(arr : [Types.CarType], target : Types.CarType) : Bool {
    var i = 0;
    while (i < arr.size()) {
      if (arr[i] == target) return true;
      i += 1;
    };
    false
  };

  private func Array_findCar(arr : [Types.CarInfo], target : Types.CarType) : ?Types.CarInfo {
    var i = 0;
    while (i < arr.size()) {
      if (arr[i].carType == target) return ?arr[i];
      i += 1;
    };
    null
  };

  private func Array_append(arr : [Types.CarType], item : Types.CarType) : [Types.CarType] {
    let buf = arr.toVarArray<Types.CarType>();
    let result = Array.tabulate(arr.size() + 1, func(i : Nat) : Types.CarType {
      if (i < arr.size()) buf[i] else item
    });
    result
  };
};
