module {
  public type CarType = {
    #BASIC;
    #SPORT;
    #STREET;
    #JET;
    #RACE;
    #HYPER;
    #LIGHTNING;
  };

  public type MapTheme = {
    #HIGHWAY;
    #CITY;
    #CANYON;
  };

  public type GameMode = {
    #SCORE; // endless
    #TIMED; // duration in seconds
  };

  public type PowerUpType = {
    #SHIELD;
    #SPEED_BOOST;
    #COIN_MAGNET;
    #INVINCIBILITY;
    #TIME_SLOW;
    #FUEL_PACK;
    #DOUBLE_COINS;
  };

  public type CarStats = {
    speed : Nat;
    handling : Nat;
    acceleration : Nat;
  };

  public type CarInfo = {
    carType : CarType;
    stats : CarStats;
    unlockCost : Nat; // coins required to unlock
  };

  public type PowerUpInfo = {
    powerUpType : PowerUpType;
    level : Nat; // 1–5
    upgradeCost : Nat; // coins to upgrade
  };

  public type PlayerProfile = {
    playerId : Principal;
    var xp : Nat;
    var coins : Nat;
    var selectedCar : CarType;
    var unlockedCars : [CarType];
    var powerUpLevels : [(PowerUpType, Nat)]; // type → level (1-5)
    var highScore : Nat;
    var totalRaces : Nat;
  };

  // Public (shared) version of player profile (no var fields)
  public type PlayerProfilePublic = {
    playerId : Principal;
    xp : Nat;
    coins : Nat;
    selectedCar : CarType;
    unlockedCars : [CarType];
    powerUpLevels : [(PowerUpType, Nat)];
    highScore : Nat;
    totalRaces : Nat;
  };

  public type RaceResult = {
    playerId : Principal;
    score : Nat;
    coinsCollected : Nat;
    distanceTravelled : Nat;
    mode : GameMode;
    mapTheme : MapTheme;
    carType : CarType;
    timestamp : Int;
  };

  public type LeaderboardEntry = {
    rank : Nat;
    playerId : Principal;
    score : Nat;
    carType : CarType;
    timestamp : Int;
  };

  public type SubmitRaceInput = {
    score : Nat;
    coinsCollected : Nat;
    distanceTravelled : Nat;
    mode : GameMode;
    mapTheme : MapTheme;
    carType : CarType;
  };
};
