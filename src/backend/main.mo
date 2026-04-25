import Types "types/game-data";
import GameDataMixin "mixins/game-data-api";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  let profiles   = Map.empty<Principal, Types.PlayerProfile>();
  let raceScores = List.empty<Types.RaceResult>();

  include GameDataMixin(profiles, raceScores);
};
